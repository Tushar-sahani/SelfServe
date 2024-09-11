package com.example.rapipaykbs.service;

import com.example.rapipaykbs.model.Blog;
import com.example.rapipaykbs.repository.BlogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs(String key) {

        switch (key) {
            case "RecentBlog":
                return blogRepository.findAllByOrderByCreatedAtDesc();

            case "MostLiked":
                return blogRepository.findAllByOrderByLikeCountDesc();

            // case "TopBlog":
            // return BlogRepository.findAllByOrderByLikeCountPlusCommentCountDesc();

            case "WeekBlogs": {
                LocalDate now = LocalDate.now();
                LocalDate startOfWeek = now.with(java.time.DayOfWeek.MONDAY);
                LocalDateTime startOfWeekDateTime = startOfWeek.atStartOfDay();
                LocalDate endOfWeek = startOfWeek.plusDays(7);
                LocalDateTime endOfWeekDateTime = endOfWeek.atStartOfDay().minusNanos(1);

                return blogRepository.findBlogsCreatedBetween(startOfWeekDateTime, endOfWeekDateTime);

            }

            case "Past24HoursBlog":
                return blogRepository.findBlogsFromLast24Hours(LocalDate.now());
            default:
                return blogRepository.findAllByOrderByCreatedAtDesc();
        }
    }

    public Optional<Blog> getBlogById(String id) {
        return blogRepository.findById(id);
    }

    public List<Blog> getBlogByTitle(String title) {

        return blogRepository.findByTitleContainingIgnoreCase(title);

    }

    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public List<Blog> getBlogByUserId(String userId) {
        return blogRepository.findByUserId(userId);
    }

    public Blog updateBlog(String id, Blog updatedBlog) {
        return blogRepository.findById(id).map(Blog -> {
            Blog.setTitle(updatedBlog.getTitle());
            Blog.setDescription(updatedBlog.getDescription());
            Blog.setContent(updatedBlog.getContent());
            Blog.setEditedAt(updatedBlog.getEditedAt());
            return blogRepository.save(Blog);
        }).orElse(null);
    }

    public void deleteBlog(String id) {
        blogRepository.deleteById(id);
    }

    // Like operations

    public Blog addOrRemoveLike(String blogId, String userId) {
        return blogRepository.findById(blogId).map(Blog -> {
            if (Blog.getLikedUserIds().contains(userId)) {
                // User has already liked the Blog, remove the like
                Blog.removeUserLike(userId);
            } else {
                // User has not liked the Blog, add the like
                Blog.addUserLike(userId);
            }
            return blogRepository.save(Blog);
        }).orElse(null);
    }

}
