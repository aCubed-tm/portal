<style lang="scss">
  #change {
    font-size: .8em;
    margin-bottom: 0px;
    text-decoration: underline;
    :hover {
      color: rgb(167, 39, 86);
    }
  }
</style>

<template>
  <div class="form-group">
    <label v-if="label" :for="id" v-html="label"></label>
    <div v-if="change" class="float-right text-primary" id="change" v-on:click="goBack">
      <p>Change</p>
    </div>

    <input :id="id" type="email" class="form-control" :placeholder="placeholder"
      :value="localValue" @input="updateLocalValue($event)"
      :disabled="disabled" :readonly="readonly">

    <transition name="fadeY">
      <div v-if="error" class="float-left text-secondary w-100" id="error">
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
    change: {
      default: false,
    },
    error: {
      default: false,
    },
  },
  methods: {
    goBack() {
        this.$emit('go-back');
    },
  },
};
</script>
