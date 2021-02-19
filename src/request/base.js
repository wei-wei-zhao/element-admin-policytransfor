/**
 * 接口域名的管理
 **/
const base = {
  entry: process.env.VUE_APP_BASE_URL, // 项目入口
  clientEntry: process.env.VUE_APP_CLIENT_URL, // 二维码和微信鉴权入口
  configEntry: process.env.VUE_APP_CONFIG_URL, // 配置config文件
  appid: process.env.VUE_APP_APPID
}

export default base
