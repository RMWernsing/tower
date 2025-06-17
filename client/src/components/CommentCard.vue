<script setup>
import { AppState } from '@/AppState.js';
import { Comment } from '@/models/Comment.js';
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const account = computed(() => AppState.account)
const comments = computed(() => AppState.comments)

defineProps({
  comment: { type: Comment, required: true }
})

async function deleteComment(commentId) {
  try {
    const confirm = await Pop.confirm('Are you sure you want to delete this comment?', 'If you do, it will be gone forever')
    if (!confirm) {
      return
    }
    await commentsService.deleteComment(commentId)
  }
  catch (error) {
    Pop.error(error, 'Could not delete comment')
    logger.error('COULD NOT DELETE COMMENT', error)
  }
}

</script>


<template>
  <div class="rounded-5 shadow-lg p-3 d-flex gap-4 bg-light">
    <img :src="comment.creator.picture" :alt="`profile picture for ${comment.creator.name}`">
    <div class="mt-2 me-3 flex-grow-1">
      <div class="d-flex justify-content-between">
        <p class="text-gray fw-semibold">{{ comment.creator.name }}</p>
        <span @click="deleteComment(comment.id)" v-if="account?.id == comment.creatorId"
          class="mdi mdi-trash-can-outline text-danger fs-4" title="delete comment" type="button"></span>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  height: 3.2em;
}
</style>