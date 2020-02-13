<template>
  <div>
    <p class="breadcrumbs small text-muted mb-2">User / Emails</p>
    <h1 class="m-0 h3">Email Settings</h1>

    <ul class="list-group mt-5">
      <li v-for="email in emails.sort((a, b) => a.isPrimary ? -1 : 1)"
        :key="`394_emails_${email.emailAddress}`"
        class="list-group-item d-flex align-items-center">

        <div class="flex-grow-1 py-2">
          <p class="text-weight-bold m-0">
            {{ email.emailAddress }}
            <span v-if="email.isPrimary" class="small text-success text-weight-normal">
              – Primary
            </span>
          </p>
        </div>

        <button v-if="!email.isPrimary" @click="makePrimary(email)"
          class="btn btn-light shadow-sm btn-sm">Make primary</button>

        <button class="ml-5" @click="deleteEmail(email)"><i class="fas fa-trash-alt text-danger"></i></button>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      emails: [
        { emailAddress: 'r0699180@student.thomasmore.be', isPrimary: false },
        { emailAddress: 'hi@lenny.kr', isPrimary: true },
        { emailAddress: 'lenny.kraaijenhof@gmail.com', isPrimary: false },
      ],
    };
  },
};
</script>
