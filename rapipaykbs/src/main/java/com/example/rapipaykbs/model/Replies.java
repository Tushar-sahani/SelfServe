package com.example.rapipaykbs.model;

import org.springframework.data.annotation.Id;

public class Replies {
    @Id
    private String id;
    private String parentId;
    private String articleId;
    private String createdAt;
    private String description;
    private User user;

    // Getters
    public String getId() {
        return id;
    }

    public String getParentId() {
        return parentId;
    }

    public String getArticleId() {
        return articleId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getDescription() {
        return description;
    }

    public User getUser() {
        return user;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public void setArticleId(String articleId) {
        this.articleId = articleId;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
