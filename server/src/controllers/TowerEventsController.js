import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getEventTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:eventId', this.cancelEvent)
      .put('/:eventId', this.editEvent)
      .post('', this.createEvent)
  }


  /**
   * Creates a new value from request body and returns the value
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
  */
  async getAllEvents(request, response, next) {
    try {
      const events = await towerEventsService.getAllEvents()
      response.send(events)
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
  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const event = await towerEventsService.getEventById(eventId)
      response.send(event)
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
  async getEventTickets(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketsService.getEventTickets(eventId)
      response.send(tickets)
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
  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userInfo = request.userInfo
      const event = await towerEventsService.cancelEvent(userInfo, eventId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(request, response, next) {
    try {
      const eventData = request.body
      const eventId = request.params.eventId
      const event = await towerEventsService.editEvent(eventData, eventId)
      response.send(event)
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
  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      const userInfo = request.userInfo
      eventData.creatorId = userInfo.id
      const event = await towerEventsService.createEvent(eventData)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
}