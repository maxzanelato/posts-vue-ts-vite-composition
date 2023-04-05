<template>
  <div>
    New Post
    <PostWritter :post="post" />
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

import PostWritter from '@/components/PostWritter.vue';
import { TimelinePost } from '@/interfaces/posts';

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>',
};
</script>

<style lang="scss" scoped></style>
