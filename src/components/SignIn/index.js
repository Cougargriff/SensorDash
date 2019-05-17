import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

import 'antd/dist/antd.css';
import './signin.css';
import { FirebaseContext, withFirebase } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
    <h1 id="signin_title">Sign In</h1>
    <SignInForm/>
    </div>
);

class NormalLoginFormBase extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        email: '',
        password: '',
        error: null,
    };

    handleSubmit = (e) => {
        const { email, password } = this.state;

        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });

        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log('AUTH SUCCESSFUL');
            this.props.history.push(ROUTES.HOME);

        })
        .catch(error => {
            this.setState({ error });
        });


    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('name', event.target.name)
        console.log('onChange :)', event.target.value)
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            autoCompleteResult,
            email,
            password,
            error,
        } = this.state;

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
                value={password}
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
                value={email}
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
            <br />
            Or <a href="signup">Register Now!</a>
            </Form.Item>
            </Form>
        );
    }
}

const SignInForm = withRouter(withFirebase(Form.create({ name: 'normal_login' })(NormalLoginFormBase)));

export default SignInPage;
