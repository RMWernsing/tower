<script setup>
import { AppState } from '@/AppState.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';



const editableEventData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: '',
  startDate: '',
  type: '',

})

async function createEvent() {
  try {
    await towerEventsService.createEvent(editableEventData.value)
    editableEventData.value = {
      name: '',
      description: '',
      coverImg: '',
      location: '',
      capacity: '',
      startDate: '',
      type: '',
    }
    Modal.getOrCreateInstance('#eventModal').hide()
  }
  catch (error) {
    Pop.error(error, 'Could not create event')
    logger.error('COULD NOT CREATE DATE', error)
  }
}

</script>


<template>
  <form @submit.prevent="createEvent()">
    <div class="form-floating mb-3">
      <input v-model="editableEventData.name" type="text" class="form-control" id="name" placeholder="name..." required
        minlength="3" maxlength="50">
      <label for="name">name</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableEventData.description" type="text" class="form-control" id="description"
        placeholder="Description..." required minlength="15" maxlength="1000">
      <label for="description">Description</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImg"
        placeholder="Cover Image..." required maxlength="1000">
      <label for="coverImg">Cover Image</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableEventData.location" type="text" class="form-control" id="location"
        placeholder="Location..." required minlength="1" maxlength="1000">
      <label for="location">Location</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableEventData.capacity" type="number" class="form-control" id="capacity"
        placeholder="Capacity..." required min="1" max="5000">
      <label for="capacity">Capacity</label>
    </div>
    <div class="border rounded py-3 ps-3 mb-3">
      <label for="date">Date</label>
      <input v-model="editableEventData.startDate" type="date" id="date" name="date" required>
    </div>
    <div class="form-floating mb-3">
      <select v-model="editableEventData.type" class="form-select" id="type" aria-label="Event Type" required>
        <option selected>Open this select menu</option>
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
      <label for="type">Event Type</label>
    </div>
    <div>
      <button class="btn btn-success" title="click to submit" type="submit">submit</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>