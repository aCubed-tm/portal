<template>
  <div class="form-group">
    <label v-if="label" :for="id" v-html="label"></label>
    <input :id="id" type="password" class="form-control" :placeholder="placeholder"
      :value="localValue" @change="updateLocalValue($event)"
      :disabled="disabled" :readonly="readonly">

    <transition name="expandY">
      <div v-if="error && showError" class="float-left text-secondary w-100 text-danger small mt-2" id="error">
        <p>{{error}}</p>
      </div>
    </transition>
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
      default: () => generateId(),
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
    error: {
      default: false,
    },
    showError: {
      default: true,
    },
  },
};
</script>
