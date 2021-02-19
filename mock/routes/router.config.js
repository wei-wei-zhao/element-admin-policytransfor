  // 后台返回路径配置
const configRouter = [
	//---------------保单管理--------------
  'policymanage',//保单管理
    'pending',//待处理任务查看
      'verifypendingsch',//待审核数据查询
      'inputpendingsch',//待录入数据查询
      'checkbackpendingsch',//抽检打回待处理查询
    'veryfyimg',//保单图片审核
    // 'veryfyimgpage',//保单图片审核
    'inputdata',//保单信息录入
    'datamodify',//保单查看修改
    'checkdevopsmodify',//抽检运维修改
    'checkdata',//保单信息抽检
      'checkdatasch',//已抽检数据查询
      'nocheckdatasch',//未抽检数据查询
    'errdata',//保单异常数据
      'verifyerrdata',//审核异常数据
      'inputerrdata',//录入异常数据

  // --------------数据管理----------------
  'datamanage',//数据管理
    'statiview',//统计数据查看
      'verifystatic',//审核数据统计
      'inputstatic',//录入数据统计
      'updatastatic',//业务上传量统计
      'personalstatic',//个人作业数据统计
      'cyclestatic',//批次周期统计
    'backstatic',//打回数据查看
      'verifybackstatic',//保单审核数据打回查看
      'inputbackstatic',//录入打回数据详情查看
      'checkbackstatic',//抽检打回数据详细查询

  // --------------用户管理----------------
  'usermanage',//用户管理
    'usernamepsd',//用户名与密码设置
    'authority',//用户权限配置

  // --------------其他管理----------------
  'othermanage',//其他管理
    'ossurl',//图片管理

]



module.exports = {
  configRouter
}
