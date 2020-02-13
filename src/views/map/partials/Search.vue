<template>
  <div>
    <SearchBox v-model="query"/>
    <SearchResults @detail="$emit('detail', $event)" :query="query" :objects="objects"/>
  </div>
</template>

<script>
import SearchBox from './SearchBox.vue';
import SearchResults from './SearchResults.vue';

export default {
  components: { SearchBox, SearchResults },

  data() {
    return {
      query: '',
    };
  },

  props: {
    objects: {
      required: true,
    },
  },
};
</script>
