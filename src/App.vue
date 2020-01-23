<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/registerPassword">Reg-pass</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background: rgb(11,4,37);
  background: radial-gradient(200% 150% ellipse at 50% 215%, rgba(190,100,154,1), rgba(11,4,37,1));
  background-repeat: no-repeat;
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
