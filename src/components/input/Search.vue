<template>
  <div class="form-group">
    <label v-if="label" :for="id" v-html="label"></label>
    <div class="input-group mb-3">
      <div class="input-group-prepend border-right-0">
        <span class="form-control border-right-0">
          <slot></slot>
        </span>
      </div>
      <input :id="id" type="text" class="form-control border-left-0" :placeholder="placeholder"
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
