import { push, replace } from 'react-router-redux';

/**
 * 使用histytory.push方式更新路由
 * @see src/store/location.js
 * @param {string} payload route pathname
 */
export const pushRoute = (payload) => {
  return push(payload);
};

/**
 * 使用histytory.preplace方式更新路由
 * @see src/store/location.js
 * @param {string} payload route pathname
 */
export const replaceRoute = (payload) => {
  return replace(payload);
};