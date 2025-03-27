export class TowerEvent{
  constructor(data){
    this.capacity = data.capacity
    this.coverImg = data.coverImg
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.description = data.description
    this.id = data.id
    this.isCanceled = data.isCanceled
    this.location = data.location
    this.name = data.name
    this.type = data.type
    this.ticketCount = data.ticketCount
    this.createdAt = new Date(data.createdAt)
    this.startDate = new Date(data.startDate)
    this.updatedAt = new Date(data.updatedAt)
  }
}