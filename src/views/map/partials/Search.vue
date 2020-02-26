<template>
  <div>
    <SearchBox v-model="query"/>
    <SearchResults v-if="initialLoadCompleted"
      @detail="$emit('detail', $event)" :query="query" :objects="objects"/>

    <div v-else class="d-flex justify-content-center align-items-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
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
    initialLoadCompleted: {
      required: false,
      default: true,
    },
    objects: {
      required: true,
    },
  },
};
</script>
