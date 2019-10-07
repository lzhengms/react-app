/*
 * 文章列表
 * @Author: lzhengms 
 * @Date: 2019-10-06 17:42:48 
 * @Last Modified by: lzhengms
 * @Last Modified time: 2019-10-06 20:42:53
 */
import request from './request'

export function getPostList(option) {
  return request({
    url: '/posts',
    method: 'GET',
    ...option
  })
}

export function getPostById(option) {
   return request({
    url: '/posts/{id}',
    method: 'GET',
    ...option
   })
}
 

