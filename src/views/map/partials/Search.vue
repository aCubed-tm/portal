<style lang="scss">
    #wrapper .container-fluid {
        background: rgb(11,4,37);
        background: radial-gradient(200% 150% ellipse at 50% 215%,
        rgba(190,100,154,1), rgba(11,4,37,1));
        background-repeat: no-repeat;
        background-attachment: fixed;
        min-height: calc(var(--vh, 1vh) * 100);
  }
  .searchbar{
      width: 200px;
  }
</style>
<template>
    <div id="wrapper" class="text-white">
        <div class="container-fluid">
            <div class="searchbar">
                <search placeholder='Search'><i class="fas fa-search"></i></search>
            </div>
        </div>
    </div>
</template>
<script>
import Search from '@/components/input/Search.vue';

export default {
    name: 'map-search',
    components: { Search },
};
</script>
