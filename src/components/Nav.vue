<style lang="scss">
  #nav {
    position: relative;
    top: 0;
    left: 0;
    display: flex;

    #nav-bar {
      position: relative;
      width: 60px;
      height: 100vh;
      padding:30px 10px;

      &.filled {
        background: rgb(245, 245, 248);
      }

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      section.profile-links {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .profile {
          height: 25px;
          width: 25px;
          color: #fff;
          font-size: .7em;
          line-height: 1;
        }
      }
    }

    #menu-panel {
      position: relative;
      width: 340px;
      height: 100vh;
      padding:30px;
      background: white;
      border-left: 1px solid rgb(245, 245, 248);
      border-right: 1px solid rgb(245, 245, 248);

      h1 {
        font-size: 1.6em;
      }
    }
  }
</style>

<template>
  <div id="nav">
    <div id="nav-bar" :class="{ filled }">
      <section class="app-links">

      </section>
      <section class="profile-links">
        <a href="">
          <div class="profile rounded-circle bg-primary d-flex justify-content-center align-items-center">
            L
          </div>
        </a>
      </section>
    </div>

    <div id="menu-panel" class="d-flex flex-column">
      <section class="top flex-grow-1">
        <organisation-switcher></organisation-switcher>

        <ul class="nav flex-column nav-pills mt-5" role="tablist">
          <li class="nav-item">
            <a href="#" class="nav-link active">Overview</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Members</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Traceables</a>
          </li>
        </ul>
      </section>
      <section class="bottom flex-end">
      </section>
    </div>
  </div>
</template>

<script>
import OrganisationSwitcher from '@/components/OrganisationSwitcher.vue';

export default {
  components: { OrganisationSwitcher },

  props: {
    filled: {
      required: false,
      default: true,
    },
  },
};
</script>
