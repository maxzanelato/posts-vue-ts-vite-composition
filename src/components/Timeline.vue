<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="postStore.setSelectedPeriod(period)"
        :class="{ 'is-active': period === postStore.selectedPeriod }"
      >
        {{ period }}
      </a>
    </span>

    <TimelineItem
      v-for="post of postStore.filteredPosts"
      :key="post.id"
      :post="post"
    >
      <a>{{ post.title }}</a>
      <div>{{ post.created.toFormat('dd MMM') }}</div>
    </TimelineItem>
  </nav>
</template>

<script setup lang="ts">
import { periods } from '@/constants';
import { usePosts } from '@/stores/posts';
import TimelineItem from '@/components/TimelineItem.vue';

const postStore = usePosts();

await postStore.fetchPosts();
</script>

<style scoped></style>
