import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css
import '@/styles/reset.css' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': false, 'button': false, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': false, 'keyboard': true, 'url': 'data-source' }
})
// Viewer.setDefaults({
//   Options: {
//     'inline': true, // 启用 inline 模式 默认false
//     'button': true, // 显示右上角关闭按钮 默认true
//     'navbar': true, // 显示缩略图导航 默认true
//     'title': true, // 显示当前图片的标题 默认true
//     'toolbar': true, // 显示工具栏 默认true
//     'tooltip': true, // 显示缩放百分比 默认true
//     'movable': true, // 图片是否可移动 默认true
//     'zoomable': true, // 图片是否可缩放 默认true
//     'rotatable': true, // 图片是否可旋转 默认true
//     'scalable': true, // 图片是否可翻转 默认true
//     'transition': true, // 使用css3过度 默认true
//     'fullscreen': true, // 是否全屏 默认true
//     'keyboard': true, // 是否支持键盘 默认true
//     'url': 'data-source' // 设置大图片的URL
//   }
// })

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
