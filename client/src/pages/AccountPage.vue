<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import TowerEventCard from '@/components/TowerEventCard.vue';
import { ticketsService } from '@/services/TicketsService.js';

const account = computed(() => AppState.account)
const accountEvents = computed(() => AppState.accountEvents)

onMounted(() => {
  getEventsImGoingTo()
})

async function getEventsImGoingTo() {
  try {
    await towerEventsService.getEventsImGoingTo()
  }
  catch (error) {
    Pop.error(error, 'Could not get events')
    logger.error('COULD NOT GET EVENTS', error)
  }
}

async function deleteTicket(eventId) {
  try {
    const confirm = await Pop.confirm('Are you sure you want to refund your ticket?')
    if (!confirm) {
      return
    }
    await ticketsService.deleteTicket(eventId)
  } catch (error) {
    Pop.error(error, 'Could not delete ticket')
    logger.error('COULD NOT DELETE TICKET', error)
  }
}

</script>

<template>
  <section class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-3 mt-5">
        <div class="d-flex justify-content-center gap-5">
          <img class="round-img" :src="account?.picture" alt="">
        </div>
      </div>
      <div class="col-md-3 mt-5">
        <h1 class="display-5 fw-medium text-center">{{ account?.name }}</h1>
        <p class="text-center">Tickets Purchased: {{ accountEvents.length }}</p>
      </div>
    </div>
    <div class="col-12 mt-5">
      <div class="row">
        <div class="col-12 mt-5">
          <h2>Your Upcoming Events</h2>
        </div>
        <div v-for="event in accountEvents" :key="event.id" class="col-md-4 px-4">
          <div>
            <TowerEventCard :event="event.event" />
            <button @click="deleteTicket(event.id)" class="btn btn-danger rounded-pill mb-5 mt-2">
              Refund Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.round-img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 25dvh;
}
</style>
