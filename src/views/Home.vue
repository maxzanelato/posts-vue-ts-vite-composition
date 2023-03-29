<template>
  <suspense>
    <template #default>
      <Timeline />
    </template>
    <template #fallback>
      <progress class="progress is-small is-primary" max="100">
        15%
      </progress>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import Timeline from '@/components/Timeline.vue';
</script>
