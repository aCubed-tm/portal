<style lang="scss">
  @import '@/assets/styles/main';

  #app {
      width: 100vw;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
      @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          height: 100vh;
          height: calc(var(--vh, 1vh) * 100);
          align-items: center;
      }
      overflow-y: auto;
      position: absolute;
  }
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>
