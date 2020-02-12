<style lang="scss">
  .edit-avatar {
    position: absolute;
    background: rgba(0,0,0,.5);
    backdrop-filter: saturate(180%) blur(20px);
    line-height: 1;
    bottom: 5px;
    left: 5px;
    padding: 10px;
    border-radius: .3em;
    color:white;
  }
</style>
<template>
  <div>
    <p class="breadcrumbs small text-muted mb-2">Organisation / Overview</p>
    <h1 class="m-0 h3">Organisation Overview</h1>

    <div class="row mt-5">
      <div class="col-9">
        <form @submit.prevent>
          <text-field class="mb-3" label="Display name"></text-field>

          <div class="mb-3">
            <text-area-field label="Description" class="mb-2"></text-area-field>
            <p class="small m-0 text-muted">
              Descriptions are shown to further clarify which organisation a member is part of.
            </p>
          </div>
        </form>
      </div>
      <div class="col-3 pl-5">
        <label for="avatar-upload">Avatar</label>
        <button class="d-block position-relative">
          <img class="img-fluid rounded" id="avatar"
            src="https://api.adorable.io/avatars/400/abott@adorable.io.png" alt="Avatar">
          <div class="edit-avatar"><i class="fas fa-pen-square pr-1"></i> Edit</div>
        </button>
        <input type="file" id="avatar-upload" class="d-none">
      </div>
    </div>

    <hr class="my-5"/>

  </div>
</template>

<script>
import TextArea from '@/components/input/TextArea.vue';
import Text from '@/components/input/Text.vue';

export default {
  components: { TextField: Text, TextAreaField: TextArea },
};
</script>
