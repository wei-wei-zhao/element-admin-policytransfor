<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <!-- <ul id="dowebok">
      <li v-for="(item,index) in imglist">
        <img :src="item" alt="">
      </li>
    </ul>

    <div id="imgPlugin" class="viewer-size col-sm-8" style="padding: 0;">
      <div class="imgConclusionDiv">
        <label for="imgConclusionResult" style="color: #cccccc;font-size: 20px;">当前图片结论:</label>
        <span id="imgConclusionResult" class="imgConclusionResult" style="color: #cccccc;font-size: 20px;" />
      </div>
      <div class="docs-galley viewer-size" style="position: relative;">
        <ul id="viewer" class="docs-pictures clearfix" style="display: none;">
          <li class="imageRequestList" style="display: none;" th:each="image ,userStat: ${ocrImageInfoList}">
            <img
              th:src="${image.ossUrl}"
              alt="01"
              th:id="${image.imageId}"
              th:name="${image.imageName}"
              th:class="'imageCheck imgConclusion'+${userStat.index}"
              th:checkcode="unchecked"
              th:imgconclusion="' '+${image.checkResult}"
            >
          </li>
        </ul>

        <div class="imgConclusionCheckDiv">
          <button
            id="succeed"
            onclick="setImagePass()"
            class="imgConclusionCheckButton ant-btn ant-btn-green"
            type="button"
          >通过
          </button>
          <button
            type="button"
            class="btn btn-primary btn-determine ant-btn ant-btn-red"
            data-toggle="modal"
            data-target="#myModal"
          >不通过
          </button>
        </div>

      </div>

    </div> -->

    <!-- <div
      :class="className"
      :style="{top:(isSticky ? stickyTop +'px' : ''),zIndex:zIndex,position:position,width:width,height:height+'px'}"
    >
      <slot>
        <div>sticky</div>
      </slot> -->
    <!-- </div> -->
  </div>
</template>

<script>

// import './css/viewer.css' // a modern alternative to CSS resets
// import Viewer from './utils/viewer.min.js'

// export default {
//   name: 'Viewer',
//   props: {
//     imglist: {
//       type: Array,
//       default: []
//     },
//     options: {
//       type: Object,
//       default: {

//       }
//     },
//     stickyTop: {
//       type: Number,
//       default: 0
//     },
//     zIndex: {
//       type: Number,
//       default: 1
//     },
//     className: {
//       type: String,
//       default: ''
//     }
//   },
//   data() {
//     return {
//       active: false,
//       position: '',
//       width: undefined,
//       height: undefined,
//       isSticky: false
//     }
//   },
//   mounted() {
//     // this.height = this.$el.getBoundingClientRect().height
//     // var viewer = new Viewer(document.getElementById('dowebok'), {
//     //     url: 'data-original',

//     // });

//     // 图片下标
//     var imageIdx = 0
//     var viewer = null

//     // $("#mainContentId").css("padding", 0);
//     // var height = $(window).height() - $(".main-header").height() - 40;
//     // $(".viewer-size").css("height", height);
//     // $("#setHeightToWindow").css("height", height);
//     viewer = new Viewer(document.getElementById('viewer'), {
//       inline: true,
//       title: false,
//       button: false,
//       viewed: function(obj) {
//         imageIdx = obj.detail.index
//         console.log(imageIdx)
//         changeImage()
//       }
//     })
//     $('.sidebar-toggle').click(function() {
//       changeWeightOfDiv()
//     })
//     getCache()
//     getControl()
//     initImageErrorMessage()
//     initMissPageErrorMessage()

//     window.addEventListener('scroll', this.handleScroll)
//     window.addEventListener('resize', this.handleResize)
//   },
//   activated() {
//     this.handleScroll()
//   },
//   destroyed() {
//     window.removeEventListener('scroll', this.handleScroll)
//     window.removeEventListener('resize', this.handleResize)
//   },
//   methods: {
//     build: function() {
//       alert('build')
//     },
//     built: function() {
//       alert('built')
//     },
//     show: function() {
//       alert('show')
//     },
//     shown: function() {
//       alert('shown')
//     },
//     hide: function() {
//       alert('hide')
//     },
//     hidden: function() {
//       alert('hidden')
//     },
//     view: function() {
//       alert('view')
//     },
//     viewed: function() {
//       alert('viewed')
//     },

//     sticky() {
//       if (this.active) {
//         return
//       }
//       this.position = 'fixed'
//       this.active = true
//       this.width = this.width + 'px'
//       this.isSticky = true
//     },
//     handleReset() {
//       if (!this.active) {
//         return
//       }
//       this.reset()
//     },
//     reset() {
//       this.position = ''
//       this.width = 'auto'
//       this.active = false
//       this.isSticky = false
//     },
//     handleScroll() {
//       const width = this.$el.getBoundingClientRect().width
//       this.width = width || 'auto'
//       const offsetTop = this.$el.getBoundingClientRect().top
//       if (offsetTop < this.stickyTop) {
//         this.sticky()
//         return
//       }
//       this.handleReset()
//     },
//     handleResize() {
//       if (this.isSticky) {
//         this.width = this.$el.getBoundingClientRect().width + 'px'
//       }
//     }
//   }
// }
</script>

<style scoped>
  img{
    width:100%;
  }
  li{
        list-style: none;
        padding: 0;
        margin: 0;
  }

  .viewer-zoom-in::before, .viewer-zoom-out::before, .viewer-one-to-one::before, .viewer-reset::before, .viewer-prev::before, .viewer-play::before, .viewer-next::before, .viewer-rotate-left::before, .viewer-rotate-right::before, .viewer-flip-horizontal::before, .viewer-flip-vertical::before, .viewer-fullscreen::before, .viewer-fullscreen-exit::before, .viewer-close::before {
      line-height: 50px;
  }
</style>
