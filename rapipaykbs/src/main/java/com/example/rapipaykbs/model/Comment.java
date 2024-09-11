package com.example.rapipaykbs.model;

import org.springframework.data.annotation.Id;
import java.util.List;

public class Comment {

    @Id
    private String id;
    private String articleId;
    private String createdAt;
    private String description;
    private User user;
    private List<Replies> children;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getArticleId() {
        return articleId;
    }

    public void setArticleId(String articleId) {
        this.articleId = articleId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Replies> getChildren() {
        return children;
    }

    public void setChildren(List<Replies> children) {
        this.children = children;
    }
}
