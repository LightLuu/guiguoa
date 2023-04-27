import request from '@/utils/request'

const api_name = '/process/question'

export default {

  getPageList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get'
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  },

  //编辑问卷
  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  
  //查看问卷填写详情（）


  //发布问卷，指定用户发布


  //发布 ，部署流程定义
  publish(id) {
    return request({
      url: `${api_name}/publish/${id}`,
      method: 'get'
    })
  }
}