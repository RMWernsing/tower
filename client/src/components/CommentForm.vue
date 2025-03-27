<script setup>
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const editableCommentData = ref({
  body: '',
  eventId: route.params.eventId
})

async function createComment() {
  try {
    await commentsService.createComment(editableCommentData.value)
    editableCommentData.value.body = ''
  }
  catch (error) {
    Pop.error(error, 'Could not create comment')
    logger.error('COULD NOT CREATE COMMENT', error)
  }
}

</script>


<template>
  <div>
    <h3 class="fs-4">
      Create a Comment
    </h3>
  </div>
  <form @submit.prevent="createComment()">
    <div class="form-floating mt-4">
      <textarea v-model="editableCommentData.body" class="form-control textarea-height"
        placeholder="Leave a comment here" id="body" required minlength="1" maxlength="5000"></textarea>
      <label for="body">Comment</label>
    </div>
    <div class="mt-3 text-end">
      <button class="btn btn-success" title="submit comment" type="submit">Post</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
.textarea-height {
  min-height: 20dvh;
  max-height: 35dvh;
}
</style>