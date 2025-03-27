import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async createTicket(request, response, next) {
    try {
      const ticketData = request.body
      const userInfo = request.userInfo
      ticketData.accountId = userInfo.id
      const ticket = await ticketsService.createTicket(ticketData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async deleteTicket(request, response, next) {
    try {
      const ticketId = request.params.ticketId
      const userInfo = request.userInfo
      const message = await ticketsService.deleteTicket(ticketId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}