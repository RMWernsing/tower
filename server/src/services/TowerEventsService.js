import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class TowerEventsService {

  async getAllEvents() {
    const events = await dbContext.TowerEvents.find().populate('creator').populate('ticketCount').sort('-createdAt')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId).populate('creator').populate('ticketCount')
    return event
  }

  async cancelEvent(userInfo, eventId) {
    const event = await this.getEventById(eventId)
    if (event.creatorId != userInfo.id) {
      throw new Forbidden(`You Cannot Cancel This Event`)
    }
    event.isCanceled = !event.isCanceled
    await event.save()
    return event
  }

  async editEvent(eventData, eventId, userInfo) {
    const event = await this.getEventById(eventId)
    if (event.isCanceled) {
      throw new BadRequest('You cannot edit canceled event')
    }
    if (event.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT EDIT ANOTHER USERS EVENT!!!`)
    }
    event.name = eventData.name ?? event.name
    event.description = eventData.description ?? event.description
    event.save()
    return event
  }

  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    await event.populate('ticketCount')
    return event
  }
}

export const towerEventsService = new TowerEventsService()