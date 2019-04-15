import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import './signin.css';

const SignIn = () => (
    <div class="SignIn">
        <Form>
          <Form.Group controlId="email" bsSize="large">
            <Form.Control
              autoFocus
              type="email"
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              hint="password"
              type="password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
);

export default SignIn;
