<template>
  <transition name="slide">

  <div class="mdl" v-if="show">
    <div class="mdl-content">
      <div class="mdl-header">
        <span class="fill"></span>
        <button type="button" class="btn btn-outline-light" @click="close">
          <icon name="times"></icon>
        </button>
      </div>
      <div class="mdl-body">
        <slot></slot>
      </div>
    </div>
  </div>

  </transition>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: ["show"]
})
export default class Modal extends Vue {
  close() {
    console.log("on modal close");
    this.$emit("close");
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";

$header-height: 48px;

.mdl-header {
  z-index: $z-index-modal-header;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding-bottom: 1rem;
  padding: 0.5rem;
  background-color: $primary;

  .fill {
    flex-grow: 1;
  }

  button {
    display: flex;
  }
}

.mdl {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: $z-index-modal;
  left: 0;
  top: 0;
  overflow-x: hidden;
  // left: 0;
  // position: ab§solute;
  // right: 0;
  // top: 0;
  // height: 100vh;
  // transform: translateY(100%);
  background: $light-gray;
  padding: 24px;
  transition: 0.5s;
}

.slide-enter-active {
  transition: height 0.3 ease;
}

.slide-leave-active {
  transition: height 0.8 ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}

.slide-enter-to {
  transform: translateY(0%);
}

.mdl-content {
}

.mdl-body {
  margin: auto;
  margin-top: $header-height;
  max-width: 1000px;
  align-self: center;
}

.modal.modal-fullscreen {
  /* Maximize the main wrappers on the screen */
  .modal-dialog,
  .modal-content {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  /* Make the parent wrapper of the modal box a full-width block */
  .modal-dialog {
    margin: 0;
    width: 100%;
  }
}
</style>
