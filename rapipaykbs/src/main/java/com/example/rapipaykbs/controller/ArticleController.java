package com.example.rapipaykbs.controller;

import com.example.rapipaykbs.model.Article;
import com.example.rapipaykbs.model.Comment;
import com.example.rapipaykbs.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/sorted/{key}")
    public List<Article> getAllArticles(@PathVariable String key) {

        return articleService.getAllArticles(key);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable String id) {
        Optional<Article> article = articleService.getArticleById(id);
        return article.map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("user/{userId}")
    public List<Article> getArticleByUserId(@PathVariable String userId) {

        return articleService.getArticleByUserId(userId);
    }

    @GetMapping("/title/{title}")
    public List<Article> getArticlesByTitle(@PathVariable String title) {
        return articleService.getArticleByTitle(title);
    }

    @SuppressWarnings("null")
    @GetMapping("/recommend")
    public ResponseEntity<List<Article>> similarTags(@RequestBody String[] tags) {
        List<Article> similaArticles = articleService.similarTagged(tags);

        if(similaArticles.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }

        else {
            return new ResponseEntity<>(similaArticles, HttpStatus.OK);
        }
    }
    

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        article.setCreatedAt(LocalDateTime.now());
        return articleService.createArticle(article);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable String id, @RequestBody Article article) {
        System.out.println(article);
        Article updatedArticle = articleService.updateArticle(id, article);
        return updatedArticle != null ? ResponseEntity.ok(updatedArticle) : ResponseEntity.noContent().build();
    }

    @SuppressWarnings("null")
    @DeleteMapping("/{id}")
    public ResponseEntity<Article> deleteArticle(@PathVariable String id) {
        Article deletedArticle = articleService.deleteArticle(id);
        if (deletedArticle != null) {
            return new ResponseEntity<>(deletedArticle, HttpStatus.OK); // Return deleted article with 200 OK
        } else {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT); // Return 204 if article not found
        }
    }

    // Comment APIs

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<Article> addComment(@PathVariable String articleId, @RequestBody Comment comment) {
        try {
            Article article = articleService.addComment(articleId, comment);
            if (article != null) {
                return ResponseEntity.ok(article);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            // e.printStackTrace(); // Log the exception
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{articleId}/comments/{commentId}")
    public ResponseEntity<Article> removeComment(@PathVariable String articleId, @PathVariable String commentId) {
        Article article = articleService.removeComment(articleId, commentId);
        return article != null ? ResponseEntity.ok(article) : ResponseEntity.noContent().build();
    }

    // Like APIs

    @PostMapping("/{articleId}/likes/{userId}")
    public ResponseEntity<Article> addOrRemoveLike(@PathVariable String articleId, @PathVariable String userId) {
        Article article = articleService.addOrRemoveLike(articleId, userId);
        return article != null ? ResponseEntity.ok(article) : ResponseEntity.noContent().build();
    }

}
