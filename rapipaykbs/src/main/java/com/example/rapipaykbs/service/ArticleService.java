package com.example.rapipaykbs.service;

import com.example.rapipaykbs.model.Article;
import com.example.rapipaykbs.model.Comment;
import com.example.rapipaykbs.repository.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public List<Article> getAllArticles(String key) {

        switch (key) {
            case "RecentPost":
                return articleRepository.findAllByOrderByCreatedAtDesc();

            case "MostLiked":
                return articleRepository.findAllByOrderByLikeCountDesc();

            case "Answered":
                return articleRepository.findAllByCommentsCountGreaterThanZeroOrderByCommentsCountDesc();
            
            case "MostComment":
                return articleRepository.findAllByOrderByCommentsCountDesc();
            
            case "NotAnswered":
                 return articleRepository.findAllByCommentsCountZero();

            case "TopPost": {

                List<Article> articles = articleRepository.findAll();

                return articles.stream().filter(article -> article instanceof Article).map(article -> (Article) article)
                        .sorted(Comparator.comparingInt(article -> {
                            int likeCount = ((Article) article).getLikeCount() != null
                                    ? ((Article) article).getLikeCount()
                                    : 0;
                            int commentsCount = ((Article) article).getCommentsCount() != null
                                    ? ((Article) article).getCommentsCount()
                                    : 0;

                            return likeCount + commentsCount;
                        }).reversed()).collect(Collectors.toList());

            }

            case "WeekPosts": {
                LocalDate now = LocalDate.now();
                LocalDate startOfWeek = now.with(java.time.DayOfWeek.MONDAY);
                LocalDateTime startOfWeekDateTime = startOfWeek.atStartOfDay();
                LocalDate endOfWeek = startOfWeek.plusDays(7);
                LocalDateTime endOfWeekDateTime = endOfWeek.atStartOfDay().minusNanos(1);

                return articleRepository.findArticlesCreatedBetween(startOfWeekDateTime, endOfWeekDateTime);

            }

            case "Past24HoursPost":
                return articleRepository.findPostsFromLast24Hours(LocalDate.now());
            default:
                return articleRepository.findAllByOrderByCreatedAtDesc();
        }
    }

    public Optional<Article> getArticleById(String id) {
        return articleRepository.findById(id);
    }

    public List<Article> getArticleByTitle(String title) {

        return articleRepository.findByTitleContainingIgnoreCase(title);

    }

    public List<Article> similarTagged(String[] tags) {
        return articleRepository.findByTagListIn(tags);
    }
    

    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    public List<Article> getArticleByUserId(String userId) {
        return articleRepository.findByUserId(userId);
    }

    public Article updateArticle(String id, Article updatedArticle) {
        return articleRepository.findById(id).map(article -> {

            if(updatedArticle.getTitle()!=null)
            article.setTitle(updatedArticle.getTitle());

            if(updatedArticle.getDescription()!=null)
            article.setDescription(updatedArticle.getDescription());

            if(updatedArticle.getContent()!=null)
            article.setContent(updatedArticle.getContent());

            article.setEditedAt(LocalDateTime.now());

            if(updatedArticle.getCoverImage()!=null)
            article.setCoverImage(updatedArticle.getCoverImage());

            if(updatedArticle.getTagList()!=null)
            article.setTagList(updatedArticle.getTagList());

            return articleRepository.save(article);
        }).orElse(null);
    }

    public Article deleteArticle(String id) {
        Optional<Article> articleOptional = articleRepository.findById(id);
        if (articleOptional.isPresent()) {
            Article article = articleOptional.get();
            articleRepository.deleteById(id); // Delete the article
            return article; // Return the deleted article
        }
        return null; // Return null if the article is not found
    }

    // Comment operations

    public Article addComment(String articleId, Comment comment) {
        return articleRepository.findById(articleId).map(article -> {
            comment.setId(UUID.randomUUID().toString());
            comment.setArticleId(articleId);
            article.addComment(comment);
            return articleRepository.save(article);
        }).orElse(null);
    }

    public Article removeComment(String articleId, String commentId) {
        return articleRepository.findById(articleId).map(article -> {
            Comment commentToRemove = article.getComments().stream()
                    .filter(c -> c.getId().equals(commentId))
                    .findFirst()
                    .orElse(null);
            if (commentToRemove != null) {
                article.removeComment(commentToRemove);
                return articleRepository.save(article);
            }
            return null;
        }).orElse(null);
    }

    // Like operations

    public Article addOrRemoveLike(String articleId, String userId) {
        return articleRepository.findById(articleId).map(article -> {
            if (article.getLikedUserIds().contains(userId)) {
                // User has already liked the article, remove the like
                article.removeUserLike(userId);
            } else {
                // User has not liked the article, add the like
                article.addUserLike(userId);
            }
            return articleRepository.save(article);
        }).orElse(null);
    }

}
