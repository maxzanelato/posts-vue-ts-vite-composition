<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <RouterLink to="/posts/new" class="button"
          >New post</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-end {
  display: flex;
  justify-content: flex-end;
}
</style>
