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
      <h2 class="small text-muted text-uppercase font-weight-bold mt-5 pl-3">User</h2>
      <ul class="nav flex-column nav-pills" role="tablist">
        <li class="nav-item">
          <router-link :to="'/user/profile'" class="nav-link" active-class="active">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/user/organisations'" class="nav-link" active-class="active">Organisations</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/user/emails'" class="nav-link" active-class="active">Emails</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/user/security'" class="nav-link" active-class="active">Security</router-link>
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
