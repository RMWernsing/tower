import { dbContext } from "../db/DbContext.js"

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    return comment
  }
}

export const commentsService = new CommentsService()