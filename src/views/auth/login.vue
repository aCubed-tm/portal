<template>
  <div>
    <h1>Sign in to Portal</h1>
    <form @submit.prevent="">
      <email/>
    </form>
  </div>
</template>

<script>
import email from '@/components/input/email.vue';

export default {
  components: { email },
};
</script>
