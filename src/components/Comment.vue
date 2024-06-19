<template>
  <li class="p-6 bg-gray-50 border border-gray-200">
    <!-- Comment Author -->
    <div class="mb-5">
      <div class="font-bold">{{ comment.userName }}</div>
      <time>{{ comment.datePosted }}</time>
    </div>

    <p>
      {{ comment.content }}
    </p>
  </li>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
};
</script>
