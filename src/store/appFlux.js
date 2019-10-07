import { put, call, takeLatest } from 'redux-saga/effects';
import { getPostList as getPosts } from '../services/postService';
import { formatPostListData } from './model';
import { setWillAutoFetchPosts } from 'containers/Home/flux';

const REQUEST_POST_LIST = 'REQUEST_POST_LIST';
const FETCHING_POST_LIST = 'FETCHING_POST_LIST';
const RECEIVE_POST_LIST = 'RECEIVE_POST_LIST';


/**
 * 请求文章列表ActionCreator
 * @param {object} payload 请求文章列表参数负载
 * @return {object} [action] action object
 * @see src/store/appFlux.js
 */
function requestPostList (payload) {
  return {
    type: REQUEST_POST_LIST,
    payload: payload
  };
}

/**
 * 请求文章列表状态中ActionCreator
 * @param {object} payload 请求状态
 * @return {object} [action] action object
 * @see src/store/AppFlux.js
 */
function fetchingPostList (payload) {
  return {
    type: FETCHING_POST_LIST,
    payload: payload
  };
}

/**
 * 接收文章列表ActionCreator
 * @param {*} payload 接收文章列表数据负载
 * @return {object} [action] action object
 * @see src/store/appFlux.js
 */
function receivePostList (payload) {
  return {
    type: RECEIVE_POST_LIST,
    payload: payload
  };
}


export const actions = {
  requestPostList, receivePostList
};

// 初始化状态
var initialState = {
  fetching: false,
  categories: [{
    name: '分类1',
    id: 1
  },{
    name: '分类2',
    id: 2
  }],
  posts: {
    ids: [],
    data: {},
    total: 0,
    totalPages: 0
  }
};

/**
 * 应用初始reducer
 * @param {object} state 应用状态树节点状态对象
 * @param {object} action action object
 * @return {object} state 应用新状态对象
 * @see src/store/appFlux.js
 */
export default function appReducer (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case FETCHING_POST_LIST:
      return Object.assign({}, state, {
        fetching: action.payload.fetching
      });
    case RECEIVE_POST_LIST:
      return Object.assign({}, state, {
        posts: {
          ids: payload.ids,
          data: payload.data,
          total: payload.total,
          totalPages: payload.totalPages
        }
      });
    default:
      return state;
  }
}

const initParam = {
  page: 1,
  per_page: 10
};

/**
 * 请求文章列表方法
 * @see src/store/appFlux.js
 * @param {*} params 请求参数
 *  eg: {
 *    page: Num,
 *    per_page: Num
 *  }
 */
function getPostList (params = {
  page: 1,
  per_page: 10
}) {
  return getPosts({
    data: Object.assign({}, initParam, params)
  }).then(res => {
    if (res) {
      let data = formatPostListData(res.data);
      return {
        total: parseInt(res.headers['X-WP-Total'.toLowerCase()], 10),
        totalPages: parseInt(res.headers['X-WP-TotalPages'.toLowerCase()], 10),
        ...data
      };
    }
  });
}

/**
 * 处理请求文章列表Saga
 * @see src/store/appFlux.js
 * @param {*} payload 请求参数负载
 */
function * getPostListSaga ({ payload }) {
  yield put(fetchingPostList({
    fetching: true
  }));
  const data = yield call(getPostList, payload);
  yield put(receivePostList(data));
  yield put(fetchingPostList({
    fetching: false
  }));
  if (data) {
    yield put(setWillAutoFetchPosts(false));
  }
}

/**
 * 定义AppSaga
 * @see src/store/appFlux.js
 */
export function * AppSaga (action) {
  // 接收最近一次请求，然后调用getPostListSaga子Saga
  yield takeLatest(REQUEST_POST_LIST, getPostListSaga);
}
