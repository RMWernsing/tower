import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class TicketsService {

  async deleteTicket(ticketId, userInfo) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (ticket == null) {
      throw new BadRequest(`Invalid id: ${ticketId}`)
    }
    if (ticket.accountId != userInfo.id) {
      throw new Forbidden(`YOU CANNON DELETE SOMEONE ELSES TICKET YOU HOOLIGAN`)
    }
    await ticket.deleteOne()
    return `ticket has been deleted`
  }

  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    return tickets
  }

  async getTicketsById(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({
      path: 'event',
      populate: {
        path: 'creator'
      }
    })
    return tickets
  }
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile')
    await ticket.populate('event')
    return ticket
  }
}

export const ticketsService = new TicketsService() 