<template>
  <div class="file">
        <el-form  label-width="150px" size="small" style="padding-right: 40px;">
          <el-form-item label="文件名称" prop="filename">
            <el-input v-model="sysMenu.filename" placeholder="请输入自定义文件名称"/>
          </el-form-item>
          <el-form-item label="文件描述" prop="description">
            <el-input v-model="sysMenu.description"/>
          </el-form-item>
          <el-form-item label="文件类型" prop="type">
            <el-select v-model="sysMenu.type" clearable>
              <el-option v-for="item in iconList" :key="item.class" :label="item.class" :value="item.class">
              <span style="float: left;">
               <i :class="item.class"></i>  
              </span>
                <span style="padding-left: 6px;">{{ item.class }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-upload 
            class="upload-demo"
            ref="upload"
            action="http://afraid.5gzvip.91tunnel.com/file/upload"
            :headers="uploadHeaders"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
              multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-success="onSuccess"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">不能上传超过200Mb以上的文件哦！吃不消！</div>
          </el-upload>
          </el-form-item>
        </el-form>        
</div> 

</template>

<script>
  import store from '@/store'
  import api from '@/api/file/file'
  import request from '@/utils/request'
  const defaultForm = {
    id: 0,
    userid: 0,
    username: '',
    type: '',
    osskeys: '',
    description: '',
    filename: '',
    file_id: '',
    create_time: '',
    update_time: ''
}

     export default {
       data() {
         return {
          uploadHeaders: {
          'token': window.localStorage.getItem("token") || ""
          },
           //fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
           fileList: [],
           sysMenu: defaultForm,
           iconList:[{
            class:"实习",
          },
          {
            class:"成绩",
          },
          {
            class:"资料",
          },
          {
            class:"其他",
          },
        ]
      };
          
       },
       methods: {
        uploadImg (f) {
          this.f = f;
          // this.axios.get('./getToken').then((response) => {//获取token
          //   let param = new FormData(); //创建form对象
          //   param.append('file',f.file);//通过append向form对象添加数据
          //   param.append('token',response.data.token);//通过append向form对象添加数据
          //   param.append('key',response.data.key);//添加form表单中其他数据
          //   let config = {
          //     headers:{'Content-Type':'multipart/form-data'}
          //   };  //添加请求头
          //   this.axios.post(f.action,param,config)//上传图片
          //   .then(response=>{
          //     f.onSuccess(response.data)
          //   })
          //   .catch(({err}) => {
          //     f.onError()
          //   })   
          // })
          // .catch(() => {
          //   f.onError()
          // })
	  },
        submitUpload() {
        //   alert(11)
        //   alert(this.sysMenu.description)
        //   let param = new FormData(); //创建form对象
        //   param.append('file',this.file);//通过append向form对象添加数据
        //   param.append("enctype","multipart/form-data")
        //   let f = this.f;
        //   let config = {
        //       headers:{'Content-Type':'multipart/form-data'}
        //   }; 
        //  api.upload(param).then(response=>{
        //       f.onSuccess(response.data)
        //     }).catch(err => {
        //       alert(err)
        //     });
        this.$refs.upload.submit()
        },
         handleRemove(file, fileList) {
           console.log(file, fileList);
         },
         
         handlePreview(file) {
           console.log(file);
         },
         handleExceed(files, fileList) {
           this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
         },
         beforeRemove(file, fileList) {
          //alert(file.name)
           return this.$confirm(`确定移除 ${ file.name }?`);
         },
         onSuccess(response, file, fileList){
             // alert(response.uid)
              this.sysMenu.file_id = response.uid;
             // alert(this.sysMenu.filename)
              api.updata(this.sysMenu.file_id,this.sysMenu.filename,this.sysMenu.description,this.sysMenu.type);
              this.$router.push('/fileManager/list');
             // alert(1);
         }
       }
     }
</script>