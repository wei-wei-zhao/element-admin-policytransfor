<template>
  <div class="app-container">
    <!-- <el-tab-pane label="use clipboard by v-directive" name="v-directive"> -->
    <!-- ★ ossPath <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
     ossUrl <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
     <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
       copy
     </el-button> -->

    <el-row :gutter="10" class="rowbox">
      <el-col :span="2" :offset="2">
        <el-tag class="tag-item el-tag el-tag--medium el-tag--light" icon="el-icon-document">
          ossPath
        </el-tag>

      </el-col>
      <el-col :span="13"><el-input v-model="ossPath" clearable placeholder="Please input" style="max-width:100%;" /></el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-document" @click.native="getOssUrl()">
          生成
        </el-button>
      </el-col>
      <!-- <el-col :span="3">
          <el-button @click.native="delUrl()" type="primary" icon="el-icon-document">
            清空
          </el-button>
        </el-col> -->

    </el-row>
    <el-row :gutter="10" class="rowbox">
      <el-col :span="2" :offset="2">
        <el-tag class="tag-item el-tag el-tag--medium el-tag--light" icon="el-icon-document">
          ossUrl
        </el-tag>
      </el-col>

      <el-col :span="13"><el-input v-model="ossUrl" placeholder="Please input" clearable style="max-width:100%;" /></el-col>
      <el-col :span="3">
        <el-button v-clipboard:copy="ossUrl" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-col>
    </el-row>

    <!--   </el-tab-pane> -->

    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<style scoped >
 .rowbox {
     margin: 15px;
 }
 .el-tag--medium{
   height: 36px;
   line-height: 36px;
 }
</style>
<script>
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  name: 'ClipboardDemo',
  directives: {
    clipboard
  },
  data() {
    return {
      activeName: 'directly',
      ossPath: '', // oss 路径
      ossUrl: ''// 转换后的 图片路径
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    },
    getOssUrl() {
      alert('生成路由')
    },
    delUrl() {
      this.ssPath = ''// oss 路径
      this.ossUrl = ''// 转换后的 图片路径
    }

  }
}
</script>
