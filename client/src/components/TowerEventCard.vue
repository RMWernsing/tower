<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';


defineProps({
  event: { type: TowerEvent, required: true }
})

</script>


<template>
  <RouterLink :to="{ name: 'EventDetail', params: { eventId: event.id } }">
    <div class="card mb-4">
      <img :src="event.coverImg" class="card-img-top" :alt="`Image for the ${event.name} event`">
      <div class="card-body">
        <h5 class="card-title">{{ event.name }}</h5>
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
</style>