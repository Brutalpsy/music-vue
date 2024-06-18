<template>
  <li class="p-6 bg-gray-50 border border-gray-200">
    <!-- Comment Author -->
    <div class="mb-5">
      <div class="font-bold">{{ comment.user }}</div>
      <time>{{ comment.date }}</time>
    </div>

    <p>
      {{ comment.comment }}
    </p>
  </li>
</template>

<script>
export default {
  name: 'comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
};
</script>
