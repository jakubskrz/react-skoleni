// @flow
import * as React from 'react';
import Form from './Form';
import TextInput from './TextInput';
import Button from './Button';
import {
  validateEmailPassword,
  type ValidationErrors,
} from '../server/validation';

type Fields = {|
  email: string,
  password: string,
|};

type AuthState = {|
  ...Fields,
  validationErrors: ValidationErrors,
|};

class Auth extends React.PureComponent<{}, AuthState> {
  static initialState = {
    email: '',
    password: '',
    validationErrors: {},
  };

  state = Auth.initialState;

  handleFormSubmit = () => {
    const variables = {
      email: this.state.email,
      password: this.state.password,
    };

    const validationErrors = validateEmailPassword(variables);

    if (validationErrors) {
      this.setState({ validationErrors });
      return;
    }
  };

  render() {
    this.state.validationErrors.email;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <TextInput
          type="email"
          value={this.state.email}
          onChange={email => this.setState({ email })}
          error={this.state.validationErrors.email}
        />
        <TextInput
          type="password"
          value={this.state.password}
          onChange={password => this.setState({ password })}
          error={this.state.validationErrors.password}
        />

        <Button>Send</Button>
      </Form>
    );
  }
}

export default Auth;
