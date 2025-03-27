<script setup>
import { AppState } from '@/AppState.js';
import { TowerEvent } from '@/models/TowerEvent.js';
import { computed } from 'vue';


defineProps({
  event: { type: TowerEvent, required: true }
})



</script>


<template>
  <RouterLink :to="{ name: 'EventDetail', params: { eventId: event.id } }">
    <div class="card shadow-lg">
      <img :src="event.coverImg" class="card-img-top" :alt="`Image for the ${event.name} event`">
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
        <div class="card-text d-flex flex-wrap">
          <span class="rounded-pill bg-success text-light px-2 me-1 capitalize my-2">{{ event.type }}</span>
          <span v-if="event.isCanceled" class="rounded-pill bg-danger text-light px-2 me-1 my-2">CANCELED</span>
          <span v-if="event.capacity <= event.ticketCount"
            class="rounded-pill bg-indigo text-light px-2 my-2">SOLD-OUT</span>
        </div>
        <p class="card-text">{{ event.location }}</p>
        <p class="card-text"> {{ event.startDate.toDateString() }}</p>
        <p class="card-text">Hosted by {{ event.creator.name }}</p>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
img {
  height: 15rem;
  object-fit: cover;
}

a {
  text-decoration: none;
}
</style>