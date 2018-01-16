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
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    message: {
      type: String,
      default: ""
    }
  }
})
export default class AlertMessage extends Vue {
  data() {
    return {
      visible: true
    };
  }

  close() {
    this.visible = false;
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";

.custom-alert {
  z-index: $z-index-alert;
}
</style>
