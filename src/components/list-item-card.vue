<template>
  <div class="list-item">
    <div class="first-row">

      <div class="thumbnail">
        <img :src="image" :alt="title">
      </div>
      <div class="title">
        <h5>{{title}}</h5>
      </div>
    </div>

    <div class="second-row" v-if="hasActionsSlot || hasInfoSlot ">
      <div class="info" v-if="hasInfoSlot">
        <slot name="info"></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: ["title", "image", "isAdded"]
})
export default class ListItemCard extends Vue {
  get hasActionsSlot() {
    return !!this.$slots["actions"];
  }

  get hasInfoSlot() {
    return !!this.$slots["info"];
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/vars";
$height: 120px;
$inner-border: 1px solid $gray-400;

.list-item {
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
  background-color: $white;
}

.first-row {
  height: $height;
  display: flex;
  flex-direction: row;

  .title {
    flex-grow: 1;
    padding: 1rem;
    display: flex;
    align-items: center;
    text-align: center;
  }
}

.second-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-top: $inner-border;

  .actions {
    padding: 1rem;
    display: flex;
    align-items: center;
  }

  .info {
    border-left: $inner-border;
    padding: 1rem;
    flex-grow: 1;

    small {
      display: block;
    }
  }
}

.thumbnail {
  position: relative;
  width: $height;
  height: $height;
  overflow: hidden;
}

.thumbnail img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
