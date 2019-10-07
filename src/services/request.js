/*
 * 封装统一的请求
 * @Author: lzhengms 
 * @Date: 2019-10-06 17:45:52 
 * @Last Modified by: lzhengms
 * @Last Modified time: 2019-10-06 20:41:50
 */

 import axios from 'axios'
 import { JSON_SERVER_URL } from '../origins'

 export default function request (option) {
    let params = {
        baseURL: JSON_SERVER_URL
      };
      if (Object.prototype.toString.call(option) === '[object String]') {
        params.url = option
        params.method = 'GET'
      } else {
        params = Object.assign(params, option);
        if ((option.method).toUpperCase() === 'GET') {
          params.params = params.data
          delete params.data
        }
        let slotParams = option.slotParams
        if (slotParams) {
          for (let key in slotParams) {
            if (slotParams.hasOwnProperty(key)) {
              params.url = params.url.replace(`{${key}}`, slotParams[key])
            }
          }
        }
      }
      return axios(params).then(res => {
        if (res.data) {
          return {
            data: res.data,
            headers: res.headers
          }
        }
        return Promise.reject(new Error('No response data.'));
      })
 }