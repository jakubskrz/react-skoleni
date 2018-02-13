// @flow
import * as React from 'react';
import Form from './Form';
import Text from './Text';
import { type ValidationError } from '../server/validation';

type TextInputProps = {|
  value: string,
  onChange: (value: string) => void,
  type?: 'text' | 'password' | 'email',
  error?: ?ValidationError,
|};

const errorToMessage = (validationError: ValidationError): string => {
  switch (validationError.type) {
    case 'trim':
      return 'trimuj pls';
    case 'required':
      return 'vypln pls';
    case 'email':
      return 'takhle email nevypada';
    case 'minLength':
      return `minimalni delka je ${validationError.minLength}`;
    case 'maxLength':
      return `maximalni delka je ${validationError.maxLength}`;
    default: {
      (validationError: empty);
      return '';
    }
  }
};

const ErrorMessage = props => {
  if (props.validationError == null) return null;
  return <Text color="error">{errorToMessage(props.validationError)}</Text>;
};

class TextInput extends React.PureComponent<TextInputProps> {
  handleInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value);
  };

  render() {
    return (
      <div>
        <input
          type={this.props.type || 'text'}
          value={this.props.value}
          onChange={this.handleInputChange}
        />
        <ErrorMessage validationError={this.props.error} />
      </div>
    );
  }
}

export default TextInput;
