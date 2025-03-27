import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
  }

  /**
* Creates a new value from request body and returns the value
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async createComment(request, response, next) {
    try {
      const commentData = request.body
      const userInfo = request.userInfo
      commentData.creatorId = userInfo.id
      const comment = await commentsService.createComment(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }
}