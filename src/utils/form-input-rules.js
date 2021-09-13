import isEmail from 'validator/es/lib/isEmail';

class FormInputRules {
  required(message = 'This field is required') {
    this.required = message;
    return this;
  }

  email(message = 'Please enter a valid email') {
    this.validate = (value) => isEmail(value) || message;
    return this;
  }

  minLength(value, message) {
    this.minLength = { value, message };
    return this;
  }

  maxLength(value, message) {
    this.maxLength = { value, message };
    return this;
  }
}

const FormRules = () => new FormInputRules();

export default FormRules;
