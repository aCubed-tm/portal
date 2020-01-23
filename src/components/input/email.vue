<template>
  <div class="form-group">
    <label v-if="label" :for="id" v-html="label"></label>
    <input :id="id" type="email" class="form-control" :placeholder="placeholder"
      :disabled="disabled" :readonly="readonly">
  </div>
</template>

<script>

const generateId = (length = 20) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default {
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
  },
};
</script>
