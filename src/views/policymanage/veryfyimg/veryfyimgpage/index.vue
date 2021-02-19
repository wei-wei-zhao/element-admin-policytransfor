<template>
  <div class="app-container veryfyimgpage">
    <!-- <el-alert :closable="false" title="保单信息录入" /> -->
    <el-container>
      <!-- <el-header class="header" /> -->
      <el-main class="viewer-container">
        <div class="el_main_left">
          <div class="viewer_box viewer_header">
            <div>当前图片结论：{{ imgConclusionResult }}</div>
          </div>
          <viewer
            ref="viewer"
            class="veryfyimgpage_viewer clearfix"
            rebuild
            :images="images"
            :options="optionsViewer"
            @inited="inited"
          >
            <template slot-scope="scope">
              <img v-for="src in scope.images" :key="src" :src="src">
            </template>
          </viewer>

          <div class="viewer_box viewer_footer">
            <el-row v-show="isShowImageFailTip" class="veryfyimgpage_imageFailTipSelect">
              <el-select v-model="imageFailTip" clearable placeholder="-请选择一个不通过原因！-">
                <el-option
                  v-for="item in imageFailTipList"
                  :key="item.code"
                  :label="item.message"
                  :value="item.code"
                />
              </el-select>
            </el-row>
            <el-row>
              <el-button v-waves type="primary" @click="setImagePass()">通过</el-button>
              <el-button v-waves type="warning" @click="setImageFail()">{{ isShowImageFailTip ? "确定" : "不通过" }}</el-button>
            </el-row>
          </div>
        </div>
        <div class="el_main_right box_padding_10">
          <div class="el_main_right_content box_shadow box_padding_10">
            <el-row>
              <el-col :span="24">
                <span class="veryfyimgpage_pcTitle">批次号：</span>
                <span class="veryfyimgpage_pcDetail">{{ batchNumber }}</span>
              </el-col>
            </el-row>
            <!-- <el-row class="box_shadow box_padding_10 color666 silver_linerBg veryfyimgpage_companyInfoBox"> -->
            <el-row>
              <el-col :span="24" class="box_shadow box_padding_10 color666 silver_linerBg veryfyimgpage_companyInfoBox">
                <div class="veryfyimgpage_right_defaultTitle">用户选择公司信息</div>
                <div class="veryfyimgpage_company">公司编码：{{ defaultCompanyCode }}</div>
                <div class="veryfyimgpage_company">公司名称：{{ defaultCompanyName }}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">★ 保险公司</el-col>
              <el-col :span="3">{{ company }}</el-col>
              <el-col :span="11">
                <el-select v-model="company" filterable placeholder="请选择保险公司">
                  <el-option
                    v-for="item in companyList"
                    :key="item.code"
                    :label="item.code +' ' + item.message"
                    :value="item.code"
                  />
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">★ 保险单号</el-col>
              <el-col :span="14"><el-input
                v-model="policyNo"
                maxlength="50"
                autocomplete="off"
                clearable
                placeholder="请输入保险单号"
                @paste="doNot()"
                @copy="doNot()"
                @contextmenu="doNot()"
                @blur="getPolicyDetail()"
                @focus="handlerPolicyNo()"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">★ 确认保险单号</el-col>
              <el-col :span="14"><el-input
                v-model="confirmPolicyNo"
                maxlength="50"
                autocomplete="off"
                clearable
                placeholder="请输入保险单号"
                @paste="doNot()"
                @copy="doNot()"
                @contextmenu="doNot()"
                @blur="checkConfirmPolicyNo()"
                @focus="handlerConfirmPolicyNo()"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">★ 生效日期</el-col>
              <el-col :span="14"><el-input
                v-model="effectiveDate"
                clearable
                placeholder="请输入生效日期"
                @input="getStandardDate()"
              /></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">★ 是否缺页</el-col>
              <el-col :span="12">
                <el-radio v-model="isMissingPage" label="0" type="warning" class="text-warning">是</el-radio>
                <el-radio v-model="isMissingPage" label="1" type="primary">否</el-radio>
              </el-col>
            </el-row>
            <el-row v-show="isShowmissingPagebox">
              <el-col :span="4" class="text_vertical">★ 缺页原因</el-col>
              <el-col :span="20">
                <el-checkbox-group v-model="missingPageInfo" class="veryfyimgpage_right_checkbox">
                  <el-checkbox
                    v-for="item in failpageList"
                    :key="item.code"
                    :label="item.message"
                  />
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="box_shadow box_padding_10 color666 silver_linerBg veryfyimgpage_right_default">
                <!-- <div v-show="!policyDetail">库存保单详情</div> -->
                <div class="veryfyimgpage_right_defaultTitle">库存保单详情</div>
                <div v-show="policyName">投保人：{{ policyName }}</div>
                <div v-show="policyDetail" style="color:red;">{{ policyDetail }}</div>
              </el-col>
            </el-row>
            <div class="veryfyimgpage_right_btn">
              <el-button v-waves type="success" @click="toPass()">成功</el-button>
              <el-button v-waves type="danger" @click="toFail()">失败</el-button>
              <el-button v-waves type="" @click="toQuit()">退出</el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// const getMissPageErrorMessage = { 'data': [{ 'id': 17, 'type': 1, 'code': '1', 'message': '缺少投保产品信息（含保额、保费、交费期限、保障期限等）' }, { 'id': 18, 'type': 1, 'code': '2', 'message': '缺少被保险人信息（身份证号、性别、生日等）' }, { 'id': 19, 'type': 1, 'code': '3', 'message': '缺少投保单页（投/被保人身份证/生日等）' }, { 'id': 20, 'type': 1, 'code': '4', 'message': '缺少保障计划一览表' }, { 'id': 21, 'type': 1, 'code': '5', 'message': '缺少单个险种保险单' }, { 'id': 22, 'type': 1, 'code': '6', 'message': '缺少保单页' }, { 'id': 30, 'type': 1, 'code': '15', 'message': '缺少保障计划列表(包含产品计划的每个险种的详细信息)页' }], 'result_code': '200', 'global_request_id': '165585c53ed9481e8d26cd116785cf4d', 'parent_request_id': null, 'current_request_id': 'd2ae44196cd54069a106be0e2e7cd1a6', 'result_message': '成功', 'Authentication-Info': null }
