<template>
  <div class="app-container inputdatapage">
    <!-- <el-alert :closable="false" title="保单信息录入" /> -->
    <el-container>
      <!-- <el-header class="header" /> -->
      <el-main class="viewer-container">
        <div class="el_main_left">
          <!-- <div class="viewer_box viewer_header">
            <div>当前图片结论：{{ imgConclusionResult }}</div>
          </div> -->
          <viewer
            ref="viewer"
            class="inputdatapage_viewer clearfix"
            rebuild
            :images="images"
            :options="optionsViewer"
            @inited="inited"
          >
            <template slot-scope="scope">
              <img v-for="src in scope.images" :key="src" :src="src">
            </template>
          </viewer>

          <!-- <div class="viewer_box viewer_footer">
            <el-row v-show="isShowImageFailTip" class="inputdatapage_imageFailTipSelect">
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
          </div> -->
        </div>
        <div class="el_main_right box_padding_10">
          <div class="el_main_right_content box_shadow box_padding_10">
            <el-row>
              <el-col :span="24">
                <span class="inputdatapage_pcTitle">批次号：</span>
                <span class="inputdatapage_pcDetail">{{ batchNumber }}</span>
              </el-col>
            </el-row>

            <el-row class="silver_bottomBorder">
              <el-col :span="7" class="inputdatapage_pcTitle">解析状态：</el-col>
              <el-col :span="15">
                <el-radio v-model="isSuccess" label="1" type="warning" class="text-warning">成功</el-radio>
                <el-radio v-model="isSuccess" label="0" type="primary">失败</el-radio>
              </el-col>
            </el-row>
            <!-- <keep-alive> -->
            <!-- 失败 -->
            <div v-if="isSuccess === '0'">
              <el-row>
                <el-select v-model="faildMessage" style="margin-left:30px;width:70%;" clearable placeholder="请选择失败原因">
                  <el-option
                    v-for="item in failedInfo"
                    :key="item.code"
                    :label="item.message"
                    :value="item.code"
                  />
                </el-select>
              </el-row>
            </div>
            <!-- 成功 -->
            <!-- 成功start -->
            <div v-if="isSuccess === '1'">
              <!-- 基本信息start -->
              <div class="inputdata_msgBox silver_bottomBorder">
                <el-row>
                  <el-col :span="24" class="inputdata_msgTitle">基本信息：</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">★ 保险公司</el-col>
                  <!-- <el-col :span="3">{{ company }}</el-col> -->
                  <el-col :span="14">
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
                    @onpaste="doNot()"
                    @copy="doNot()"
                    @oncontextmenu="doNot()"
                    @blur="getPolicyDetail()"
                    @focus="handlerPolicyNo()"
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
                  <el-col :span="8">★ 交费频率</el-col>
                  <el-col :span="14">
                    <el-select v-model="payFrequencyCode" style="width: 100%;" clearable filterable placeholder="请选择">
                      <el-option
                        v-for="item in payFrequencyList"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <!-- 基本信息end -->

              <!-- 投保人start -->
              <div class="inputdata_msgBox silver_bottomBorder">
                <el-row>
                  <el-col :span="8" class="inputdata_msgTitle">投保人：</el-col>
                  <el-col :span="14">
                    <el-button v-waves type="primary" @click="setPolicyHolder()">同主被保人</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">★ 姓名</el-col>
                  <el-col :span="14">
                    <el-input
                      v-model="policyHolder.name"
                      placeholder="姓名"
                      maxlength="10"
                      clearable
                    />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">★ 证件号码</el-col>
                  <el-col :span="14">
                    <el-input
                      v-model="policyHolder.idcard"
                      maxlength="18"
                      placeholder="请输入证件号码"
                      clearable
                    />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">★ 证件类型</el-col>
                  <el-col :span="14">
                    <el-select v-model="policyHolder.applicantIdCode" style="width: 100%;" clearable filterable placeholder="请选择">
                      <el-option
                        v-for="item in applicantIdType"
                        :key="item.code"
                        :label="item.message"
                        :value="item.code"
                      />
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">★ 性别</el-col>
                  <el-col :span="14">
                    <el-radio v-model="policyHolder.gender" label="1">男</el-radio>
                    <el-radio v-model="policyHolder.gender" label="2">女</el-radio>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">★ 出生日期</el-col>
                  <el-col :span="14">
                    <el-input
                      v-model="policyHolder.birthday"
                      placeholder="例如：2020-01-01"
                      clearable
                    /></el-col>
                </el-row>
                <div class="inputdatapageTip">注意:当证件号与证件类型存在其中一项时，二者必填；二者同时不存在时，则非必录</div>
              </div>
              <!-- 投保人end -->

              <!-- 被保人start -->
              <div class="inputdata_msgBox silver_bottomBorder">
                <el-row class="inputdata_msgTitleBox">
                  <el-col :span="8" class="inputdata_msgTitle">被保险人：</el-col>
                  <el-col :span="14">
                    <el-tooltip class="item" effect="dark" content="添加被保人" placement="top-start">
                      <el-button type="primary" icon="el-icon-plus" circle @click="addInsured()" />
                    </el-tooltip>
                    <!-- <el-button v-waves type="primary"  @click="toPass()">添加被保人</el-button> -->
                  </el-col>
                </el-row>
                <!-- 被保人liststart -->
                <div v-for="(items, insuredIndex) in insuredList" :key="insuredIndex" class="silver_bottomBorder2">
                  <el-row>
                    <el-col :span="8" class="inputdata_subTitle">被保险人{{ insuredIndex + 1 }}：</el-col>
                    <el-col :span="14">
                      <el-button v-waves type="primary" @click="setInsured(insuredIndex)">同投保人</el-button>
                      <el-tooltip class="item" effect="dark" content="删除当前被保人" placement="top-start">
                        <el-button type="danger" icon="el-icon-delete" circle @click="delInsured(insuredIndex)" />
                      </el-tooltip>
                      <!-- <el-button v-waves type="danger"  @click="toPass()">删除当前被保人</el-button> -->
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">★ 姓名</el-col>
                    <el-col :span="14">
                      <el-input
                        v-model="items.name"
                        placeholder="姓名"
                        maxlength="10"
                        clearable
                      />
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">★ 证件号码</el-col>
                    <el-col :span="14">
                      <el-input
                        v-model="items.idcard"
                        maxlength="18"
                        placeholder="请输入证件号码"
                        clearable
                      /></el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">★ 证件类型</el-col>
                    <el-col :span="14">
                      <el-select v-model="items.applicantIdCode" style="width: 100%;" clearable filterable placeholder="请选择">
                        <el-option
                          v-for="item in applicantIdType"
                          :key="item.code"
                          :label="item.message"
                          :value="item.code"
                        />
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">★ 性别</el-col>
                    <el-col :span="14">
                      <el-radio v-model="items.gender" label="1">男</el-radio>
                      <el-radio v-model="items.gender" label="2">女</el-radio>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">★ 出生日期</el-col>
                    <el-col :span="14">
                      <el-input
                        v-model="items.birthday"
                        placeholder="例如：2020-01-01"
                        clearable
                      /></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">★ 年龄</el-col>
                    <el-col :span="14">
                      <el-input
                        v-model="items.age"
                        placeholder="年龄"
                        clearable
                      /></el-col>
                  </el-row>
                  <div class="inputdatapageTip">注意:当证件号与证件类型存在其中一项时，二者必填；二者同时不存在时，则非必录</div>
                  <!-- 险种start -->
                  <el-row class="inputdata_msgTitleBox">
                    <el-col :span="10" class="inputdata_msgTitle" style="font-size: 14px;">被保险人{{ insuredIndex+1 }}险种：</el-col>
                    <el-col :span="14">
                      <el-tooltip class="item" effect="dark" content="添加险种" placement="top-start">
                        <el-button type="primary" icon="el-icon-plus" circle @click="addInsurance(insuredIndex)" />
                      </el-tooltip>
                      <!-- <el-button v-waves type="primary"  @click="toPass()">添加被保人</el-button> -->
                    </el-col>
                  </el-row>
                  <!-- 险种list start -->
                  <div v-for="(item, index) in items.insuranceTypes" :key="index">
                    <el-row>
                      <el-col :span="10" class="inputdata_subTitle">被保险人{{ insuredIndex + 1 }}险种{{ index + 1 }}：</el-col>
                      <el-col :span="14">
                        <el-tooltip class="item" effect="dark" content="删除当前险种" placement="top-start">
                          <el-button type="danger" icon="el-icon-delete" circle @click="delInsurance(insuredIndex, index)" />
                        </el-tooltip>
                        <!-- <el-button v-waves type="danger"  @click="toPass()">删除当前被保人</el-button> -->
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 险种编码</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.riskCode"
                          placeholder="险种编码"
                          clearable
                        />
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 险种名称</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.riskName"
                          placeholder="险种名称"
                          clearable
                        /></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 选择条款</el-col>
                      <el-col :span="14">
                        <el-button v-waves type="primary" @click="dialogClauseVisible = true">选择条款</el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 保险费</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.pickRisk"
                          placeholder="保险费"
                          clearable
                        />
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 保额(元)</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.riskQuota"
                          placeholder="保额"
                          clearable
                        />
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 份数(份)</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.copiesNum"
                          placeholder="份数"
                          clearable
                        /></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 档次</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.grade"
                          placeholder="档次"
                          clearable
                        /></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 保险期</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.insurancePeriod"
                          placeholder="保险期"
                          clearable
                        /></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 保险期单位</el-col>
                      <el-col :span="14">
                        <el-select v-model="item.insurancePeriodUnit" clearable filterable placeholder="保险期单位">
                          <el-option
                            v-for="insuredPeriodUnitItem in insuredPeriodUnitList"
                            :key="insuredPeriodUnitItem.code"
                            :label="insuredPeriodUnitItem.message"
                            :value="insuredPeriodUnitItem.code"
                          />
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 保险期满日</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.insuranceExpiration"
                          placeholder="保险期满日"
                          clearable
                        /></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 交费期</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.paymentPeriod"
                          placeholder="交费期"
                          clearable
                        /></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 交费期单位</el-col>
                      <el-col :span="14">
                        <el-select v-model="item.paymentPeriodUnit" filterable clearable placeholder="交费期单位">
                          <el-option
                            v-for="payPeriodUnitItem in payPeriodUnitList"
                            :key="payPeriodUnitItem.code"
                            :label="payPeriodUnitItem.message"
                            :value="payPeriodUnitItem.code"
                          />
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 交费期满日</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.paymentExpiration"
                          placeholder="交费期满日"
                          clearable
                        /></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">★ 保险对象</el-col>
                      <el-col :span="14">
                        <el-input
                          v-model="item.insuredObject"
                          placeholder="保险对象"
                          clearable
                        /></el-col>
                    </el-row>
                    <div class="inputdatapageTip">注意:提交时优先按保险期满日和交费期满日计算，若二者为空，方按照上方的单位和值组合的方式计算!</div>
                    <div class="inputdatapageTip"> 保额、份数、档次，三者当前为三选一的关系，当三者同时存在其中的两项或三项时，则取其中一项录入</div>
                    <el-row :class="item.hasReceiveMsg === '0' ? 'silver_bottomBorder999' : ''">
                      <el-col :span="8">该险种是否有领取信息</el-col>
                      <el-col :span="14">
                        <el-radio v-model="item.hasReceiveMsg" label="1">是</el-radio>
                        <el-radio v-model="item.hasReceiveMsg" label="0">否</el-radio>
                      </el-col>
                    </el-row>
                    <!-- 领取信息 start-->
                    <transition name="el-zoom-in-top">
                      <div v-if="item.hasReceiveMsg === '1'" class="silver_bottomBorder999">
                        <el-row>
                          <el-col :span="8">领取日期</el-col>
                          <el-col :span="14">
                            <el-input
                              v-model="item.receiveData"
                              placeholder="领取日期"
                              clearable
                            />
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">领取年龄</el-col>
                          <el-col :span="14">
                            <el-input
                              v-model="item.receiveAge"
                              placeholder="领取年龄"
                              clearable
                            />
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">领取类型</el-col>
                          <el-col :span="14">
                            <el-select v-model="item.receiveType" clearable placeholder="领取类型">
                              <el-option
                                v-for="claimTypeItem in claimTypeList"
                                :key="claimTypeItem.code"
                                :label="claimTypeItem.message"
                                :value="claimTypeItem.code"
                              />
                            </el-select>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">领取比例</el-col>
                          <el-col :span="14">
                            <el-input
                              v-model="item.receiveRatio"
                              placeholder="领取比例"
                              clearable
                            />
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">领取年期</el-col>
                          <el-col :span="14">
                            <el-input
                              v-model="item.receiveClaim"
                              placeholder="领取年期"
                              clearable
                            />
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">领取年期方式</el-col>
                          <el-col :span="14">
                            <el-select v-model="item.receiveClaimMethod" clearable placeholder="领取年期方式">
                              <el-option
                                v-for="claimMethodItem in claimMethodList"
                                :key="claimMethodItem.code"
                                :label="claimMethodItem.message"
                                :value="claimMethodItem.code"
                              />
                            </el-select>
                          </el-col>
                        </el-row>
                      </div>
                    </transition>
                    <!-- 领取信息end -->
                  </div>
                  <el-row>
                    <el-col :span="24">
                      <el-button v-waves type="primary" @click="addInsurance(insuredIndex)">添加险种</el-button>
                    </el-col>
                  </el-row>
                  <!-- 险种end -->
                </div>
                <!-- 投保人listend -->

              </div>
              <!-- 被保人end -->

              <!-- 生存受益人start -->
              <el-row class="silver_bottomBorder">
                <el-col :span="8" class="inputdatapage_pcTitle">生存受益人</el-col>
                <el-col :span="14">
                  <el-radio v-model="survivingObj.hasBeneficiary" label="1">是</el-radio>
                  <el-radio v-model="survivingObj.hasBeneficiary" label="0">否</el-radio>
                </el-col>
              </el-row>
              <transition name="el-zoom-in-top">
                <div v-show="survivingObj.hasBeneficiary === '1'">
                  <el-row>
                    <el-col :span="8">法定受益人</el-col>
                    <el-col :span="14">
                      <el-radio v-model="survivingObj.hasLegalBeneficiary" label="1">是</el-radio>
                      <el-radio v-model="survivingObj.hasLegalBeneficiary" label="0">否</el-radio>
                    </el-col>
                  </el-row>
                  <el-divider content-position="right" />
                  <div v-show="survivingObj.hasLegalBeneficiary === '0'">
                    <div v-for="(item, index) in survivingObj.beneficiaryList" :key="index">
                      <el-row>
                        <el-col :span="8">生存受益人{{ index+1 }}</el-col>
                        <el-col :span="14">
                          <el-tooltip class="item" effect="dark" content="删除当前受益人" placement="top-start">
                            <el-button type="danger" icon="el-icon-delete" circle @click="delSurviving(index, 'survivingObj')" />
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-button v-waves type="primary" @click="setSurviving(index, 'policy', 'survivingObj')">同投保人</el-button>
                          <el-button v-waves type="primary" @click="setSurviving(index, 'Insured', 'survivingObj')">同主被保人</el-button>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 受益顺序</el-col>
                        <el-col :span="14">
                          <el-select v-model="item.benefitOrder" clearable filterable placeholder="请选择">
                            <el-option
                              v-for="orderItem in benefitOrderList"
                              :key="orderItem.code"
                              :label="orderItem.message"
                              :value="orderItem.code"
                            />
                          </el-select>
                        </el-col>
                      </el-row><el-row>
                        <el-col :span="8">★ 受益比例(%)</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.benefitratio"
                            placeholder="请输入受益比例(%)"
                            clearable
                          /></el-col>
                      </el-row><el-row>
                        <el-col :span="8">★ 姓名</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.name"
                            placeholder="请输入姓名"
                            clearable
                          /></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 性别</el-col>
                        <el-col :span="14">
                          <el-radio v-model="item.gender" label="1">男</el-radio>
                          <el-radio v-model="item.gender" label="2">女</el-radio>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 证件类型</el-col>
                        <el-col :span="14">
                          <el-select v-model="item.applicantIdCode" clearable filterable placeholder="请选择">
                            <el-option
                              v-for="applicantId in applicantIdType"
                              :key="applicantId.code"
                              :label="applicantId.message"
                              :value="applicantId.code"
                            />
                          </el-select>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 证件号码</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.idcard"
                            maxlength="18"
                            placeholder="生存受益人证件号码"
                            clearable
                          /></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 出生日期</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.birthday"
                            placeholder="例如：2020-01-01"
                            clearable
                          /></el-col>
                      </el-row>
                      <el-divider content-position="right" />
                    </div>
                    <el-row>
                      <el-col :span="24">
                        <el-button v-waves type="primary" @click="addSurviving('survivingObj')">添加生存受益人</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-divider content-position="right" />
                </div>

              </transition>
              <!-- 生存受益人end -->
              <!-- 身故受益人start -->
              <el-row class="silver_bottomBorder">
                <el-col :span="8" class="inputdatapage_pcTitle">身故受益人</el-col>
                <el-col :span="14">
                  <el-radio v-model="deceasedObj.hasBeneficiary" label="1">是</el-radio>
                  <el-radio v-model="deceasedObj.hasBeneficiary" label="0">否</el-radio>
                </el-col>
              </el-row>
              <transition name="el-zoom-in-top">
                <div v-show="deceasedObj.hasBeneficiary === '1'">
                  <el-row>
                    <el-col :span="8">法定受益人</el-col>
                    <el-col :span="14">
                      <el-radio v-model="deceasedObj.hasLegalBeneficiary" label="1">是</el-radio>
                      <el-radio v-model="deceasedObj.hasLegalBeneficiary" label="0">否</el-radio>
                    </el-col>
                  </el-row>
                  <el-divider content-position="right" />
                  <div v-show="deceasedObj.hasLegalBeneficiary === '0'">
                    <div v-for="(item, index) in deceasedObj.beneficiaryList" :key="index">
                      <el-row>
                        <el-col :span="8">身故受益人{{ index+1 }}</el-col>
                        <el-col :span="14">
                          <el-tooltip class="item" effect="dark" content="删除当前受益人" placement="top-start">
                            <el-button type="danger" icon="el-icon-delete" circle @click="delSurviving(index, 'deceasedObj')" />
                          </el-tooltip>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-button v-waves type="primary" @click="setSurviving(index, 'policy', 'deceasedObj')">同投保人</el-button>
                          <el-button v-waves type="primary" @click="setSurviving(index, 'Insured', 'deceasedObj')">同主被保人</el-button>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 受益顺序</el-col>
                        <el-col :span="14">
                          <el-select v-model="item.benefitOrder" clearable filterable placeholder="请选择">
                            <el-option
                              v-for="orderItem in benefitOrderList"
                              :key="orderItem.code"
                              :label="orderItem.message"
                              :value="orderItem.code"
                            />
                          </el-select>
                        </el-col>
                      </el-row><el-row>
                        <el-col :span="8">★ 受益比例(%)</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.benefitratio"
                            placeholder="请输入受益比例(%)"
                            clearable
                          /></el-col>
                      </el-row><el-row>
                        <el-col :span="8">★ 姓名</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.name"
                            placeholder="请输入姓名"
                            clearable
                          /></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 性别</el-col>
                        <el-col :span="14">
                          <el-radio v-model="item.gender" label="1">男</el-radio>
                          <el-radio v-model="item.gender" label="2">女</el-radio>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 证件类型</el-col>
                        <el-col :span="14">
                          <el-select v-model="item.applicantIdCode" clearable filterable placeholder="请选择">
                            <el-option
                              v-for="applicantId in applicantIdType"
                              :key="applicantId.code"
                              :label="applicantId.message"
                              :value="applicantId.code"
                            />
                          </el-select>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 证件号码</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.idcard"
                            maxlength="18"
                            placeholder="身故受益人证件号码"
                            clearable
                          /></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">★ 出生日期</el-col>
                        <el-col :span="14">
                          <el-input
                            v-model="item.birthday"
                            placeholder="例如：2020-01-01"
                            clearable
                          /></el-col>
                      </el-row>
                      <el-divider content-position="right" />
                    </div>
                    <el-row>
                      <el-col :span="24">
                        <el-button v-waves type="primary" @click="addSurviving('deceasedObj')">添加身故受益人</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-divider content-position="right" />
                </div>

              </transition>
              <!-- 身故受益人end -->

            </div>
            <!-- 成功end -->

            <!-- 弹窗start -->
            <el-dialog
              title="条款选择"
              :visible.sync="dialogClauseVisible"
              :destroy-on-close="true"
              class="inputdatapage_dialogClause"
              width="90vw"
              top="10vh"
            >
              <el-form :inline="true" :model="clauseSearchObj" class="demo-form-inline" label-width="130px">
                <el-row :gutter="10">
                  <el-col :span="9">
                    <el-form-item label="请输入险种名称：">
                      <el-input v-model="clauseSearchObj.riskName" style="width:250px" clearable placeholder="多个关键字按顺序使用逗号隔开" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="请选择保险公司：">
                      <el-select v-model="clauseSearchObj.company" clearable filterable placeholder="请选择保险公司">
                        <el-option
                          v-for="orderItem in companyList"
                          :key="orderItem.code"
                          :label="orderItem.message"
                          :value="orderItem.code"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
                  <el-col :span="6">
                    <el-form-item>
                      <el-button type="primary" @click="getList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                      生效日期：{{ clauseSearchObj.date }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div>
                <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column align="center" label="序号" width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row.id }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="险种编码">
                    <template slot-scope="scope">
                      <span>{{ scope.row.timestamp }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="险种名称">
                    <template slot-scope="scope">
                      <span>{{ scope.row.author }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="险种打印名称">
                    <template slot-scope="scope">
                      <span>{{ scope.row.author1 }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class-name="status-col" label="险种保监会编号">
                    <template slot-scope="scope">
                      <span>{{ scope.row.status }}</span>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column min-width="300px" label="下载条款">
                    <template slot-scope="{row}">
                      <router-link :to="'/example/edit/'+row.id" class="link-type">
                        <span>{{ row.title }}</span>
                      </router-link>
                    </template>
                  </el-table-column> -->

                  <el-table-column align="center" label="下载条款" width="135">
                    <template>
                      <!-- <router-link :to="'/example/edit/'+scope.row.id"> -->
                      <el-button type="primary" size="small" icon="el-icon-download">
                        点击下载
                      </el-button>
                      <!-- </router-link> -->
                    </template>
                  </el-table-column>
                </el-table>
                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
                <el-row>
                  <el-col :span="24" class="inputdatapage_dialogNoData">
                    <el-button type="danger">若未查询到险种，填写险种名后点击此处</el-button>
                    <span class="inputdatapage_dialogNoDataTip">注意：点击此按钮仅将险种名赋值给上个页面</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :offset="19" :span="5" class="inputdatapage_dialogNoData">
                    <el-button type="warning">关闭</el-button>
                    <el-button type="primary">确定</el-button>
                  </el-col>
                </el-row>
                <!-- <div class="inputdatapage_dialogNoData">

                </div>
                <div class="inputdatapage_dialogNoData">
                  <el-button  type="danger">若未查询到险种，填写险种名后点击此处</el-button>
                  <span class="inputdatapage_dialogNoDataTip">注意：点击此按钮仅将险种名赋值给上个页面</span>
                </div> -->
              </div>
            </el-dialog>
            <!-- 弹窗end -->
            <div class="inputdatapage_right_btn">
              <el-button v-waves type="primary" @click="toQuit()">提交</el-button>
              <el-button v-waves type="warning" @click="toQuit()">退出</el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

// const getMissPageErrorMessage = { 'data': [{ 'id': 17, 'type': 1, 'code': '1', 'message': '缺少投保产品信息（含保额、保费、交费期限、保障期限等）' }, { 'id': 18, 'type': 1, 'code': '2', 'message': '缺少被保险人信息（身份证号、性别、生日等）' }, { 'id': 19, 'type': 1, 'code': '3', 'message': '缺少投保单页（投/被保人身份证/生日等）' }, { 'id': 20, 'type': 1, 'code': '4', 'message': '缺少保障计划一览表' }, { 'id': 21, 'type': 1, 'code': '5', 'message': '缺少单个险种保险单' }, { 'id': 22, 'type': 1, 'code': '6', 'message': '缺少保单页' }, { 'id': 30, 'type': 1, 'code': '15', 'message': '缺少保障计划列表(包含产品计划的每个险种的详细信息)页' }], 'result_code': '200', 'global_request_id': '165585c53ed9481e8d26cd116785cf4d', 'parent_request_id': null, 'current_request_id': 'd2ae44196cd54069a106be0e2e7cd1a6', 'result_message': '成功', 'Authentication-Info': null }
const getImageErrorMessage = { 'data': [{ 'id': 23, 'type': 2, 'code': '7', 'message': '您拍摄的此张保单影像过于模糊。' }, { 'id': 24, 'type': 2, 'code': '8', 'message': '您拍摄的此张保单影像不是大陆境内的保单，平台暂不支持。' }, { 'id': 25, 'type': 2, 'code': '9', 'message': '您拍摄的此张保单影像为团体/非人寿险保单，平台暂不支持识别解析。' }, { 'id': 26, 'type': 2, 'code': '10', 'message': '您拍摄的此张保单影像非保单页照片。' }, { 'id': 27, 'type': 2, 'code': '12', 'message': '您拍摄的此张保单影像非同一份保单的影像。' }, { 'id': 28, 'type': 2, 'code': '13', 'message': '您拍摄的此张保单影像为重复上传。' }, { 'id': 29, 'type': 2, 'code': '14', 'message': '您拍摄的此张保单影像为单张保单页拆分之后的影像，请拍摄完整后上传。' }], 'result_code': '200', 'global_request_id': '165585c53ed9481e8d26cd116785cf4d', 'parent_request_id': null, 'current_request_id': 'd2ae44196cd54069a106be0e2e7cd1a6', 'result_message': '成功', 'Authentication-Info': null }
const companyList = [{ message: '华夏保险', code: 1001 }, { message: '新华保险', code: 1002 }, { message: '平安人寿', code: 1003 }, { message: '中国人寿', code: 1004 }, { message: '太平洋', code: 1005 }, { message: '泰康人寿', code: 1006 }, { message: '太平人寿', code: 1007 }]
const failpageList = [{ code: '1', message: '缺少投保产品信息（含保额、保费、交费期限、保障期限等）' }, { code: '2', message: '缺少被保险人信息（身份证号、性别、生日等）' }, { code: '3', message: '缺少投保单页（投/被保人身份证/生日等）' }, { code: '4', message: '缺少保障计划一览表' }, { code: '5', message: '缺少单个险种保险单' }, { code: '6', message: '缺少保单页' }]
const payFrequencyList = [{ code: '0', message: '趸交' }, { code: '1', message: '月交' }, { code: '3', message: '季交' }, { code: '6', message: '半年交' }, { code: '12', message: '年交' }, { code: '36', message: '三年交' }]
const applicantIdType = [{ code: '01', message: '居民身份证' }, { code: '02', message: '居民户口簿' }, { code: '03', message: '驾驶证' }, { code: '04', message: '军官证' }, { code: '05', message: '士兵证' }, { code: '07', message: '护照' }, { code: '09', message: '港澳通行证' }, { code: '10', message: '台湾通行证' }, { code: '12', message: '台胞证' }, { code: '13', message: '出生证' }, { code: '99', message: '其他证件' }, { code: 'A0', message: '家庭编码' }]

const insuredPeriodUnitList = [{ code: '1', message: '年满期' }, { code: '2', message: '岁满期' }, { code: '3', message: '日满期' }, { code: '4', message: '周满期' }, { code: '5', message: '月满期' }, { code: '6', message: '保障终身' }]// 保险期单位
const payPeriodUnitList = [{ code: '1', message: '一次交清' }, { code: '2', message: '年交' }, { code: '3', message: '岁交' }, { code: '4', message: '终身交' }, { code: '-1', message: '不限' }]// 交费期单位
const claimTypeList = [{ code: 'M', message: '月领' }, { code: 'Y', message: '年领' }, { code: 'P', message: '一次性领取' }, { code: 'H', message: '半年领' }, { code: 'Q', message: '季领' }, { code: 'W1', message: '方式一' }, { code: 'W2', message: '方式二' }, { code: 'W3', message: '方式三' }, { code: 'W4', message: '方式四' }, { code: 'W5', message: '方式五' }, { code: 'A1', message: '保证年份领取' }, { code: 'A2', message: '保证保费领取' }]// 领取类型
const claimMethodList = [{ code: '0', message: '趸领' }, { code: '1', message: '年领（领多少年）' }, { code: '2', message: '岁领（领至**岁）' }] // 领取年期方式

const benefitOrderList = [{ code: '1', message: '第一顺序' }, { code: '2', message: '第二顺序' }, { code: '3', message: '第三顺序' }] // 受益顺序

const riskObj = { // 保险对象
  riskCode: '', // 保险编码
  riskName: '', // 险种名称
  pickRisk: '', // 保险费
  riskQuota: '', // 保额
  copiesNum: '', // 份数
  grade: '', // 档次
  insurancePeriod: '', // 保险期
  insurancePeriodUnit: '', // 保险期单位
  insuranceExpiration: '', // 保险期满日
  paymentPeriod: '', // 交费期
  paymentPeriodUnit: '', // 交费期单位
  paymentExpiration: '', // 交费期满日
  insuredObject: '', // 保险对象
  hasReceiveMsg: '', // 领取信息
  receiveData: '', // 领取日期
  receiveAge: '', // 领取年龄
  receiveType: '', // 领取类型
  receiveRatio: '', // 领取比例
  receiveClaim: '', // 领取年期
  receiveClaimMethod: ''// 领取年期方式

}

// import { getPolicyDetail, getCompanyList } from '@/request/api/policymanage.js'
import waves from '@/directive/waves/index.js' // 水波纹指令
// import viewer from '@/components/Viewer/index'
import { deepClone } from '@/utils/index.js'

export default {
  name: 'Inputdatapage',
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  directives: {
    waves
  },
  data() {
    const that = this
    return {
      tabMapOptions: [
        { label: '成功', key: 'success' },
        { label: '失败', key: 'faild' }
      ],
      activeName: 'success',

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
      isSuccess: '1', // 成功与失败
      isSuccessPagebox: false, // 是否显示缺页
      failedInfo: [], // 缺页原因
      faildMessage: '',
      policyDetail: '', // 库存保单详情
      defaultCompanyName: '', // 用户选择的公司名称
      defaultCompanyCode: '', // 用户选择的公司code
      dialogClauseVisible: false, // 条款查询弹窗
      policyHolder: { // 投保人
        name: '', // 姓名
        idcard: '', // 身份证号
        gender: '1', // 性别
        birthday: '', // 出生日期
        applicantIdCode: '6'// 当前选择证件类型
      },
      payFrequencyList: [], // 支付频率列表
      payFrequencyCode: '', // 当前选择支付频率 code
      applicantIdType: [], // 证件类型
      applicantIdCode: '', // 当前选择证件类型

      clauseSearchObj: { // 条款选择搜索条件
        company: '',
        riskName: '',
        date: ''
      },

      insuredPeriodUnit: [], // 保险期单位
      insuredPeriod: '',
      payPeriodUnitList: [], // 交费期单位
      payPeriodUnit: '',
      hasReceiveMsg: '0', // 是否有领取信息
      claimTypeList: [], // 领取类型
      claimType: '', // 领取类型
      claimMethodList: [], // 领取年期方式
      claimMethod: '', // 领取年期方式
      insuredList: [{ // 被保人列表
        name: '', // 姓名
        idcard: '', // 身份证号
        applicantIdCode: '', // 当前选择证件类型
        gender: '1', // 性别a:1
        birthday: '', // 出生日期
        age: '', // 年龄
        insuranceTypes: []// 保险种类
      }],

      benefitOrderList: [], // 受益顺序list

      survivingObj: { // 生存受益人
        hasBeneficiary: '0', // 是否有受益人
        hasLegalBeneficiary: '1', // 法定受益人
        beneficiaryList: [{ // 受益人列表
          benefitOrder: '', // 受益顺序
          benefitratio: '', // 受益比例
          name: '', // 姓名
          idcard: '', // 身份证号
          gender: '1', // 性别
          birthday: '', // 出生日期
          applicantIdCode: ''// 当前选择证件类型
        }]
      },
      deceasedObj: { // 身故受益人
        hasBeneficiary: '0', // 是否有受益人
        hasLegalBeneficiary: '1', // 法定受益人
        beneficiaryList: [{ // 受益人列表
          benefitOrder: '', // 受益顺序
          benefitratio: '', // 受益比例
          name: '', // 姓名
          idcard: '', // 身份证号
          gender: '1', // 性别
          birthday: '', // 出生日期
          applicantIdCode: ''// 当前选择证件类型
        }]
      },
      // -----弹窗测试数据-----
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
      // -----弹窗测试数据------
    }
  },
  watch: {
    // 是否缺页
    isSuccess(val) {
      if (val === '0') {
        this.isSuccessPagebox = true
      } else {
        this.isSuccessPagebox = false
      }
    },
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
    // // 图片不通过原因
    // imageFailTip(val){
    //   this.$set(this.imgConclusionResultList, this.activeIndex, val)
    // },

  },
  created() {
    this.imageFailTipList = getImageErrorMessage.data
    this.companyList = companyList// 保险公司列表
    this.failedInfo = failpageList// 解析失败原因列表
    this.faildMessage = ''// 错误原因
    this.isSuccess = '1'

    this.batchNumber = '000008NshjKtptrBi1608172483914'
    this.policyDetail = '库存保单详情'
    this.defaultCompanyName = '华夏保险' // 用户选择的公司名称
    this.defaultCompanyCode = '1001' // 用户选择的公司code

    this.payFrequencyList = payFrequencyList// 支付频率列表
    this.applicantIdType = applicantIdType// 证件类型
    this.claimTypeList = claimTypeList// 领取类型
    this.claimMethodList = claimMethodList// 领取年期方式

    this.insuredPeriodUnitList = insuredPeriodUnitList// 保险期单位
    this.payPeriodUnitList = payPeriodUnitList// 交费期单位

    this.benefitOrderList = benefitOrderList // 受益顺序

    this.clauseSearchObj = { // 条款选择搜索条件
      company: '',
      riskName: '',
      date: '2020-03-21'
    }

    this.policyHolder = { // 投保人
      name: '李大宝', // 投保人姓名
      idcard: '130426198712301911', // 投保人身份证号
      gender: '1', // 投保人性别
      birthday: '20160103', // 投保人出生日期
      applicantIdCode: '6'// 当前选择证件类型
    }
    // this.insuredList[0] = { //投保人
    //   name: '李大宝1', // 投保人姓名
    //   idcard: '130426198712301911', // 投保人身份证号
    //   gender: '2', // 投保人性别
    //   birthday: '20160103',// 投保人出生日期
    //   applicantIdCode:'6',//当前选择证件类型
    // }
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  destroy() {
    this.$viewer.destroy()
  },
  methods: {
    getList() {
      // listLoading
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        // scope.row.id
        // scope.row.timestamp
        // scope.row.author
        const obj = {
          // id:10,
          timestamp: 'R0001059',
          author: '华夏富贵竹年金保险',
          author1: '华夏富贵竹年金保险',
          status: '华夏人寿[2014]年金保险021号'
        }
        this.list = []
        for (let i = 0; i < this.listQuery.limit; i++) {
          obj.id = i
          this.list = [...this.list, obj]
          // this.list[i].id = i
        }
        this.total = response.data.total
        this.listLoading = false
      })
    },

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
      if (this.isSuccess === '0') {
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
      //     //   if (policyStatus === 'true') {
      //     //     $('#policyDetail').html('<strong style="color:red">通过！并提交成功！</strong>')
      //     //   } else if (policyStatus === 'false') {
      //     //     $('#policyDetail').html('<strong style="color:red">通过！进入公共池！</strong>')
      //     //   } else {
      //     //     $('#policyDetail').html('<strong style="color:red">通过！状态未知！</strong>')
      //     //   }
      //     //   $('#policyDetail').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500)
      //     //   // intv = setTimeout(doReview, 1 * 1000)
      //     // } else {
      //     //   alert('设为质检通过的操作失败了！原因：' + result.result_message)
      //     // }
      //   }
      // })
    },
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
    },
    // 同步投保人 为主投保人
    setPolicyHolder() {
      // console.log()
      // this.policyHolder = deepClone(this.)
    },
    // 添加被保人
    addInsured(data) {
      const insured = {
        name: '', // 姓名
        idcard: '', // 身份证号
        applicantIdCode: '', // 当前选择证件类型
        gender: '1', // 性别a:1
        birthday: '', // 出生日期
        age: '', // 年龄
        insuranceTypes: [riskObj]// 保险种类
      }
      this.insuredList.push(insured)
    },
    // 删除被保人
    delInsured(index) {
      this.insuredList.splice(index, 1)
    },
    // 同步被保人 为 投保人
    setInsured(index) {
      this.$set(this.insuredList, index, this.policyHolder)
    },
    // 添加险种
    addInsurance(parentIndex) {
      this.insuredList[parentIndex].insuranceTypes.push(riskObj)
    },
    // 删除险种
    delInsurance(parentIndex, index) {
      this.insuredList[parentIndex].insuranceTypes.splice(index, 1)
      // this.insuranceTypes.splice(index,1)
    },
    // 添加受益人
    addSurviving(type) {
      const obj = { // 受益人列表
        benefitOrder: '', // 受益顺序
        benefitratio: '', // 受益比例
        name: '', // 姓名
        idcard: '', // 身份证号
        gender: '1', // 性别
        birthday: '', // 出生日期
        applicantIdCode: ''// 当前选择证件类型
      }
      this[type].beneficiaryList.push(obj)
    },
    // 删除受益人
    delSurviving(index, type) {
      this[type].beneficiaryList.splice(index, 1)
    },
    // 同步 受益人 信息 userFlag 投保人||主被保人  type 生存受益人 survivingObj|| 身故受益人 deceasedObj
    setSurviving(index, userFlag, type) {
      let val = ''
      if (userFlag === 'policy') { // 同投保人
        val = this.policyHolder
      } else if (userFlag === 'Insured') { // 同主被保人
        val = this.insuredList[0]
      }
      this.$set(this[type].beneficiaryList, index, deepClone(val))
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
.inputdatapage_viewer{
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
.inputdatapage_imageFailTipSelect{
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
  padding-bottom: 60px;
  overflow-y: auto;
  overflow-x: hidden;
}
.inputdatapage_pcTitle{
  font-size: 14px;
  font-weight: bold;
  /* margin-right: 5px; */
}
.inputdatapage_pcDetail{
  font-size: 12px;
}
/* .inputdatapage_linerBg{
  background-image: linear-gradient(145deg,#ddd, #fff);
} */
/* .inputdatapage_linerBg>div {
    margin-left: 10px;
    background-color: #eee;
    line-height: 1.8em;
    background-image: linear-gradient(#eee, #ccc, #fff);
} */
.inputdatapage_companyInfoBox.el-row{
  display: block;
}
.inputdatapage_companyInfoBox>div, .inputdatapage_right_default>div{
  margin-left: 10px;
  line-height: 1.8em;
}
.inputdatapage_right_defaultTitle{
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
.inputdatapage_right_btn{
  position: absolute;
  bottom: 0px;
  z-index: 2;
  background: #fff;
  padding: 10px;
  margin-left: -10px;
  width:28%;
}
.inputdatapage_right_btn .el-button{
  /* margin: 0 15px; */
}
.el-row{
  display: flex;
  align-items: center;
  /* align-items: baseline; */
  padding: 9px 0;
}
.el-checkbox{
  margin-right: 0px;
}
.inputdata_msgBox{

}
.inputdata_msgTitleBox{
  border-bottom:1px solid #999 ;
}
.inputdata_msgTitle{
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
/*  position: sticky;
  top:50px;
  z-index: 100; */
}
.inputdatapageTip{
  color: red;
  font-size: 10px;
  text-indent: 2em;
}
.el-divider--horizontal{
  margin: 0;
}
.inputdatapage_dialogClause .el-dialog{
  /* width: 90%;
  margin-top: 2vh; */
}
.inputdatapage_dialogClause .el-dialog{
  /* width: 90%;
  margin-top: 2vh; */
}
.inputdatapage_dialogClause .el-dialog__header{
  padding: 15px 20px 8px;
  border-bottom: 1px solid silver;
}

.inputdatapage_dialogClause .el-dialog__body{
  padding: 0px 20px 10px;
}
.inputdatapage_dialogClause .pagination-container{
      margin-top: 0px;
      padding: 5px 16px;
}
.inputdatapage_dialogNoData{
  margin-top: 0px;
  padding: 5px 16px;
}
.inputdatapage_dialogNoDataTip{
  margin-left: 10px;
  color: red;
}
</style>
