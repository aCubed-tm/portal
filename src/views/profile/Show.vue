<style lang="scss">
  @import '@/assets/styles/light/main';
</style>

<template>
  <div class="h-100 d-flex">
    <NavBar></NavBar>
    <section id="content" class="flex-grow-1">
      <div class="container-sm pt-4">
        <p class="breadcrumbs small text-muted mb-2">Admin / Organisation Overview</p>
        <h1 class="m-0 h3">Organisation Overview</h1>
      </div>
    </section>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  components: { NavBar: Nav },
};
</script>
