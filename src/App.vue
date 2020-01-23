<style lang="scss" scoped>
  @import './assets/styles/main';

  #app {
      min-height: 100vh;
      min-height: calc(var(--vh, 1vh) * 100);
      @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          height: 100vh;
          height: calc(var(--vh, 1vh) * 100);
          align-items: center;
      }
  }
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>
