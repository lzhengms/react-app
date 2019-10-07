/*
 * 文章的分类
 * @Author: lzhengms 
 * @Date: 2019-10-06 17:42:25 
 * @Last Modified by: lzhengms
 * @Last Modified time: 2019-10-06 20:47:51
 */

 import request from './request'

 export function getCategories(option) {
    return request({
      url: '/categories',
      method: 'GET',
      ...option
    })
 }
