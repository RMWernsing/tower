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
  <section class="container-fluid text-light txt-shadow">
    <div class="row bg-img">
      <div class="col-12">
        <div class="row">
          <div class="col-md-4">
            <h1>Event management for people, by people</h1>
            <p class="fs-5">Whatever your interest, from hiking and reading to networking and skill sharing, there are
              thousands of
              people who share it on Tower. Events are happening every day - log in to join the fun</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row mt-5">
      <div class="col-12">
        <h2>How Tower Works</h2>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-md-5">
          <div class="d-flex bg-grey p-4 gap-3 my-5">
            <span class="mdi mdi-magnify fs-2 text-success"></span>
            <div>
              <p class="fs-4 fw-bold">Discover events you're interested in</p>
              <p>Browse through community hosted events for all the things you love</p>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="d-flex bg-grey p-4 gap-3 my-5">
            <span class="mdi mdi-plus fs-2 text-success"></span>
            <div>
              <p class="fs-4 fw-bold">Start an event to invite your friends</p>
              <p>Create your own Tower event, and draw from a community of millions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-md-4">
        <TowerEventCard :event="event" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.bg-img {
  background-image: url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  height: 80dvh;
  background-position: center;
  background-size: cover;
}

.txt-shadow {
  text-shadow: 1px 1px 5px black;
}
</style>
