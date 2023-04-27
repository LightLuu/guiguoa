<template>
    <div>
      <van-nav-bar
        title="问卷填写"
        left-text="返回"
        left-arrow
        @click-left="() => $router.back()"
      />
      <div style="margin: 10px 10px 0 0;border: 0px solid red;">
      <form-create
        :rule="rule"
        :option="option"
        @submit="onSubmit"
      ></form-create>
      </div>
    </div>
  </template>

  <script>
  import api from "@/api/process";

  
  export default {
    name: "process",
  
    data() {
      return {
        processTemplateprocessTemplate: null,
        rule: [],
        option: {}
      };
    },
  
    created() {
      //alert(1110)
      let processTemplateId = this.$route.params.id;
      //alert(processTemplateId)
      this.fetchData(processTemplateId);
    },
  
    methods: {
      fetchData(processTemplateId) {
        api.getquestion(processTemplateId).then(response => {
          console.log(response.data);
          this.processTemplate = response.data;
  
          this.rule = JSON.parse(this.processTemplate.formProps);
          this.option = JSON.parse(this.processTemplate.formOptions);
        });
      },
  
      onSubmit(formData) {
        //提交之后存储到问卷表中
        console.log(formData)
        let formShowData = {};
        this.rule.forEach(item => {
          for (let key in formData) {
            if (key === item.field) {
              console.log(item.title, formData[key]);
              formShowData[item.title] = formData[key];
            }
          }
        });
        let DATA = {
          formData: formData,
          formShowData: formShowData
        };
        console.log(DATA);
        let processFormVo = {
          "processTemplateId": this.processTemplate.id,//问卷id
          //"processTypeId": this.processTemplate.processTypeId,
          "formValues": JSON.stringify(DATA)
        };
        console.log(processFormVo)
        debugger
        //跳转到问卷页面
        //1.存储数据到问卷记录表
        api.startUp2(processFormVo).then(response => {
          //调整到已发起列表
          this.$router.push({ path: "/question" });
        });
        // api.startUp(processFormVo).then(response => {
        //   //调整到已发起列表
        //   this.$router.push({ path: "/list/2" });
        // });
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .el-form {
    .el-form-item {
      /deep/ .el-form-item__label {
        font-size: 18px;
        font-weight: 800;
        color: blue;
      }
    }
  }
  </style>
  