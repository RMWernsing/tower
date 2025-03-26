<script setup>
import { AppState } from '@/AppState.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const event = computed(() => AppState.activeEvent)
const route = useRoute()

onMounted(() => {
  getEventById()
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
            <div class="d-flex align-items-center gap-3">
              <h1>
                {{ event.name }}
              </h1>
              <span class="rounded-pill bg-danger px-2 text-light">{{ event.type }}</span>
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
            <p class="fs-3">Interesed in Going?</p>
            <p class="fs-5">Grab a Ticket!</p>
            <button class="btn btn-indigo" title="buy a ticket">Buy a ticket</button>
            <p class="mt-3">0 tickets remaining</p>
          </div>
          <p class="mt-3 fs-5">Attendees</p>
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
</style>