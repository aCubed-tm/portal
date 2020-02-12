<style lang="scss">
  #members {
    .avatar {
      height: 50px;
      width: 50px;
      object-fit: cover;
    }
  }
</style>

<template>
  <div id="members">
    <p class="breadcrumbs small text-muted mb-2">Organisation / Members</p>
    <h1 class="m-0 h3">Members & Administrators</h1>

    <ul class="list-group mt-5">
      <li class="list-group-item d-flex align-items-center">
        <img src="https://api.adorable.io/avatars/400/abott@adorable.io.png"
          alt="Avatar" class="rounded avatar">

        <div class="flex-grow-1 mx-3 my-0">
          Lenny Kraaijenhof
          <span class="d-block small text-muted">hi@Lenny.kr</span>
        </div>

        <span class="d-block mx-3 my-0">Member</span>

        <drop-down>
          <template v-slot:button>
            <i class="fas fa-user-cog pr-1"></i>
            <i class="fas fa-chevron-down"></i>
          </template>
          <template v-slot:options>
            <li>
              <button class="small" @click.prevent>Grant admin permissions</button>
            </li>
            <li>
              <button class="small" @click.prevent>Revoke admin permissions</button>
            </li>
            <li>
              <button class="small" @click.prevent>Remove from organisation</button>
            </li>
          </template>
        </drop-down>

      </li>
    </ul>
  </div>
</template>

<script>
import DropDown from '@/components/DropDown.vue';

export default {
  components: { DropDown },
};
</script>
