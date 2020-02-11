<style lang="scss">
  #nav {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;

    #nav-bar {
      position: relative;
      width: 60px;
      height: 100vh;
      padding:30px 10px;

      &.filled {
        background: linear-gradient(135deg, rgb(82, 48, 107) 0%,
          rgb(79, 31, 97) 33%, rgb(35, 13, 51) 66%, rgb(105, 45, 128) 100%);
        background-size: 200% 200%;
        animation: gradient 10s ease infinite;
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
          color: #1D0C31;
          font-size: .7em;
          line-height: 1;
        }
      }
    }

    #menu-panel {
      position: relative;
      width: 260px;
      height: 100vh;
      padding:30px;
      background: #eee;

      h1 {
        font-size: 1.6em;
      }
    }
  }

  .shadow-spacer {
    bottom: 0;
    right: 0;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    top: 0px;
    transition-duration: 0.22s;
    transition-property: left, opacity, width;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
    width: 12px;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.2) 0px,
      rgba(0, 0, 0, 0.2) 1px, rgba(0, 0, 0, 0.1) 1px, rgba(0, 0, 0, 0) 100%);

    &.lighten {
      background: linear-gradient(to left, rgba(0, 0, 0, 0.05) 0px,
      rgba(0, 0, 0, 0.05) 1px, rgba(0, 0, 0, 0.03) 1px, rgba(0, 0, 0, 0) 100%);
    }
  }

  @keyframes gradient {
    0% {
      background-position: 50% 0%;
    }
    50% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 50% 00%;
    }
  }
</style>

<template>
  <div id="nav">
    <div id="nav-bar" :class="{ filled }">
      <div class="shadow-spacer"></div>
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

    <div id="menu-panel">
      <div class="shadow-spacer lighten"></div>
      <h1>
        Administratie
      </h1>
      <organisation-switcher></organisation-switcher>
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
