/*
 * store的入口文件
 * @Author: lzhengms 
 * @Date: 2019-10-06 20:46:56 
 * @Last Modified by: lzhengms
 * @Last Modified time: 2019-10-06 20:48:50
 */

import { fork } from 'redux-saga/effects';
import { pushRoute, replaceRoute } from './location';
import createStore, { history } from './createStore';
import { makeRootReducer, injectReducer } from './handlerReducer';

/**
 * fork所有saga分支
 * @param {array} sagas saga数组
 * @see src/store/index.js
 */
const makeRootSaga = (sagas) => {
  return function * rootSaga () {
    yield sagas.map(saga => fork(saga));
  };
};

/**
 * 插入异步saga，更新store中fork的saga
 * @param {*} store
 * @param {object} param
 * @see src/store/index.js
 */
const injectSagas = (store, { key, sagas }) => {
  if (store.asyncSagas[key]) {
    return;
  }
  store.asyncSagas[key] = sagas;
  store.runSaga(makeRootSaga(sagas));
};

export default createStore;
export { history, pushRoute, replaceRoute, injectReducer, makeRootReducer, makeRootSaga, injectSagas };
