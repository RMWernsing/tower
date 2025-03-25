<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';


defineProps({
  event: { type: TowerEvent, required: true }
})

</script>


<template>
  <div>{{ event.name }}</div>
</template>


<style lang="scss" scoped></style>