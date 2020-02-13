<style lang="scss">
  @import '@/assets/styles/light/main';

  #content {
    border-left: 1px solid rgb(245, 245, 248);
  }
</style>

<template>
  <div class="h-100 d-flex">
    <NavBar>
      <h2 class="small text-muted text-uppercase font-weight-bold mt-5 pl-3">Administrator</h2>
      <ul class="nav flex-column nav-pills" role="tablist">
        <li class="nav-item">
          <router-link :to="'/admin/overview'" class="nav-link" active-class="active">Overview</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/admin/statistics'" class="nav-link" active-class="active">Statistics</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/admin/users'" class="nav-link" active-class="active">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/admin/organisations'" class="nav-link" active-class="active">Organisations</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/admin/cameras'" class="nav-link" active-class="active">Cameras</router-link>
        </li>
      </ul>
    </NavBar>
    <section id="content" class="flex-grow-1">
      <div class="container-sm pt-4">
        <router-view></router-view>
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
