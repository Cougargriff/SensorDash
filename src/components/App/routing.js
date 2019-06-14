import React from 'react';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';


import * as ROUTES from '../../constants/routes';

import { BrowserRouter as Router, Route} from 'react-router-dom';

const RouterElement = () => (
    <Router>
      <div>
        <Navigation />
        <hr/>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
      </div>
    </Router>
)

export default RouterElement
