<script setup>
import { AppState } from '@/AppState.js';
import TowerEventCard from '@/components/TowerEventCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const events = computed(() => AppState.events)

onMounted(() => {
  getEvents()
})

async function getEvents() {
  try {
    await towerEventsService.getEvents()

  }
  catch (error) {
    Pop.error(error, 'Could not get events')
    logger.error('COULD NOT GET EVENTS', error)
  }
}


</script>

<template>
  <section class="continer">
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-md-4">
        <TowerEventCard :event="event" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
