import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} user info from the database*/
  events: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent} user info from the database*/
  activeEvent: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent} user info from the database*/
  newEvent: null,
  /** @type {import('./models/Attendee.js').Attendee[]} user info from the database*/
  attendees: [],
  /** @type {import('./models/Ticket.js').AccountEvent[]} user info from the database*/
  accountEvents: [],
  /** @type {import('./models/Comment.js').Comment[]} user info from the database*/
  comments: [],
})

