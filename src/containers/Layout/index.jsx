import React from 'react';
// import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 5
  },
  container: {
    background: '#ffffff'
  },
  articleToc: {
  }
});

/**
 * 应用主体布局组件
 * @kind function Component
 * @param {*} props
 */
function Layout (props) {
  const { classes } = props;
  return (
    <Grid container spacing={24} className={classes.root}>
      <Grid
        item
        xs={12}
        sm={12}
        md={9}>
        <div className={classes.container}>
          {props.children}
        </div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Layout);
