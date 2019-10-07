/*
 * 数据适配功能文件
 * @Author: lzhengms 
 * @Date: 2019-10-06 20:23:38 
 * @Last Modified by: lzhengms
 * @Last Modified time: 2019-10-06 20:25:25
 */

import moment from 'moment';
/**
 * 适配PostList数组
 * @param {array} data postList
 * @return {array} new list of post
 * @see src/store/dataAdapter.js
 */
export const formatPostListData = (data) => {
  let len = data.length;
  let result = {
    ids: [],
    data: {}
  };
  if (len > 0) {
    while (len--) {
      let post = data[len];
      let obj = {
        id: post.id,
        authorId: parseInt(post.author || 0, 10) || '',
        title: post.title.rendered,
        originalDate: post.date,
        date: moment(post.date).format('YYYY-MM-DD HH:mm:ss'),
        excerpt: post.excerpt.rendered,
        content: post.content.rendered,
        modified: moment(post.modified).format('YYYY-MM-DD HH:mm:ss'),
        categories: post.categories,
        tags: post.tags,
        comment_status: post.comment_status,
        status: post.status,
        link: post.link.replace(/.+\.(?:com|net|cn|org)(\/.+\/?$)/, '$1')
      };
      result.ids.unshift(post.id);
      Object.assign(result.data, {
        [post.id]: obj,
        [obj.link]: obj
      });
    }
  }
  return result;
};




