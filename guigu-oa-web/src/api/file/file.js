import request from '@/utils/request'
//<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.3.0.min.js"></script>
const api_name = '/process/sys-file'
const api_name2 = '/file'
const OSS = require('ali-oss');
export default {
    //获得后端密钥，废弃
    getclient(creds){
       // alert(creds)
        let client = new OSS.Wrapper({
            region: "oss-cn-chengdu", // 服务器集群地区
            accessKeyId: creds.accessKeyId, // OSS帐号
            accessKeySecret: creds.accessKeySecret, // OSS 密码
            stsToken:creds.securityToken, // 签名token
            bucket: "filemanage-afraid", // 阿里云上存储的 Bucket
          });
        //alert(client);
    },
    getAliOSSCreds(){
        return request({
            url: `${api_name}/getkey`,
            method: 'get',
          })
    },
    updata(fileid,filename,des,type){
      return request({
        //?fileid=131&filename=awf&des=fwefwe
            url: `${api_name2}/updata/`+fileid+`/`+filename+`/`+des+`/`+type,
            method: 'get',
        })
    },
    findNodes(){
        return request({
            url:`${api_name}/findNodes`,
            method:`get`,
        })
    },
    removeById(id){
       return request({
         url:`${api_name}/remove/${id}`,
         method: 'delete',
       })
    },
    upload(osskeys,filename,time){
        return request({
            url:`${api_name}/upload/?osskeys=`+osskeys+`&filename=`+filename+`&time=`+time,
            method: 'get',
          })
    },
    getBlob(url) { // url:是文件在oss上的地址
     // alert(url)
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";// 请求类型是blob类型
        xhr.crossOrigin = "*"; // 解决跨域问题
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };
        xhr.send();
      });
    },
    saveAs(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement("a");
        const body = document.querySelector("body");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename; //修改文件名
        link.style.display = "none";
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    }
}