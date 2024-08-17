import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[\p{Lu}]/u, 'Name should start with a capital letter'),
  age: yup
    .number()
    .min(0, 'Age cannot be negative')
    .max(120, 'Age cannot be more then 120')
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? null : value
    )
    .nullable()
    .required('Age is a required field'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is a required field')
    .test('is-valid-email', 'Invalid email address', (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '')
    ),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender selection')
    .required('Gender is required'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(/[0-9]/, 'Password should contain at least 1 number')
    .matches(/[\p{Ll}]/u, 'Password should contain 1 lowercase letter')
    .matches(/[\p{Lu}]/u, 'Password should contain 1 uppercase letter')
    .matches(/[\p{P}\p{S}]/u, 'Password should contain 1 special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  country: yup.string().required('Country is a required field'),
  image: yup
    .mixed<FileList>()
    .required()
    .test('Required', 'Please upload image', (value) => {
      if ((value as FileList).length < 1) return false;
      return true;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return (
        (value as FileList)[0] &&
        ['image/jpeg', 'image/png', 'image/gif'].includes(
          (value as FileList)[0].type
        )
      );
    })
    .test('fileSize', 'Max file size is 2MB', (file) => {
      return (file as FileList)[0] && (file as FileList)[0].size <= 2000000;
    }),
  tnc: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions'),
});

export default schema;
