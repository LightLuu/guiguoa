<template>
    <div class="app-container">
      <!-- 工具条 -->
      <div class="tools-div">
        <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添 加</el-button>
      </div>
      <el-table
        :data="sysFileList"
        style="width: 100%;margin-bottom: 20px;margin-top: 10px;"
        row-key="id"
        border="true"
        :default-expand-all="false"
        :tree-props="{children: 'children'}">
  
        <el-table-column prop="filename" label="文件名称" width="160"/>
        <el-table-column prop="username" label="用户名" width="160"/>
        <el-table-column prop="createTime" label="创建时间" width="160"/>
        <el-table-column prop="description" label="文件描述" width="320"/>
        <el-table-column prop="" label="文件预览" width="100">
          <template   slot-scope="scope">  
                <!-- 这里是因为oss文件上传时是支持下载的问题
                如果要改就比较麻烦，目前就没做文件上传 -->
                {{upload3(scope.row)}}
                <img :src="scope.row.image"  v-if="scope.row.flag == 1"  width="50%" height="50" />
          </template>    
        </el-table-column> 
        <!-- <el-table-column prop="path" label="路由地址" width="120"/>
        <el-table-column prop="component" label="组件路径" width="160"/>
        <el-table-column prop="sortValue" label="排序" width="60"/> -->
        <el-table-column label="状态" width="80">
          <template slot-scope="scope" >
            <el-switch
              v-model="scope.row.isDeleted === 0" disabled="true">
            </el-switch>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="230" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-share" size="mini" @click="show(scope.row)" title="分享"/>
            <el-button type="info" icon="el-icon-download" size="mini" @click="upload(scope.row)" title="下载"/>
            <!-- <el-button type="success" v-if="scope.row.type !== 2" icon="el-icon-plus" size="mini" @click="add(scope.row)" title="添加下级节点"/> -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改"/>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" :disabled="scope.row.children.length > 0"/>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible2" width="40%" >
      <el-form ref="dataForm" :model="sysFile" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="文件名称" prop="name">
            <el-input v-model="sysFile.filename"/>
          </el-form-item>
          <el-form-item label="文件类型" prop="types">
            <el-select v-model="sysFile.types" clearable>
              <el-option v-for="item in iconList2" :key="item.class" :label="item.class" :value="item.class">
              <span style="float: left;">
               <i :class="item.class"></i>  
              </span>
                <span style="padding-left: 6px;">{{ item.class }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件描述" prop="description">
            <el-input v-model="sysFile.description"/>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="Update2()" size="small">确 定</el-button>
      </span>
    </el-dialog>



    
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" >
        <el-form ref="dataForm" :model="sysFile" label-width="150px" size="small" style="padding-right: 40px;">
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="sysFile.filename"/>
          </el-form-item>
          <el-form-item label="有效时长" prop="icon">
            <el-select v-model="times" clearable>
              <el-option v-for="item in timeList" :key="item.class" :label="item.class" :value="item.class">
              <span style="float: left;">
               <i :class="item.class"></i>  <!-- 如果动态显示图标，这里添加判断 -->
              </span>
                <span style="padding-left: 6px;">{{ item.class }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
          <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  
  <script>
  import api from '@/api/system/sysMenu'
  import api2 from '@/api/file/file'
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  Vue.use(VueClipboard)
  const defaultForm = {
    id: '',
    parentId: '',
    name: '',
    type: 0,
    path: '',
    component: '',
    perms: '',
    icon: '',
    sortValue: 1,
    status: 1
  }
  const defaultForm2 = {
    "id": 26,
    "userId": 1,
    "fileId": 0,
    "createTime": "",
    "updateTime": "",
    "isDeleted": 0,
    "username": "",
    "filename": "",
    "description": "",
    "osskeys": "",
    "types": "",
    "image":"",
    "flag":0
  }
  export default {
    // 定义数据
    data() {
      return {
        sysMenuList: [],
        expandKeys: [], // 需要自动展开的项
        sysFileList:[],//文件列表

        typeDisabled: false,
        type0Disabled: false,
        type1Disabled: false,
        type2Disabled: false,
        dialogTitle: '',
  
        dialogVisible: false,
        dialogVisible2:false,
        sysMenu: defaultForm,
        sysFile:defaultForm2, //文件类型
        saveBtnDisabled: false,
        
        temp:"",
        times:"",
        timeList:[
          {
            class:"30分钟"
          },
          {
            class:"one day"
          },
          {
            class:"three day"
          }
        ],
        iconList2:[{
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
        ],
        iconList: [
          {
            class: "el-icon-s-tools",
          },
          {
            class: "el-icon-s-custom",
          },
          {
            class: "el-icon-setting",
          },
          {
            class: "el-icon-user-solid",
          },
          {
            class: "el-icon-s-help",
          },
          {
            class: "el-icon-phone",
          },
          {
            class: "el-icon-s-unfold",
          },
          {
            class: "el-icon-s-operation",
          },
          {
            class: "el-icon-more-outline",
          },
          {
            class: "el-icon-s-check",
          },
          {
            class: "el-icon-tickets",
          },
          {
            class: "el-icon-s-goods",
          },
          {
            class: "el-icon-document-remove",
          },
          {
            class: "el-icon-warning",
          },
          {
            class: "el-icon-warning-outline",
          },
          {
            class: "el-icon-question",
          },
          {
            class: "el-icon-info",
          }
        ]
      }
    },
  
    // 当页面加载时获取数据
    created() {
      this.fetchData()
    },
  
    methods: {
      // 调用api层获取数据库中的数据
      fetchData() {
        console.log('加载列表')
        // api.findNodes().then(response => {
        //   this.sysMenuList = response.data
        //   console.log(this.sysMenuList)
        // })
        api2.findNodes().then(response=>{
            this.sysFileList = response.data
           //alert(this.sysFileList[0].id)
            console.log(this.sysFileList)
        })
      },
      //更新数据
      Update2(){
        api2.updata(this.sysFile.fileId,this.sysFile.filename,this.sysFile.description,this.sysFile.types).then(
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        )
        this.dialogVisible2 = false
        this.fetchData()
      },
      // 根据id删除数据
      removeDataById(id) {
        // debugger
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { // promise
          // 点击确定，远程调用ajax
          return api2.removeById(id)
        }).then((response) => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
           this.$message.info('取消删除')
        })
      },
  
      // -------------
      add(row){
        debugger
        this.typeDisabled = false
        this.dialogTitle = '添加下级节点'
        this.dialogVisible = true
  
        this.sysMenu = Object.assign({}, defaultForm)
        this.sysMenu.id = ''
        if(row) {
          this.sysMenu.parentId = row.id
          this.sysMenu.parentName = row.name
          //this.sysMenu.component = 'ParentView'
          if(row.type === 0) {
            this.sysMenu.type = 1
            this.typeDisabled = false
            this.type0Disabled = false
            this.type1Disabled = false
            this.type2Disabled = true
          } else if(row.type === 1) {
            this.sysMenu.type = 2
            this.typeDisabled = true
          }
        } else {
          this.dialogTitle = '添加目录节点'
          this.sysMenu.type = 0
          this.sysMenu.component = 'Layout'
          this.sysMenu.parentId = 0
          this.typeDisabled = true
        }
      },
  
      show(row) {
        debugger
        this.dialogTitle = '分享文件'
        this.dialogVisible = true
        this.temp = row;
        this.sysFile = Object.assign({}, row)
        this.typeDisabled = true
      },
  
      edit(row) {
      this.dialogTitle = '修改文件'
      this.dialogVisible2 = true
      this.sysFile = Object.assign({}, row)
      this.typeDisabled = true
    },

      //下载参数
      upload(row){
        api2.upload(row.osskeys,row.filename,0).then(res=>{
                var a = document.createElement("a");
                
                //alert(a.download)
                a.href =(res.data);
                //alert(a.href);
                a.download = row.filename;
                a.click();
        });
    //     api2.upload(row.osskeys,row.filename).then(res => {
    //     if(res){
    //         alert(res.headers['content-disposition'])
    //         var fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);
    //         alert(fileName)
    //         var blob = new Blob([res.data]);
    //         if(window.navigator.msSaveOrOpenBlob){
    //             navigator.msSaveBlob(blob,fileName);
    //         }else{
    //             var a = document.createElement("a");
    //             a.download = fileName;
    //             a.href = window.URL.createObjectURL(blob);
    //             a.click();
    //         }
    //     }
    // })
      },
      upload3(row){
        let srcs = "";
        api2.upload(row.osskeys,row.filename,0).then(res=>{
          //alert(res.data)   
          row.flag = res.data;
          row.image = res.data;
          if(row.osskeys.split(".")[1] == "png" || row.osskeys.split(".")[1] == "jpg"){
            row.flag = 1
          }
          //alert(row.flag)
          row.image = res.data;
          return res.data;
        });
        return srcs;
      },
      saveOrUpdate() {
       // alert(this.sysFile.filename)
        //alert(this.times)
        let time = 0;
        if(this.times == "30分钟"){
          time = 0;
        }else if(this.times == "one day"){
          time = 1;
        }
        else{
          time = 2;
        }
        //alert(time)
        this.dialogVisible = false
        let row = this.temp;
        api2.upload(row.osskeys,row.filename,time).then(res=>{
            //alert(res.data)
            this.$copyText(res.data).then( e => {
            alert('复制URL成功,快分享给别人吧')
            console.log(e)
        }, function (e) {
            alert('复制失败')
            console.log(e)
        })
        });
      },
  
      // 新增
      saveData() {
        api.save(this.sysMenu).then(response => {
          this.$message.success(response.message || '操作成功')
          this.dialogVisible = false
          this.fetchData(this.page)
        })
      },
  
      // 根据id更新记录
      updateData() {
        api.updateById(this.sysMenu).then(response => {
          this.$message.success(response.message || '操作成功')
          this.dialogVisible = false
          this.fetchData()
        })
      }
    }
  }
  </script>