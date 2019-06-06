import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { Button } from 'antd';



const SignOutButton = (f) => (
  <Button  onClick={() => {
    f.logout()
  }}>
    Sign Out
  </Button>
);

class SignOutButtonGen extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    }),
  }

  render() {
    if(!isLoaded(this.props.auth) || isEmpty(this.props.auth)) {
      return null
    }

    // only return the sign out button if the user is logged in 

    return SignOutButton(this.props.firebase)
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
}

const mapDispatchToProps =  {
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(SignOutButtonGen)

