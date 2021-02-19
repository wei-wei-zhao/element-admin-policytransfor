<template>
  <div>
    <!-- <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" /> -->
    <svg-icon icon-class="theme" @click="showThem=!showThem" />
  </div>
</template>

<script>
// import { addClass, removeClass } from '@/utils'

export default {
  name: 'Theme',
  data() {
    return {
      showThem: false
    }
  },
  watch: {
    showThem(value) {
      // removeClass(document.body, 'showRightPanel')
      // if (value) {
      // console.log(addClass, removeClass ,'false')
      //   addClass(document.body, 'showRightPanel')
      // } else {
      //   console.log(addClass, removeClass ,'false')
      //   removeClass(document.body, 'showRightPanel')
      // }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
