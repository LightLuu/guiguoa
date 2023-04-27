import request from '@/utils/request'

const api_name = '/admin/process'
const api_name2 = '/process/question-record'
export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },
  getRecord(page, limit, searchObj) {
    return request({
      url: `${api_name2}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },
}