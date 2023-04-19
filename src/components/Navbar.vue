<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="userStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button"
          >New post</RouterLink
        >
        <button class="button" @click="userStore.logout()">
          Log out
        </button>
      </div>

      <div v-else class="buttons">
        <button class="button" @click="modal.showModal()">
          Sign up
        </button>
        <RouterLink to="/posts/new" class="button"
          >Sign in</RouterLink
        >
      </div>
    </div>
  </div>
  <Teleport to="#modal"> <SignUpForm /> </Teleport>
</template>

<script lang="ts" setup>
import { useUsers } from '@/stores/users';
import { useModal } from '@/composables/modal';
import SignUpForm from '@/components/SignUpForm.vue';

const modal = useModal();
const userStore = useUsers();
</script>

<style lang="scss" scoped>
.navbar-end {
  display: flex;
  justify-content: flex-end;
}
</style>
