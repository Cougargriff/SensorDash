import React from 'react';

import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

import { FirebaseContext } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const INITIAL_STATE = {
    confirmDirty: false,
    autoCompleteResult: [],
    email: '',
    password: '',
    error: null,
};

const SignUpPage = () => (
    <div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
    {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
    </div>
);

class RegistrationFormBase extends React.Component {
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
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log('AUTH SUCCESSFUL');
            this.props.history.push(ROUTES.HOME);

        })
        .catch(error => {
            this.setState({ error });
        });

        console.log('email', email);

    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
            label="E-mail"
            >
            {getFieldDecorator('email', {
                rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                }, {
                    required: true, message: 'Please input your E-mail!',
                }],
            })(
                <Input
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.onChange.bind(this)}
                />
            )}
            </Form.Item>
            <Form.Item
            label="Password"
            >
            {getFieldDecorator('password', {
                rules: [{
                    required: true, message: 'Please input your password!',
                }, {
                    validator: this.validateToNextPassword,
                }],
            })(
                <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.onChange.bind(this)}
                />
            )}
            </Form.Item>
            <Form.Item
            label="Confirm Password"
            >
            {getFieldDecorator('confirm', {
                rules: [{
                    required: true, message: 'Please confirm your password!',
                }, {
                    validator: this.compareToFirstPassword,
                }],
            })(
                <Input
                type="password"
                placeholder="Confirm Password"
                onBlur={this.handleConfirmBlur}
                />
            )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
                valuePropName: 'checked',
            })(
                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
            <Button  htmlType="submit">Register</Button>
            </Form.Item>
            </Form>
            </div>
        );
    }
}

const SignUpForm = withRouter(Form.create({ name: 'register' })(RegistrationFormBase));

export default SignUpPage;
