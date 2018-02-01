<template>
  <div class="wrapper">
    <p class="intro">We will build a playlist based on your the music you choose</p>

    <div class="button-wrapper">
      <button type="button"
              class="btn btn-secondary btn-lg"
              @click="$emit('startAdding')">
        START ADDING MUSIC
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  padding-top: 48px;
  padding-bottom: 48px;
  flex-grow: 1;
}

.intro {
  text-align: center;
  margin-bottom: 32px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
