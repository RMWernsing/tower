import { TowerEvent } from "./TowerEvent.js"

export class Ticket{
  constructor(data){
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
  }
}

export class TicketProfile extends Ticket{
  constructor(data){
    super(data)
    this.profile = data.profile
  }
}

export class AccountEvent extends Ticket{
  constructor(data){
    super(data)
    this.event = new TowerEvent(data.event)
  }
}