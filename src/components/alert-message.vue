<template>
  <div v-if="visible"
       class="alert alert-danger rounded-0 custom-alert"
       role="alert">
    <button type="button"
            @click="close"
            class="close"
            aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      visible: true
    };
  },

  methods: {
    close() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-alert {
  z-index: 9999;
}
</style>