const getImageErrorMessage = { 'data': [{ 'id': 23, 'type': 2, 'code': '7', 'message': '您拍摄的此张保单影像过于模糊。' }, { 'id': 24, 'type': 2, 'code': '8', 'message': '您拍摄的此张保单影像不是大陆境内的保单，平台暂不支持。' }, { 'id': 25, 'type': 2, 'code': '9', 'message': '您拍摄的此张保单影像为团体/非人寿险保单，平台暂不支持识别解析。' }, { 'id': 26, 'type': 2, 'code': '10', 'message': '您拍摄的此张保单影像非保单页照片。' }, { 'id': 27, 'type': 2, 'code': '12', 'message': '您拍摄的此张保单影像非同一份保单的影像。' }, { 'id': 28, 'type': 2, 'code': '13', 'message': '您拍摄的此张保单影像为重复上传。' }, { 'id': 29, 'type': 2, 'code': '14', 'message': '您拍摄的此张保单影像为单张保单页拆分之后的影像，请拍摄完整后上传。' }], 'result_code': '200', 'global_request_id': '165585c53ed9481e8d26cd116785cf4d', 'parent_request_id': null, 'current_request_id': 'd2ae44196cd54069a106be0e2e7cd1a6', 'result_message': '成功', 'Authentication-Info': null }
const companyList = [{ message: '华夏保险', code: 1001 }, { message: '新华保险', code: 1002 }, { message: '平安人寿', code: 1003 }, { message: '中国人寿', code: 1004 }, { message: '太平洋', code: 1005 }, { message: '泰康人寿', code: 1006 }, { message: '太平人寿', code: 1007 }]
const failpageList = [{ code: '1', message: '缺少投保产品信息（含保额、保费、交费期限、保障期限等）' }, { code: '2', message: '缺少被保险人信息（身份证号、性别、生日等）' }, { code: '3', message: '缺少投保单页（投/被保人身份证/生日等）' }, { code: '4', message: '缺少保障计划一览表' }, { code: '5', message: '缺少单个险种保险单' }, { code: '6', message: '缺少保单页' }]

// import { getPolicyDetail, getCompanyList } from '@/request/api/policymanage.js'
import waves from '@/directive/waves/index.js' // 水波纹指令
// import viewer from '@/components/Viewer/index'

