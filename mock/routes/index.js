const Mock = require('mockjs')
// const { deepClone ,initRoutes} = require('../utils')
// debugger

const { configRouter } = require('./router.config.js')


const Obj = {
	routes:configRouter
}



module.exports = [
  // 获取所有路径r
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      // debugger
      return {
        code: 20000,
        data: Obj
      }
    }
  }
]
