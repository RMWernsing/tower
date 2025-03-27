import { Account } from "./Account.js"

export class Comment{
  constructor(data){
    this.body = data.body
    this.createdAt = new Date(data.createdAt)
    this.creator = new Account(data.creator)
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.id = data.id
    this.updatedAt = new Date(data.updatedAt)
  }
}