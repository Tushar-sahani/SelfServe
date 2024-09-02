// models/commentModel.js
export const CommentModel = {
    comments: {
      firstLevelIds: [],
    },
  
    addComment(newComment) {
      this.comments = {
        ...this.comments,
        firstLevelIds: this.comments.firstLevelIds.concat(newComment.id),
        [newComment.id]: newComment,
      };
    },
  
    deleteComment(commentId) {
      const updatedComments = { ...this.comments };
      const comment = updatedComments[commentId];
      const childComments = comment.children;
  
      if (childComments.length > 0) {
        childComments.forEach((id) => delete updatedComments[id]);
      }
  
      delete updatedComments[commentId];
  
      if (comment.parentId === null) {
        updatedComments.firstLevelIds = updatedComments.firstLevelIds.filter(
          (id) => id !== commentId
        );
      } else {
        updatedComments[comment.parentId].children = updatedComments[
          comment.parentId
        ].children.filter((id) => id !== commentId);
      }
  
      this.comments = updatedComments;
    },
  
    addReply(newComment, parentId) {
      const updatedParentComment = {
        ...this.comments[parentId],
        children: this.comments[parentId].children.concat(newComment.id),
      };
      this.comments = {
        ...this.comments,
        [parentId]: updatedParentComment,
        [newComment.id]: newComment,
      };
    },
  };
  