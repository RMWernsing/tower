import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator').sort('-createdAt')
    return comments
  }

  async deleteComment(commentId, userInfo) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment == null) {
      throw new BadRequest(`Invalid id ${commentId}`)
    }
    if (comment.creatorId != userInfo.id) {
      throw new Forbidden(`YOU DO NOT HAVE PERMISSION TO DELETE THIS COMMENT YOU HOOLIGAN`)
    }
    await comment.deleteOne()
    return 'Your comment was successfully deleted'
  }
}

export const commentsService = new CommentsService()