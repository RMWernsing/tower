import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Attendee } from "@/models/Attendee.js"

class TicketsService{
  async deleteTicket(eventId) {
    const response = await api.delete(`api/tickets/${eventId}`)
    logger.log('DELETING TICKET', response.data)
    const accountEvents = AppState.accountEvents
    const eventIndex = accountEvents.findIndex(event => event.id == eventId)
    accountEvents.splice(eventIndex, 1)
  }

  async buyTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('here is your ticket', response.data)
    const attendee = new Attendee(response.data)
    AppState.attendees.push(attendee)
    AppState.activeEvent.ticketCount++
  }
}

export const ticketsService = new TicketsService()