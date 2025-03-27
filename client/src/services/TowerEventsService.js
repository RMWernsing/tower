import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"
import { Account } from "@/models/Account.js"
import { Attendee } from "@/models/Attendee.js"
import { AccountEvent } from "@/models/Ticket.js"
import { Comment } from "@/models/Comment.js"

class TowerEventsService{
  async getComments(eventId) {
    AppState.comments = []
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log('here are your comments', response.data)
    const comments = response.data.map(pojo => new Comment(pojo))
    AppState.comments = comments
  }
  async getEventsImGoingTo() {
    const response = await api.get('account/tickets')
    logger.log('here are my events im going to!!!', response.data)
    const events = response.data.map(pojo => new AccountEvent(pojo))
    AppState.accountEvents = events
  }

  async createEvent(value, date) {
    const response = await api.post('api/events', value, date)
    logger.log('created event', response.data)
    const event = new TowerEvent(response.data)
    AppState.events.unshift(event)
    return event
  }

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
    AppState.newEvent = event
  }
  
  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    const event = new TowerEvent(response.data)
    AppState.activeEvent = event
  }

  async getAttendees(eventId) {
    const response = await api.get(`/api/events/${eventId}/tickets`)
    logger.log('got attendees', response.data)
    const attendees = response.data.map(pojo => new Attendee(pojo))
    AppState.attendees = attendees
  }
}

export const towerEventsService = new TowerEventsService()