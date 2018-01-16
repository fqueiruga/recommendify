<template>
  <div class="wrapper">
    <button type="button"
            class="btn btn-secondary"
            :disabled="isDisabled"
            @click="$emit('click')">
      <slot></slot>
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: ["disabled"]
})
export default class MainActionButton extends Vue {
  get isDisabled() {
    return this.disabled;
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";

.wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: auto;
  margin: auto;
  padding: 0.25rem;
  display: flex;
}

button {
  margin-top: auto;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
