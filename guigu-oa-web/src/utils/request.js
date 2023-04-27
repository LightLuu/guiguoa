import axios from "axios";

export let flags = {
  index: true,
};

// 创建axios实例
const service = axios.create({
  baseURL: "http://afraid.5gzvip.91tunnel.com", // api 的 base_url 后端接口得api
  timeout: 30000 // 请求超时时间
});


//后面可能会修改域名的地方，现在暂时用上面的本地域名

// // 创建axios实例
// const service = axios.create({
//   baseURL: "http://oa.atguigu.cn", // api 的 base_url
//   timeout: 30000 // 请求超时时间
// });

// http request 拦截器
  //这里token需要临时修改一哈
service.interceptors.request.use(config => {
    let token = window.localStorage.getItem("token") || "";
    //alert(token)
    if (token != "") {
      config.headers["token"] = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
// http response 拦截器
service.interceptors.response.use(response => {
    if (response.data.code == 208) {
      // debugger
      // 替换# 后台获取不到#后面的参数
      let url = window.location.href.replace('#', 'guiguoa')
      console.log(url);
      //alert(3)
      if(flags.index === true) {
        window.location = 'http://afraid.5gzvip.91tunnel.com/admin/wechat/authorize?returnUrl=' + url //后端接口得api
      }else {
        flags.index = true
      }
    } else {
      if (response.data.code == 200) {
        return response.data;
      } else {
        // 209没有权限 系统会自动跳转授权登录的，已在App.vue处理过，不需要提示
        if (response.data.code != 209) {
         // alert(response.data.message || "error");
        }
        return Promise.reject(response);
      }
    }
  },
  error => {
    //alert("error: ", error)
    return Promise.reject(error);   // 返回接口返回的错误信息
  });

export default service;
