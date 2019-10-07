import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';
import { pushRoute } from 'store'

const Header = (props) => {
    const goRoute = (route) => {
       pushRoute(route)
    }
    debugger
    return (
        <div>
            <Button color='inherit' onclick={() => this.goRoute('/')}>
            Home
            </Button>
            <Button color='inherit' onclick={() => this.goRoute('/')}>
            About
            </Button>
        </div>
    );
  };
  
  export default Header;