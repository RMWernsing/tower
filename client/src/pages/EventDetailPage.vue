<script setup>
import { AppState } from '@/AppState.js';
import CommentCard from '@/components/CommentCard.vue';
import CommentForm from '@/components/CommentForm.vue';
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
const comments = computed(() => AppState.comments)
const cancelButton = computed(() => {
  if (!event.value.isCanceled) {
    return 'cancel'
  }
  return 'un-cancel'
})
const ticketsLeft = computed(() => {
  if (tickets.value < 0) {
    return 0
  }
  return tickets.value
})

onMounted(() => {
  getEventById()
  getAttendees()
  getComments()
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

async function getComments() {
  try {
    const eventId = route.params.eventId
    await towerEventsService.getComments(eventId)
  }
  catch (error) {
    Pop.error(error, 'Could not get comments')
    logger.error('COULD NOT GET COMMENTS', error)
  }
}

</script>


<template>
  <section v-if="event" class="container">
    <div class="row mt-4 mx-1">
      <div class="col-12">
        <div class="d-flex justify-content-center">
          <img class="cover-img rounded-4" :src="event.coverImg" alt="">
        </div>
      </div>
      <div class="col-12">
        <p class="fs-3 mt-2">Hosted by</p>
        <div class="d-flex gap-2 align-items-center fs-2">
          <img class="creator-img" :src="event.creator.picture" alt="">
          <p>{{ event.creator.name }}</p>
        </div>
        <hr>
      </div>
      <div>
        <div class="row justify-content-between">
          <div class="col-md-7">
            <div class="my-3">
              <div class="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <h1 class="display-5 fw-bold">
                    {{ event.name }}
                  </h1>
                  <div class="d-flex gap-3 flex-wrap pt-2">
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
                  <button @click="cancelEvent()" class="btn btn-danger rounded-4" title="cancel event">{{ cancelButton
                  }}
                    Event</button>
                </div>
              </div>
              <div class="mt-4 shadow-lg rounded-4 pt-2 px-3 pb-1">
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
            <div>
              <h2 class="my-5">
                Comments
              </h2>
              <div class="bg-grey p-3 rounded-5 mb-5">
                <div>
                  <CommentForm />
                </div>
                <div v-if="comments" class="mt-5">
                  <div v-for="comment in comments" :key="comment.id">
                    <CommentCard :comment="comment" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="text-center my-3 bg-grey rounded-4 p-2">
              <p class="fs-3">Interested in Going?</p>
              <div class="bg-light rounded-4 py-2 mb-4 mx-2">
                <p class="fs-5">Grab a Ticket!</p>
                <p v-if="isAttending">You have a ticket for this event!!!</p>
                <button :disabled="ticketsLeft == 0 || event.isCanceled" @click="buyTicket()" class="btn btn-indigo"
                  title="buy a ticket">Buy a
                  ticket</button>
                <p class="mt-3">{{ ticketsLeft }} tickets remaining</p>
              </div>
            </div>
            <div class="rounded-4 bg-grey p-3">
              <p class="fs-5">Attendees</p>
              <div v-for="attendee in attendees" :key="attendee.id" class="mb-2">
                <div class="bg-light rounded-4 p-2">
                  <span class="me-4"><img class="round-img" :src="attendee.profile.picture"
                      :alt="`profile picture of ${attendee.profile.name}`"></span>
                  <span>{{ attendee.profile.name }}</span>
                </div>
              </div>
            </div>
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

.creator-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 6dvh;
}

.round-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 4em;
}
</style>