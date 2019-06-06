import React, { Component }from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

import 'antd/dist/antd.css';
import './signin.css';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'



import * as ROUTES from '../../constants/routes';



const SignInPage = () => (
    <div>
        <h1 id="signin_title">Sign In</h1>
        <SignInForm/>
    </div>
);

class NormalLoginFormBase extends Component {

    static propTypes = {
        auth: PropTypes.object,
        firebase: PropTypes.shape({
            login: PropTypes.func.isRequired
        }),
    }

    handleSubmit = (e) => {
        const { email, password } = this.state;

        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', this);
            }
        });

        // perform login with firebase auth
        
        this.props.firebase.login({
            email: email,
            password: password
        }).then(() => {
            this.props.history.push(ROUTES.HOME);
        })
        
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
            {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input
                prefix= {
                    <Icon
                    type="user"
                    style= {
                        {
                            color: 'rgba(0,0,0,.25)'
                        }
                    }
                    />
                }
                name="email"
                onChange={this.onChange.bind(this)}
                placeholder="email"
                />
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input
                prefix = {
                    <Icon
                    type="lock"
                    style= {
                        {
                            color: 'rgba(0,0,0,.25)'
                        }
                    }
                    />
                }
                name="password"
                type="password"
                onChange={this.onChange.bind(this)}
                placeholder="Password"
                />
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(
                <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="f">Forgot password</a>
            <br />
            <Button htmlType="submit" className="login-form-button">
            Log in
            </Button>
            </Form.Item>
            </Form>
        );
    }
}

const SignInForm = withRouter(Form.create({ name: 'normal_login' })(firebaseConnect()(NormalLoginFormBase)));
 
export default SignInPage;
