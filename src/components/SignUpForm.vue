<template>
  <form class="form">
    <FormInput
      type="text"
      name="Username"
      v-model="username"
      :status="usernameStatus"
    />
    <FormInput
      type="password"
      name="Password"
      v-model="password"
      :status="passwordStatus"
    />

    <button
      class="button"
      @click.prevent="handleSubmit"
      :disabled="isInvalid"
    >
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useUsers } from '@/stores/users';
import { validate } from '@/utils/validate';
import { NewUser } from '@/interfaces/user.js';
import { useModal } from '@/composables/modal';
import FormInput from '@/components/FormInput.vue';
import { length, required } from '@/interfaces/rule';

const modal = useModal();
const userStore = useUsers();

const username = ref('');
const password = ref('');

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const usernameStatus = computed(() => {
  return validate(username.value, [
    required,
    length({ min: 5, max: 10 }),
  ]);
});

const passwordStatus = computed(() => {
  return validate(password.value, [
    required,
    length({ min: 10, max: 40 }),
  ]);
});

const handleSubmit = async () => {
  if (isInvalid.value) {
    return;
  }

  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };

  try {
    await userStore.createUser(newUser);
  } finally {
    modal.hideModal();
  }
};
</script>

<style scoped lang="scss">
.form {
  background-color: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
