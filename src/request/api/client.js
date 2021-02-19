import base from '../base.js' // 导入接口域名列表
import axios from '../http.js' // 导入http中创建的axios实例

const client = {
  newList(params) { // 首页邀请人列表
    return axios.post(`${base.entry}/oldInviteNew/newList`, params)
  },
  getQrcode(params) { // 获取二维码
    // headers
    return axios.post(`${base.clientEntry}/api/v1/qrcode/create?trade_source=uc`, params, {
      headers: {
        appid: base.appid
      }
    })
  },
  getBaseQrcode(params) { // 轮播页面获取二维码 返回base64
    return axios.post(`${base.clientEntry}/api/v1/qrcode/img/create?trade_source=yxbuc&scene=0006`, params, {
      headers: {
        appid: base.appid
      }
    })
  },
  wechatSignatureinfo(params) { // 微信鉴权
    var _url = window.location.href
    if (window.__wxjs_is_wkwebview === true) {
      _url = _url.split('#')[0]
    }
    if (window.__wxjs_is_wkwebview !== true) {
      _url = _url.split('#')[0]
    }
    return axios.get(`${base.clientEntry}/api/v2/wechat/signatureinfo/get?page_url=${_url}`, params)
  }
  // getUserInfo(params) { // 用户信息查询
  //   return axios.get(`${base.clientEntry}/api/v1/user/query?token=${getCookie('uc_token')}`)
  // }
}

export default client
