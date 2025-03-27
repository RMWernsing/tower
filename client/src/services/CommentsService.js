import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comment.js"
import { AppState } from "@/AppState.js"

class CommentsService{
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log('deleted comment', response.data)
    const comments = AppState.comments
    const index = comments.findIndex(comment => comment.id == commentId)
    comments.splice(index, 1)
  }
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('here is your new comment', response.data)
    const comment = new Comment(response.data)
    const eventComments = AppState.comments
    eventComments.unshift(comment)
  }
}

export const commentsService = new CommentsService()