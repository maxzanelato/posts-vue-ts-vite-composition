<template>
  <div
    class="modal"
    style="display: block; color: white"
    :style="modalStyle"
  >
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>

    <button
      class="modal-close is-large"
      @click="modal.hideModal()"
    ></button>
  </div>

  <div class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useUsers } from './stores/users';
import Navbar from './components/Navbar.vue';
import { useModal } from './composables/modal';

const modal = useModal();
const userStore = useUsers();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? 'block' : 'none',
  };
});

userStore.authenticate();
</script>

<style>
@import 'bulma/css/bulma.min.css';
@import 'highlight.js/styles/atom-one-dark.css';

ul {
  list-style: revert !important;
  list-style-position: inside !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}
</style>
