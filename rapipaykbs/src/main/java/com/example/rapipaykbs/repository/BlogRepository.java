package com.example.rapipaykbs.repository;

import com.example.rapipaykbs.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

public interface BlogRepository extends MongoRepository<Blog, String> {

  // find user by Id
  List<Blog> findByUserId(String userId);

  // find Blogs by title
  List<Blog> findByTitleContainingIgnoreCase(String title);

  // sort by upload date
  List<Blog> findAllByOrderByCreatedAtDesc();

  // sort by like count
  List<Blog> findAllByOrderByLikeCountDesc();

  // filter out past 24 hours Blog
  @Query("{ 'createdAt' : { $gte: ?0 } }")
  List<Blog> findBlogsFromLast24Hours(LocalDate last24Hours);

  // filter out past 7 days Blog
  @Query("{'createdAt' : { $gte: ?0, $lt: ?1 } }")
  List<Blog> findBlogsCreatedBetween(LocalDateTime startOfWeek, LocalDateTime endOfWeek);
}
