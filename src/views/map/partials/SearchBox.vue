<style lang="scss">
  .search-box {
    margin-top: 5px;

    input {
      border:none;
      background: transparent !important;
      border-bottom: 1px solid #6f787f38 !important;
      border-radius: 0;
      padding-top:30px;
      padding-bottom:30px;
      outline: 0px !important;
      box-shadow: none !important;
      opacity: 0.6;
      transition: opacity .4s ease;
      padding-left: 2.375rem;

      &:hover, &:focus, &:active {
        outline: 0px !important;
        box-shadow: none !important;;
        border-bottom: 1px solid #6f787f38;
        opacity: 1;
      }
    }

    .form-control-icon {
        position: absolute;
        margin-left: 12px;
        color: #aaa;
        height: 100%;
        display: flex;
        align-items: center;
    };
  }
</style>

<template>
  <div class="search-box position-relative">
    <div class="form-control-icon">
      <span class="fa fa-search"></span>
    </div>
    <text-field v-model="query"
      placeholder="Search for objects by name or type..."></text-field>
  </div>
</template>

<script>
import Text from '@/components/input/Text.vue';

export default {
  components: { TextField: Text },

  data() {
    return {
      query: '',
    };
  },

  watch: {
    query(value) {
      this.$emit('input', value);
    },
  },
};
</script>
