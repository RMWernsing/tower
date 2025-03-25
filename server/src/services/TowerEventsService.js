import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    return event
  }
}

export const towerEventsService = new TowerEventsService()