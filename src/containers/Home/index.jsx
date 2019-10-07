import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Posts from 'components/Posts/';
import { pushRoute, replaceRoute } from 'store/';
import { actions as AppActions } from 'store/appFlux';

/**
 * 首页主体容器组件
 * @class Home
 * @extends Component
 * @see src/routes/Home/index.js
 */
class Home extends Component {
  constructor (...arg) {
    super(...arg);
    this.state = {
      posts: [],
      startPage: 1,
      page: parseInt(this.props.page || 0, 10) || 1,
      pageSize: 5,
      totalPages: 0,
      total: 0
    };

    this.handlePageBack = this.handlePageBack.bind(this);
    this.handlePageNext = this.handlePageNext.bind(this);
  }

  componentDidMount () {
    if (!this.props.willAutoFetchPosts) {
      this.fetchPosts();
    }
  }

  componentWillUpdate (nextProps, nextState) {
    const { page } = this.props;
    const { pageSize } = this.state;

    if (nextProps.page !== page || nextState.pageSize !== pageSize) {
      this.fetchPosts({
        page: nextProps.page
      });
    }
  }

  render () {
    const { fetching, ids, page, posts, total, totalPages } = this.props;
    const { pageSize, startPage } = this.state;

    return (
      <div>
        <Posts
          categories={[]}
          fetching={fetching}
          ids={ids}
          posts={posts}
          pageSize={pageSize} />
      </div>
    );
  }

  handlePageNext () {
    const { page } = this.props;
    this.props.push({
      pathname: `/page/${page + 1}/`,
      state: {
        page: page + 1
      }
    });
  // this.setState((prevState) => {
  //   return {
  //     page: prevState.page + 1
  //   }
  // })
  }

  handlePageBack () {
    const { page } = this.props;
    if (page === 2) {
      this.props.push({
        pathname: '/',
        state: {
          id: 1
        }
      });
    } else {
      this.props.push({
        pathname: `/page/${page - 1}/`,
        state: {
          page: page - 1
        }
      });
    }
  }

  fetchPosts (data) {
    const { page } = data || this.props;
    this.props.requestPostList({
      page: page,
      per_page: this.state.pageSize
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    willAutoFetchPosts: (state.home && state.home.willAutoFetchPosts) || true,
    page: parseInt(ownProps.match.params.page || 1, 10),
    fetching: state.app.fetching,
    ids: state.app.posts.ids,
    posts: state.app.posts.data,
    total: state.app.posts.total,
    totalPages: state.app.posts.totalPages,
    categories: state.app.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestPostList: AppActions.requestPostList,
    push: pushRoute,
    replace: replaceRoute
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
