export default {
  props: ['value'],

  data: (vm) => ({
      localValue: vm.value,
  }),

  methods: {
    updateLocalValue(event) {
      this.localValue = event.target.value;
      this.$emit('input', this.localValue);
    },
  },

  watch: {
    value(newValue) {
        this.localValue = newValue;
    },
  },
};
