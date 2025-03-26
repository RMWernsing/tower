import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventsService{
  async getEvents() {
    const response = await api.get('api/events')
    // logger.log('here are your events', response.data)
    const events = response.data.map(pojo => new TowerEvent(pojo))
    AppState.events = events
  }

  async getEventById(eventId) {
    AppState.activeEvent = null
    const response = await api.get(`api/events/${eventId}`)
    logger.log('here is your event', response.data)
    const event = new TowerEvent(response.data)
    AppState.activeEvent = event
  }
}

export const towerEventsService = new TowerEventsService()