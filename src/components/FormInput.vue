<template>
  <div class="field">
    <label for="name" class="label">{{ name }}</label>
    <div class="control">
      <input
        :type="type"
        class="input"
        :value="modelValue"
        @input="handleInput"
      />
    </div>

    <p class="is-danger help" v-if="!status.valid">
      {{ status.message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Status } from '@/interfaces/status';

defineProps<{
  name: string;
  modelValue: string;
  status: Status;
  type: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const handleInput = (e: Event) => {
  const value = e.target as HTMLInputElement;
  emit('update:modelValue', value.value);
};
</script>
