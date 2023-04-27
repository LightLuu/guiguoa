import request from '@/utils/request'

const api_name = '/admin/process'
const api_name2 = '/process/question'
export default {

  findProcessType() {
    return request({
      url: `${api_name}/findProcessType`,
      method: 'get'
    })
  },

  getProcessTemplate(processTemplateId) {
    return request({
      url: `${api_name}/getProcessTemplate/`+processTemplateId,
      method: 'get'
    })
  },

//获得问卷
 getquestion(questionId){
  return request({
    url:`${api_name2}/get/`+questionId,
    method: 'get'
  })
 },
//获得问卷列表
getquestions(page, limit){
  //alert("调用")
  return request({
    url: `/process/question/`+page+`/`+ limit,
    method: 'get'
  })
},
  startUp(processFormVo) {
    return request({
      url: `${api_name}/startUp`,
      method: 'post',
      data: processFormVo
    })
  },

startUp2(questionVo){
  return request({
    url:`/process/question-record/startUp`,
    method:`post`,
    data:questionVo
  })
},

  findPending(page, limit) {
    return request({
      url: `${api_name}/findPending/`+page+`/`+ limit,
      method: 'get'
    })
  },

  show(id) {
    return request({
      url: `${api_name}/show/`+id,
      method: 'get'
    })
  },

  approve(approvalVo) {
    return request({
      url: `${api_name}/approve`,
      method: 'post',
      data: approvalVo
    })
  },


  findProcessed(page, limit) {
    return request({
      url: `${api_name}/findProcessed/`+page+`/`+ limit,
      method: 'get'
    })
  },

  findStarted(page, limit) {
    return request({
      url: `${api_name}/findStarted/`+page+`/`+ limit,
      method: 'get'
    })
  },



}
