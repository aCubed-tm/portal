<style lang="scss">
  @import '@/assets/styles/main-light';

  .searchbar{
      width: 280px;
  }
</style>
<template>
    <div>
        <div class="searchbar m-5">
            <search placeholder='Search'><i class="fas fa-search"></i></search>
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
