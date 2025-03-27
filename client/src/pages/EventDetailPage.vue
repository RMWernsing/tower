<script setup>
import { AppState } from '@/AppState.js';
import { ticketsService } from '@/services/TicketsService.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const event = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const tickets = computed(() => event.value.capacity - event.value.ticketCount)
const attendees = computed(() => AppState.attendees)
const isAttending = computed(() => attendees.value.some(attendee => attendee.accountId == account.value.id))
const ticketsLeft = computed(() => {
  if (tickets.value < 0) {
    return 0
  }
  return tickets.value
})

onMounted(() => {
  getEventById()
  getAttendees()
})

async function getEventById() {
  try {
    const eventId = route.params.eventId
    await towerEventsService.getEventById(eventId)
  }
  catch (error) {
    Pop.error(error, 'Could not get event by ID')
    logger.error('COULD NOT GET EVENT BY ID', error)
  }
}

async function cancelEvent() {
  try {
    const confirmed = await Pop.confirm(`Are you sure you want to ${event.value.isCanceled ? 'un-cancel' : 'cancel'} the ${event.value.name}?`)
    if (!confirmed) {
      return
    }
    const eventId = route.params.eventId
    await towerEventsService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.error(error, 'Could not cancel event')
    logger.error('COULD NOT CANCEL EVENT', error)
  }
}

async function buyTicket() {
  try {
    const ticketData = { eventId: route.params.eventId }
    await ticketsService.buyTicket(ticketData)

  }
  catch (error) {
    Pop.error(error, 'could not buy ticket')
    logger.error('COULD NOT BUY TICKET', error)
  }
}

async function getAttendees() {
  try {
    const eventId = route.params.eventId
    await towerEventsService.getAttendees(eventId)
  }
  catch (error) {
    Pop.error(error, 'Could not get attendees')
    logger.error('COULD NOT GET ATENDEES', error)
  }
}

</script>


<template>
  <section v-if="event" class="container">
    <div class="row mt-4">
      <div class="d-flex justify-content-center">
        <div class="col-12">
          <img class="cover-img rounded-5" :src="event.coverImg" alt="">
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-md-7">
          <div class="my-3">
            <div class="d-flex align-items-center justify-content-between gap-3">
              <div>
                <h1>
                  {{ event.name }}
                </h1>
                <div class="d-flex gap-3">
                  <span class="rounded-pill bg-success px-2 text-light">{{ event.type }}</span>
                  <div v-if="event.isCanceled">
                    <span class="rounded-pill bg-danger px-2 text-light">CANCELED</span>
                  </div>
                  <div v-if="ticketsLeft == 0">
                    <span class="rounded-pill bg-indigo px-2 text-light">SOLD OUT</span>
                  </div>
                </div>
              </div>
              <div v-if="event.creatorId == account?.id">
                <button @click="cancelEvent()" class="btn btn-danger" title="cancel event">cancel event</button>
              </div>
            </div>
            <div class="mt-4">
              <p class="fs-5">{{ event.description }}</p>
            </div>
            <h2 class="mt-5">
              Date & Time
            </h2>
            <div class="d-flex align-items-center gap-3">
              <span class="mdi mdi-calendar fs-1 text-indigo"></span>
              <p class="fs-5">{{ event.startDate.toDateString() }}</p>
              <p class="fs-5">{{ event.startDate.toLocaleTimeString() }}</p>
            </div>
            <h2 class="mt-5">
              Location
            </h2>
            <div class="d-flex align-items-center gap-3">
              <span class="mdi mdi-map-marker fs-1 text-indigo"></span>
              <p class="fs-5">{{ event.location }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-center my-3">
            <p class="fs-3">Interested in Going?</p>
            <p class="fs-5">Grab a Ticket!</p>
            <p v-if="isAttending">You have a ticket for this event!!!</p>
            <button :disabled="ticketsLeft == 0 || event.isCanceled" @click="buyTicket()" class="btn btn-indigo"
              title="buy a ticket">Buy a
              ticket</button>
            <p class="mt-3">{{ ticketsLeft }} tickets remaining</p>
          </div>
          <p class="mt-3 fs-5">Attendees</p>
          <div v-for="attendee in attendees" :key="attendee.id" class="mb-2">
            <span class="me-4"><img class="round-img" :src="attendee.profile.picture"
                :alt="`profile picture of ${attendee.profile.name}`"></span>
            <span>{{ attendee.profile.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.cover-img {
  height: 55dvh;
  object-position: center;
  object-fit: cover;
  width: 100%;
}

.round-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 4em;
}
</style>