export default {
  name: 'Veryfyimgpage',
  components: {

  },
  directives: {
    waves
  },
  data() {
    const that = this
    return {
      activeIndex: 0, // 当前显示图片下标
      optionsViewer: {
        backdrop: true,
        button: false,
        title: true,
        zIndexInline: 100,
        inline: true,
        viewed(e) {
          // debugger
          that.activeIndex = e.detail.index
          that.imgConclusionResult = that.getImageFailTip(that.imgConclusionResultList[e.detail.index])// 当前图片提示
          that.isShowImageFailTip = false // 隐藏图片失败原因选择框 图片文案切换
          that.imageFailTip = ''
          // console.log()
          // console.log(e.type)
          // let img = document.querySelector('.viewer-container .viewer-canvas img');
          // // img.offsetWidth = document.querySelector('.viewer-container').offsetWidth;
          // let boxWidth = document.querySelector('.viewer-container').offsetWidth;
          // // img.offsetTop = 0;
          // console.log(img.offsetWidth,boxWidth,img.offsetWidth/boxWidth)
          // this.viewer.zoomTo(0.2)
          // this.viewer.zoomTo(0.2);
          // this.viewer.move(1, 0);
          // this.viewer.moveTo(1, 0);
        },
        // button: true,
        navbar: true,
        // title: true,
        className: 'viewer-container',
        container: '.viewer-container',
        /* toolbar: {
          zoomIn: 1
          // zoomOut: 4,
          // oneToOne: 4,
          // reset: 4,
          // prev: 4,
          // play: {
          //   show: 4,
          //   size: 'large',
          // },
          // next: 4,
          // rotateLeft: 4,
          // rotateRight: 4,
          // flipHorizontal: 4,
          // flipVertical: 4,
        }, */
        inheritedAttributes: [
          'crossOrigin', 'decoding', 'isMap', 'loading', 'referrerPolicy', 'srcset', 'useMap'
        ],
        initialViewIndex: 0, // 默认显示图片下标
        toolbar: true,
        focus: false,
        zoomRatio: 0.8
        // fullscreen: true,
        // keyboard: true,
        // url: 'data-source'
      },
      errorImg: 'https://upload.jianshu.io/users/upload_avatars/3840312/4e01f465-b498-41fb-bf00-b8a6277a73d1.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp',
      images: [
        'http://card-dev.yixiubx.com/wx499c266a9f93fbf8/zzw/policytransfer/images/1.jpg',
        'http://card-dev.yixiubx.com/wx499c266a9f93fbf8/zzw/policytransfer/images/2.jpg',
        'http://card-dev.yixiubx.com/wx499c266a9f93fbf8/zzw/policytransfer/images/test.jpg',
        'http://card-dev.yixiubx.com/wx499c266a9f93fbf8/zzw/policytransfer/images/test8m.png'
      ],
      imageFailTip: '',
      isShowImageFailTip: false, // 是否显示图片不通过提示
      imageFailTipList: [], // 图片失败提示配置列表
      imgConclusionResultList: [], // 图片是否通过审核 记录列表
      imgConclusionResult: '', // 当前图片是否通过
      batchNumber: '', // 批次号
      companyList: [], // 保险公司列表
      failpageList: [], // 缺页提示列表
      company: '', // 当前选择的公司
      policyNo: '', // 保险单号
      confirmPolicyNo: '', // 确认保险单号
      effectiveDate: '', // 生效日期
      isMissingPage: '1', // 是否缺页
      isShowmissingPagebox: false, // 是否显示缺页
      missingPageInfo: [], // 缺页原因
      policyName: '', // 投保人
      policyDetail: '', // 库存保单详情
      defaultCompanyName: '', // 用户选择的公司名称
      defaultCompanyCode: ''// 用户选择的公司code
    }
  },
  watch: {
    // 是否缺页
    isMissingPage(val) {
      if (val === '0') {
        this.isShowmissingPagebox = true
      } else {
        this.isShowmissingPagebox = false
      }
    }
    // // 图片不通过原因
    // imageFailTip(val){
    //   this.$set(this.imgConclusionResultList, this.activeIndex, val)
    // },

  },
  created() {
    this.imageFailTipList = getImageErrorMessage.data
    this.companyList = companyList// 保险公司列表
    this.failpageList = failpageList
    this.batchNumber = '000008NshjKtptrBi1608172483914'
    this.policyName = '李保国'
    this.policyDetail = '库存保单详情'
    this.defaultCompanyName = '华夏保险' // 用户选择的公司名称
    this.defaultCompanyCode = '1001' // 用户选择的公司code
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  destroy() {
    this.$viewer.destroy()
  },
  methods: {
    inited(viewer) {
      // debugger
      this.initImgConclusionResultList(this.images.length)
      this.$viewer = viewer
      this.$viewer.show()
    },
    initImgConclusionResultList(imgCount) {
      this.imgConclusionResultList = []
      for (let i = 0; i < imgCount; i++) {
        this.imgConclusionResultList.push('N')
      }
    },
    // 通过code 匹配错误语
    getImageFailTip(code) {
      // Y 通过 N 未校验 其他是对应的错误语
      if (code === 'Y') {
        return '通过'
      } else if (code === 'N') {
        return ''
      } else {
        var data = null
        try {
          this.imageFailTipList.forEach((item) => {
            if (item.code === code) {
              data = item
              throw Error()
            }
          })
        } catch (e) {
          throw Error(e)
        }
        return data.message
      }
    },
    show() {
      this.$viewer.show()
    },
    // 通过 图片审核
    setImagePass() {
      //  this.$viewer.view(this.activeIndex);
      // console.log(this.activeIndex)

      this.imgConclusionResult = this.getImageFailTip('Y')// 当前图片提示
      this.$set(this.imgConclusionResultList, this.activeIndex, 'Y')
      this.$viewer.next()
    },
    // 不通过 确定 图片审核
    setImageFail() {
      if (this.isShowImageFailTip) {
        if (!this.imageFailTip) {
          alert('请选择一个失败原因！')
          return
        }
        this.imgConclusionResult = this.getImageFailTip(this.imageFailTip)
        this.$set(this.imgConclusionResultList, this.activeIndex, this.imageFailTip)
        this.$viewer.next()
        if (this.activeIndex === this.images.length - 1) {
          this.isShowImageFailTip = false // 隐藏图片失败原因选择框
          this.imageFailTip = ''
        }
      } else {
        this.isShowImageFailTip = true
      }

      // var val = $('#errorMessageSelect  option:selected').val()
      // if (val == '') {
      //   alert('请选择一个失败原因！')
      //   return
      // }

      // var imgClass = 'imgConclusion' + imageIdx
      // $('.' + imgClass).attr('imgconclusion', val)
      // $('.' + imgClass).attr('checkcode', 'N')
      // $('.imgConclusionResult').html(val)
      // viewer.next()
    },
    // 成功
    toPass() {
      if (this.isMissingPage === '0') {
        alert('您标记了该单缺页,缺页保单不能审核通过！请重新审核确认!')
        return
      }
      var businessNo = this.batchNumber.replaceAll(' ', '')
      if (businessNo === '') {
        alert('未获取到批次号！')
        return
      }
      this.company = this.company + ''
      var insCompanyCode = this.company.replaceAll(' ', '')
      if (insCompanyCode === '') {
        alert('请选择公司！')
        return
      }

      var policyNo = this.policyNo.replaceAll(' ', '')
      var confirmPolicyNo = this.confirmPolicyNo.replaceAll(' ', '')
      if (policyNo !== confirmPolicyNo) {
        alert('您两次输入的保单号不一致，请重新确认输入！')
        return
      }
      // 保单号校验，保单号长度不得大于50
      console.log('policyNo= ' + policyNo)
      if (policyNo === '' || policyNo.length > 50) {
        alert("您输入的保单号'policyNo=" + policyNo + "' 为空或长度超过50，输入不合法，请重新输入！")
        return
      }

      var effectiveDate = this.effectiveDate.replaceAll(' ', '')
      if (effectiveDate === '') {
        alert('请填写保生效日期！')
        return
      }
      var getImageList2 = this.getImageCheckRequestList()
      if (!getImageList2) {
        alert('您有图片还未审核标记！请确认审核!')
        return
      }

      if (getImageList2 === 'somePass') {
        alert('该单所有图片审核不通过,不能审核成功！请确认审核提交结论!')
        return
      }

      // const param = {
      //   businessNo: businessNo,
      //   policyNo: policyNo,
      //   insCompanyCode: insCompanyCode,
      //   effectiveDate: effectiveDate,
      //   imageCheckRequestList: getImageList2
      // }

      // var paramStr = JSON.stringify(param)

      // $.ajax({
      //   url: 'huapolicy/being/info',
      //   type: 'post',
      //   data: paramStr,
      //   contentType: 'application/json', // 缺失会出现URL编码，无法转成json对象
      //   success: function(result) {
      //     if (result.result_code === '200') {
      //       var policyStatus = result.data.policyStatus
      //       if (policyStatus === 'true') {
      //         $('#policyDetail').html('<strong style="color:red">通过！并提交成功！</strong>')
      //       } else if (policyStatus === 'false') {
      //         $('#policyDetail').html('<strong style="color:red">通过！进入公共池！</strong>')
      //       } else {
      //         $('#policyDetail').html('<strong style="color:red">通过！状态未知！</strong>')
      //       }
      //       $('#policyDetail').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500)
      //       intv = setTimeout(doReview, 1 * 1000)
      //     } else {
      //       alert('设为质检通过的操作失败了！原因：' + result.result_message)
      //     }
      //   }
      // })
    },
    // getImageCheckRequestList() {
    //   var liImg = $('.imageCheck')
    //   var imageCheckList = []
    //   var flag = 0
    //   for (var i = 0; i < liImg.length; i++) {
    //     var checkCode = $(liImg[i]).attr('checkcode')
    //     if (checkCode == 'unchecked') {
    //       flag++
    //     }
    //     var imageId = $(liImg[i]).attr('id')
    //     var checkResult = $(liImg[i]).attr('imgconclusion')
    //     var ossUrl = ''
    //     var imageName = $(liImg[i]).attr('name')

    //     var ocrImageCheckDto = {}
    //     ocrImageCheckDto.imageId = imageId
    //     ocrImageCheckDto.checkCode = checkCode
    //     ocrImageCheckDto.checkResult = checkResult
    //     ocrImageCheckDto.ossUrl = ossUrl
    //     ocrImageCheckDto.imageName = imageName
    //     imageCheckList.push(ocrImageCheckDto)
    //   }
    //   if (flag == 0) {
    //     return imageCheckList
    //   } else {
    //     return 'null'
    //   }
    // },
    // 失败
    toFail() {

    },
    // 退出
    toQuit() {

    },
    addNew() {
      // this.$viewer.destroy();
      this.images = [
        'http://card-dev.yixiubx.com/wx499c266a9f93fbf8/zzw/policytransfer/images/test.jpg',
        'http://card-dev.yixiubx.com/wx499c266a9f93fbf8/zzw/policytransfer/images/test8m.png'
      ]
      // debugger
      this.initImgConclusionResultList(this.images.length)
      this.$viewer.update()
      this.policyDetail = ''// 库存保单详情清空
    },
    // 判断图片是否都审核过了 通过了是Y 不通过了是不通过原因 未审核的是N
    // 全审核过了 返回true
    getImageCheckRequestList() {
      if (this.imgConclusionResultList.indexOf('N') === -1) {
        const imgConclusionResult = this.imgConclusionResultList.filter((item, index) => {
          return item === 'Y'
        })
        debugger
        if (imgConclusionResult.length !== this.imgConclusionResultList.length) {
          // 有未审核通过 图片
          return 'somePass'
        } else {
          // 全审核通过 图片
          return 'allPass'
        }
      }
      return false
    },
    // 自动匹配
    getStandardDate() {
      var date = this.effectiveDate
      if (date.length === 8 && date.indexOf('-') === -1 && date.indexOf('/') === -1) {
        var tDate = this.transDate(date)
        if (this.dateCheck(tDate)) {
          this.effectiveDate = tDate
        }
      }
    },
    transDate(dateString) {
      const pattern = /(\d{4})(\d{2})(\d{2})/
      const formatedDate = dateString.replace(pattern, '$1-$2-$3')
      return formatedDate
    },
    dateCheck(RQ) {
      var date = RQ
      // (-|\/)分隔符
      var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (result === null) return false
      var d = new Date(result[1], result[3] - 1, result[4])
      return (d.getFullYear() === result[1] && (d.getMonth() + 1) === result[3] && d.getDate() === result[4])
    },
    // 公司编码列表查询接口
    getCompanyList() {
      if (this.companyList.length > 0) return
      // getCompanyList({}).then(response => {
      //   this.companyList = [ ...response.codeList]
      //   resolve(true)
      // }).catch(err => {
      //   console.log(err)
      //   reject(false)
      // })
    },
    // 首次输入保单号获取焦点
    handlerPolicyNo() {
      this.replaceConfirmPolicyNo()// 确认保单号改为 ***
    },
    // 首次输入保单号失去焦点 获取保单详情
    getPolicyDetail() {
      // 再次输入失去焦点
      if (this.confirmPolicyNoBak) {
        this.confirmPolicyNo = this.confirmPolicyNoBak.join('')
      }
      // getPolicyDetail({}).then(response => {
      //   this.effectiveDate = '123456789' // 生效日期
      //   this.policyName = 'lilili'//投保人
      //   resolve(true)
      // }).catch(err => {
      //   console.log(err)
      //   reject(false)
      // })
    },
    // 再次输入保险单号获取焦点 首次单号替换成***
    handlerConfirmPolicyNo() {
      this.policyNoBak = this.policyNo.split('')
      let asterisk = ''
      for (let i = 0; i < [...this.policyNoBak].length; i++) {
        asterisk = asterisk + '*'
      }
      this.policyNo = asterisk
      // this.policyNo = this.policyNoBak.join('')
    },
    // 再次输入保险单号 首次单号替换成***
    replaceConfirmPolicyNo() {
      this.confirmPolicyNoBak = this.confirmPolicyNo.split('')
      let asterisk = ''
      for (let i = 0; i < [...this.confirmPolicyNoBak].length; i++) {
        asterisk = asterisk + '*'
      }
      console.log(asterisk)
      this.confirmPolicyNo = asterisk
      // this.policyNo = this.policyNoBak.join('')
    },
    // 再次输入失去焦点
    checkConfirmPolicyNo() {
      if (this.policyNoBak) {
        this.policyNo = this.policyNoBak.join('')
      }
    },
    doNot() {
      return false
    }
  }

}
</script>

<style >
  img{
    width:100%;
  }
.el-main{
  padding: 0;
}
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
/* .viewer-toolbar  > ul >  li:nth-last-child(1){
      height: 50px;
      -webkit-transition: background-color 0.15s;
      transition: background-color 0.15s;
      width: 50px;
      margin-bottom: -13px;
      margin-top: -13px;
      text-align: center;
}
.viewer-toolbar > ul {
   display: inline-block;
    margin: 0px auto 5px;
    overflow: hidden;
    padding: 15px 3px;
} */
.viewer-container{
  height: calc(100vh - 84px);
}
.veryfyimgpage_viewer{
  display: none;
}
.viewer_box{
  z-index: 200;
  line-height: 30px;
  padding: 5px;
  position: absolute;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  display: block;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #cccccc;
  font-size: 20px;
}
.viewer_header{
  font-size: 16px;
  font-weight: bold;
}
.viewer_footer{
  bottom: -4px;
  background: none;
  text-align: right;
  right: 10px;
  width: auto;
}
.veryfyimgpage_imageFailTipSelect{
  margin-bottom: 10px;
}
.el_main_left{
  float: left;
  width: 70%;
  height: 100%;
  box-sizing: border-box;
}
.el_main_right{
  font-size: 14px;
  height: 1.2em;
  line-height: 1.2em;
  float: left;
  width: 30%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 0;
}
.el_main_right_content{
  height: 100%;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
}
.veryfyimgpage_pcTitle{
  font-size: 18px;
  margin-right: 5px;
}
.veryfyimgpage_pcDetail{
  font-size: 12px;
}
/* .veryfyimgpage_linerBg{
  background-image: linear-gradient(145deg,#ddd, #fff);
} */
/* .veryfyimgpage_linerBg>div {
    margin-left: 10px;
    background-color: #eee;
    line-height: 1.8em;
    background-image: linear-gradient(#eee, #ccc, #fff);
} */
.veryfyimgpage_companyInfoBox.el-row{
  display: block;
}
.veryfyimgpage_companyInfoBox>div, .veryfyimgpage_right_default>div{
  margin-left: 10px;
  line-height: 1.8em;
}
.veryfyimgpage_right_defaultTitle{
  font-size: 16px;
  color: #555;
  font-weight: bold;
}
.el-checkbox__label{
  white-space: normal;
}
.el-checkbox {
  display: flex;
  padding: 3px;
}
.veryfyimgpage_right_btn{
  position: absolute;
  bottom:10px;
  z-index: 2;
}
.veryfyimgpage_right_btn .el-button{
  margin: 0 15px;
}
.el-row{
  display: flex;
  align-items: center;
  padding: 9px 0;
}
.el-checkbox{
  margin-right: 0px;
}
</style>
