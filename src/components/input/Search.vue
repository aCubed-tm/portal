<style lang="scss">
.has-search{
  border-radius: 40px;
    .form-control {
      padding-left: 2.375rem;
      border-radius: 40px;

  };
  .form-control-feedback {
      position: absolute;
      margin: 15px 12px;
      color: #aaa;
  };
}
</style>
<template>
<div>
  <div class="form-group has-search border">
    <span class="fa fa-search form-control-feedback"></span>
    <input :id="id" type="text" class="form-control" :placeholder="placeholder"
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
