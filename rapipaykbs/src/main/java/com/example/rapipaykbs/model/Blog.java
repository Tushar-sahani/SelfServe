package com.example.rapipaykbs.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "blog")
public class Blog {

    @Id
    private String id;
    private String title;
    private String description;
    private String content;
    private String coverImage;
    private List<String> tagList;
    private Integer shareCount;
    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
    private Integer readingTimeMinutes;
    private User user;
    private int likeCount;
    private Set<String> likedUserIds;

    public Blog() {
        this.likedUserIds = new HashSet<>();
        this.likeCount = 0;
    }

    // Getters and Setters for likes

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public Set<String> getLikedUserIds() {
        return likedUserIds;
    }

    public void setLikedUserIds(Set<String> likedUserIds) {
        this.likedUserIds = likedUserIds;
    }

    public boolean hasUserLiked(String userId) {
        return likedUserIds.contains(userId);
    }

    public void addUserLike(String userId) {
        if (this.likedUserIds.add(userId)) {
            this.likeCount++;
        }
    }

    public void removeUserLike(String userId) {
        if (this.likedUserIds.remove(userId)) {
            this.likeCount--;
        }
    }

    // Getters and Setters for other fields

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public List<String> getTagList() {
        return tagList;
    }

    public void setTagList(List<String> tagList) {
        this.tagList = tagList;
    }

    public Integer getShareCount() {
        return shareCount;
    }

    public void setShareCount(Integer shareCount) {
        this.shareCount = shareCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getEditedAt() {
        return editedAt;
    }

    public void setEditedAt(LocalDateTime editedAt) {
        this.editedAt = editedAt;
    }

    public Integer getReadingTimeMinutes() {
        return readingTimeMinutes;
    }

    public void setReadingTimeMinutes(Integer readingTimeMinutes) {
        this.readingTimeMinutes = readingTimeMinutes == null ? 0 : readingTimeMinutes;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
