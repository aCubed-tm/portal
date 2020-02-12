<style lang="scss">
  .ac-dropdown {
    position: relative;

    &.align-right .ac-dropdown--list-container {
      right: 0;
    }

    .ac-dropdown--list-container {
      position: absolute;
      background:white;
      padding: 5px 0;
      border: 1px solid rgba(0, 0, 0, 0.04);
      transform: translateY(5px);
      box-shadow: 0px 7px 13px 2px rgba(0, 0, 0, 0.04);
      min-width: 200px;
      width: 100%;

      .ac-dropdown--list {
        li {
          padding: 5px 10px;

          &:hover {
            color: var(--primary);
            background:rgba(245, 245, 248, 0.527);
            cursor: pointer;
          }

          &.active {
            background:rgba(245, 245, 248, 0.7);
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

<template>
    <div class="ac-dropdown align-right">
      <button :class="btnClass" @click.stop="showSelector = !showSelector">
        <slot name="button">...</slot>
      </button>
      <div :class="{ 'd-none': !showSelector }" class="ac-dropdown--list-container">
        <ul class="ac-dropdown--list list-unstyled">
          <slot name="options">...</slot>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    btnClass: {
      required: false,
      default: 'btn btn-primary btn-sm',
    },
  },

  data() {
    return {
      showSelector: false,
    };
  },

  methods: {
    onOutsideClick() {
      this.showSelector = false;
    },
  },

  mounted() {
    document.addEventListener('click', this.onOutsideClick);
  },

  beforeDestroy() {
    document.removeEventListener('click', this.onOutsideClick);
  },
};
</script>
