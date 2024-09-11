package com.example.rapipaykbs.repository;

import com.example.rapipaykbs.model.Article;
import org.springframework.lang.NonNull;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

public interface ArticleRepository extends MongoRepository<Article, String> {

    // find Article By Id

    @NonNull
    Optional<Article> findById(@NonNull String id);

    // find user by Id
    List<Article> findByUserId(String userId);

    // find articles by title
    List<Article> findByTitleContainingIgnoreCase(String title);

    // sort by upload date
    List<Article> findAllByOrderByCreatedAtDesc();

    //sort by comment count
    List<Article> findAllByOrderByCommentsCountDesc();

    // sort by comment count greater than 0
    @Query("{ 'commentsCount' : { $gt: 0 } }")
    List<Article> findAllByCommentsCountGreaterThanZeroOrderByCommentsCountDesc();

    // sort by comment count equal to 0
    @Query("{ 'commentsCount' : 0 }")
    List<Article> findAllByCommentsCountZero();

    // sort by like count
    List<Article> findAllByOrderByLikeCountDesc();

    // filter out past 24 hours post
    @Query("{ 'createdAt' : { $gte: ?0 } }")
    List<Article> findPostsFromLast24Hours(LocalDate last24Hours);

    // filter out past 7 days post
    @Query("{'createdAt' : { $gte: ?0, $lt: ?1 } }")
    List<Article> findArticlesCreatedBetween(LocalDateTime startOfWeek, LocalDateTime endOfWeek);

    // filter article by similar tags
    @Query("{ 'tagList': { $in: ?0 } }")
    List<Article> findByTagListIn(String[] tags);

}
