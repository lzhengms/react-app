/*
 * 应用路由的入口文件
 * @Author: lzhengms 
 * @Date: 2019-10-06 10:31:56 
 * @Last Modified by: lzhengms
 * @Last Modified time: 2019-10-11 11:27:35
 */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component }  from 'react';
import reactLoad from 'react-loadable';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../containers/Layout/';
import Launch from '../components/Launch/';
import { history } from 'store/';
import { actions as AppActions } from 'store/appFlux';
import LoadingComponent from 'components/Loading';

const AsyncAbout = reactLoad({
  loader: () => import('../components/About'),
  loading: LoadingComponent
})

const AsyncHome = reactLoad({
  loader: () => import('../containers/Home'),
  loading: LoadingComponent
})

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: theme.palette.background.default
  },
  wrap: {
    padding: theme.spacing.unit * 1,
    paddingTop: 0,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      padding: theme.spacing.unit * 2,
      paddingTop: 0
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 60,
      padding: theme.spacing.unit * 3,
      paddingTop: 0
    }
  },
  content: {
  }
});

/**
 * 应用路由组件
 * @class Routes
 * @kind class
 * @extends Component
 * @see src/routes/index.js
 */
class Routes extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount () {
    const { pathname } = history.location;
    let results = pathname.match(/\/posts\/(\d+)\//) || [];
    let pageRes = pathname.match(/\/page\/(\d+)\//) || [];
    let param = {};

    if (results[1]) {
      param.id = results[1];
    }
    if (pageRes[1]) {
      param.page = pageRes[1];
    }
    this.props.requestPostList(param);
  }
  render () {
    const { classes } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Launch className={classes.root}>
        <div className={classes.wrap}>
            <div className={classes.content}>
              <Layout>
                <Router>
                  <Route path='/' exact component={AsyncHome}/>
                  <Route path='/about' exact component={AsyncAbout} />
                </Router>
              </Layout>
            </div>
          </div>
        </Launch>
      </ConnectedRouter>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestPostList: AppActions.requestPostList
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Routes));


