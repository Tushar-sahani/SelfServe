package com.example.rapipaykbs.controller;

import com.example.rapipaykbs.model.Blog;
import com.example.rapipaykbs.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping("/sorted/{key}")
    public List<Blog> getAllBlogs(@PathVariable String key) {

        return blogService.getAllBlogs(key);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
        Optional<Blog> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("user/{userId}")
    public List<Blog> getBlogByUserId(@PathVariable String userId) {

        return blogService.getBlogByUserId(userId);
    }

    @GetMapping("/title/{title}")
    public List<Blog> getBlogsByTitle(@PathVariable String title) {
        return blogService.getBlogByTitle(title);
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        blog.setCreatedAt(LocalDateTime.now());
        return blogService.createBlog(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable String id, @RequestBody Blog blog) {
        Blog updatedBlog = blogService.updateBlog(id, blog);
        return updatedBlog != null ? ResponseEntity.ok(updatedBlog) : ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }

    // Like APIs

    @PostMapping("/{blogId}/likes/{userId}")
    public ResponseEntity<Blog> addOrRemoveLike(@PathVariable String blogId, @PathVariable String userId) {
        Blog blog = blogService.addOrRemoveLike(blogId, userId);
        return blog != null ? ResponseEntity.ok(blog) : ResponseEntity.noContent().build();
    }

}
