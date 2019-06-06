import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut'



class Navigation extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
  }

  render() {

    console.log(isLoaded())
    if (!isLoaded(this.props.auth)) {
      return null
    }
    if (isEmpty(this.props.auth)) {
      return NavigationNoAuth()
    }

    return NavigationAuth()
  }

}

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
        <SignOutButton />
      </li>
  </ul>
);

const NavigationNoAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navigation)


