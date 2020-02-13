<style lang="scss">
  @import '@/assets/styles/light/main';

  #content {
    border-left: 1px solid rgb(245, 245, 248);
  }
</style>

<template>
  <div class="h-100 d-flex">
    <NavBar>
      <organisation-switcher></organisation-switcher>
      <h2 class="small text-muted text-uppercase font-weight-bold mt-5 pl-3">Organisation</h2>
      <ul class="nav flex-column nav-pills" role="tablist">
        <li class="nav-item">
          <router-link :to="'/organisation/overview'" class="nav-link" active-class="active">Overview</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/organisation/members'" class="nav-link" active-class="active">Members</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/organisation/traceables'" class="nav-link" active-class="active">Traceables</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/organisation/info'" class="nav-link" active-class="active">Info</router-link>
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
import OrganisationSwitcher from '@/components/OrganisationSwitcher.vue';
import Nav from '@/components/Nav.vue';

export default {
  components: { NavBar: Nav, OrganisationSwitcher },
};
</script>
