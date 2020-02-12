<style lang="scss">
  #nav {
    position: relative;
    top: 0;
    left: 0;
    display: flex;

    .logo {
      margin-top: 13px;
    }

    #nav-bar {
      position: relative;
      width: 60px;
      height: 100vh;
      padding:30px 10px;

      &.filled {
        background: #f9f9ff;
      }

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      section.bottom-links {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        a {
          text-decoration: none;
        }

        .org-settings  {
          height: 33px;
          width: 33px;
          color: #b0b0d5;
          font-size: 25px;
          line-height: 1;

          &.router-link-active  {
            background: #b0b0d536;
          }
        }

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
      <section class="top-links">
        <router-link :to="'/map'">
          <img class="w-100 p-1 logo" src="/images/logo.svg"/>
        </router-link>
      </section>
      <section class="bottom-links">
        <router-link :to="'/organisation'"
          class="org-settings rounded-circle d-flex justify-content-center align-items-center mb-3">
          <i class="fas fa-cog"></i>
        </router-link>

        <router-link :to="'/user'"
          class="profile rounded-circle bg-primary d-flex justify-content-center align-items-center">
            L
        </router-link>
      </section>
    </div>

    <div id="menu-panel" class="d-flex flex-column" :class="{ 'd-none': !showPanel }">
      <section class="flex-grow-1">
        <slot/>
      </section>
      <footer class="flex-end">
        <slot name="footer"/>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filled: {
      required: false,
      default: true,
    },
    showPanel: {
      required: false,
      default: true,
    },
  },
};
</script>
