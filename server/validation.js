const isEmail = require('validator/lib/isEmail');

export type ValidationError =
  | { type: 'trim' }
  | { type: 'required' }
  | { type: 'email' }
  | { type: 'minLength', minLength: number }
  | { type: 'maxLength', maxLength: number };

const chain = (...validators) => value => {
  for (const validator of validators) {
    const error = validator(value);
    if (error != null) return error;
  }
};

const validateTrim = value => {
  if (value !== value.trim()) return { type: 'trim' };
};

const validateLength = (predicate, error) =>
  chain(validateTrim, value => {
    if (predicate(value)) return error;
  });

const validateRequired = validateLength(value => value.length === 0, {
  type: 'required',
});

const validateEmail = chain(validateRequired, value => {
  if (!isEmail(value)) return { type: 'email' };
});

const validateRange = (minLength, maxLength) =>
  chain(
    validateRequired,
    validateLength(value => value.length < minLength, {
      type: 'minLength',
      minLength,
    }),
    validateLength(value => value.length > maxLength, {
      type: 'maxLength',
      maxLength,
    }),
  );

const validatePassword = validateRange(6, 1024);
const validateShortText = validateRange(3, 140);

// Validations.

export type ValidationErrors<Variables> = {
  [prop: $Keys<Variables>]: ?ValidationError,
};

type Validate<Variables> = (
  variables: Variables,
) => ?ValidationErrors<Variables>;

const validateEmailPassword = variables => {
  const email = validateEmail(variables.email);
  if (email) return { email };
  const password = validatePassword(variables.password);
  if (password) return { password };
};

const validateNewWeb = variables => {
  const name = validateShortText(variables.name);
  if (name) return { name };
};

module.exports = {
  validateEmailPassword,
  validateNewWeb,
};
