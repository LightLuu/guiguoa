<template>
  <div id="app">
    <el-button type="primary" icon="el-icon-check" @click="clear()" size="small">清除token</el-button>
    <router-view />

    <el-dialog title="绑定手机" :visible.sync="dialogVisible" width="80%" >
      <el-form ref="dataForm" :model="bindPhoneVo" size="small">
        <h4>绑定你的手机号，建立工程认证系统关联关系</h4>
        <el-form-item label="手机号码">
          <el-input v-model="bindPhoneVo.phone"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-check" @click="saveBind()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import userInfoApi from '@/api/userInfo'
import { flags } from '@/utils/request.js'

export default {
  data() {
    return {
      show: true,
      dialogVisible: false,
      bindPhoneVo: {
        openId: '',
        phone: ''
      },
      token:'',
    };
  },

  created() {
    // 处理微信授权登录（网页测试的时候暂时注释掉）
    this.wechatLogin();
  },

  methods: {
    clear(){
      alert("方便换token")
      //alert(this.bindPhoneVo.openId)
      window.localStorage.setItem('token','')
      this.bindPhoneVo = {}
      let openId = this.getQueryString('openId') || '';
      //alert(openId)
      let token = '';
      //alert(token)
      // 绑定账号
      this.bindPhoneVo.openId = openId
      this.dialogVisible = true
    },
    // wechatLogin() {
    //   // 处理微信授权登录
    //   let token = this.getQueryString('token') || '';
    //   if(token=="null"){token = '';alert(3)}  
    //   alert(token)
    //   alert(54)
    //   let openId = this.getQueryString('openId') || '';
    //   alert(openId)
    //   // token === '' && openId != '' 只要这种情况，未绑定账号
    //   if(token === '' && openId != '') {
    //     // 绑定账号
    //     alert(token)
    //     this.bindPhoneVo.openId = openId
    //     this.dialogVisible = true
    //   } else {
    //     // 如果绑定了，授权登录直接返回token
    //     if(token !== '') {
    //       alert(0)
    //       window.localStorage.setItem('token', token);
    //     }
    //     token = window.localStorage.getItem('token') || '';
    //     if (token == '') {
    //       alert(1)
    //       let url = window.location.href.replace('#', 'guiguoa')
    //       window.location = 'http://afraid.5gzvip.91tunnel.com/admin/wechat/authorize?returnUrl=' + url
    //     }
    //   }
    // },
    wechatLogin() {
      // 处理微信授权登录
      let token = this.getQueryString('token') || '';
      debugger
      let openId = this.getQueryString('openId') || '';
      // token === '' && openId != '' 只要这种情况，未绑定账号
      if(token === '' || token == "null") {
       // alert(1)
        if(openId != ''){
          // 绑定账号
          alert(openId)
          this.bindPhoneVo.openId = openId
          this.dialogVisible = true
          flags.index = false
        }
      } else {
        // 如果绑定了，授权登录直接返回token
        //alert(2)
        if(token !== '' && token !== "null") {
          window.localStorage.setItem('token', token);
        }
        debugger
        token = window.localStorage.getItem('token') || '';
        if (token == '' || token =="null") {
          let url = window.location.href.replace('#', 'guiguoa')
          window.location = 'http://afraid.5gzvip.91tunnel.com/admin/wechat/authorize?returnUrl=' + url
        }
      }
    },
    saveBind() {
      if(this.bindPhoneVo.phone.length != 11) {
        alert('手机号码格式不正确')
        return
      }
      userInfoApi.bindPhone(this.bindPhoneVo).then(response => {
        window.localStorage.setItem('token', response.data);
        this.dialogVisible = false
        window.location = 'http://afraid2.5gzvip.91tunnel.com'
      })
    },

    getQueryString (paramName) {
      if(window.location.href.indexOf('?') == -1) return '';
      //alert(1)
      let searchString = window.location.href.split('?')[1];
      let i, val, params = searchString.split("&");
      for (i=0;i<params.length;i++) {
        //alert(val[0])
        val = params[i].split("=");
        if (val[0] == paramName) {
          return val[1];
        }
      }
      return '';
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
