<style lang="scss">
  .search{
    position:relative;
  }
  .search:before{
    content: "\f002";
    font-family: "Font Awesome 5 Free";
    left:-5px;
    position:absolute;
    top:0;
  }
</style>
<template>
  <div class="form-group">
    <label v-if="label" :for="id" v-html="label"></label>
    <div class="input-group mb-3">
      <i class="fas fa-search"></i>
      <input :id="id" type="text" class="search form-control rounded-right" :placeholder="placeholder"
              :value="localValue" @change="updateLocalValue($event)"
              :disabled="disabled" :readonly="readonly">
    </div>
  </div>
</template>

<script>
import input from './_input';

const generateId = (length = 20) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default {
  mixins: [input],

  props: {
    id: {
      default: generateId(),
    },
    label: {
      default: false,
    },
    placeholder: {
      default: '',
    },
    disabled: {
      default: false,
    },
    readonly: {
      default: false,
    },
    change: {
      default: false,
    },
    error: {
      default: false,
    },
  },
};
</script>
