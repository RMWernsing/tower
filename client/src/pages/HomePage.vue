<script setup>
import { AppState } from '@/AppState.js';
import EventFormModal from '@/components/EventFormModal.vue';
import TowerEventCard from '@/components/TowerEventCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { all } from 'axios';
import { computed, onMounted, ref } from 'vue';

const events = computed(() => {
  if (filterType.value == 'all') {
    return AppState.events
  }
  return AppState.events.filter(event => event.type == filterType.value
  )
})
const filterType = ref('all')
// TODO add color to the types array
const types = [
  {
    name: 'concert',
    span: 'guitar-electric',
    color: 'purple',
  },
  {
    name: 'convention',
    span: `account-group`,
    color: 'primary'
  },
  {
    name: 'sport',
    span: `soccer`,
    color: 'info',
  },
  {
    name: 'digital',
    span: `monitor`,
    color: 'orange'
  },
]

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
  <section class="container-fluid text-light txt-shadow bg-img">
    <div class="row justify-content-evenly">
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-12 mt-5">
            <h1>Event management for people, by people</h1>
            <p class="fs-5">Whatever your interest, from hiking and reading to networking and skill sharing, there are
              thousands of
              people who share it on Tower. Events are happening every day - log in to join the fun</p>
          </div>
        </div>
      </div>
      <div class="col-3 md-none">
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row mt-5 justify-content-center">
      <div class="col-12">
        <h2 class="ms-3">How Tower Works</h2>
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
          <div type="button" title="Create Event" class="d-flex bg-grey p-4 gap-3 my-5" data-bs-toggle="modal"
            data-bs-target="#eventModal">
            <span class="mdi mdi-plus fs-2 text-success"></span>
            <div>
              <p class="fs-4 fw-bold">Click here to start an event!</p>
              <p>Create your own Tower event, and draw from a community of millions.</p>
            </div>
          </div>
        </div>
        <h2 class="mb-5">Explore Categories</h2>
        <div class="col-md-12 d-flex justify-content-evenly flex-wrap">
          <div v-for="type in types" :key="type.name" class="mb-5 filter-width">
            <div @click="filterType = type.name" role="button" :title="`filter for ${type.name} events`"
              class="text-center ">
              <div class="bg-grey rounded-4 py-3">
                <span :class="`mdi mdi-${type.span} text-${type.color} fs-2`"></span>
                <p class="fs-4 fw-semibold">{{ type.name }}</p>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <div @click="filterType = 'all'" role="button" title="Filter for all events"
              class="text-center filter-width">
              <div class="bg-grey rounded-4 py-3">
                <span class="mdi mdi-infinity text-success fs-2"></span>
                <p class="fs-4 fw-semibold">all</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <h2 class="mb-5">Upcoming Events</h2>
      <div v-for="event in events" :key="event.id" class="col-md-4 px-4 mb-4">
        <TowerEventCard :event="event" />
      </div>
    </div>
  </section>
  <EventFormModal />
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

.filter-width {
  width: 200px;
}
</style>
