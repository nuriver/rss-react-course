import * as yup from 'yup';

const schemaForUncForm = yup.object().shape({
  name: yup
    .string()
    .matches(/^[\p{Lu}]/u, 'Name should start with a capital letter')
    .required('Name is a required field'),
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
    .test('is-valid-email', 'Invalid email address', (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '')
    )
    .required('Email is a required field'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Invalid gender selection')
    .required('Gender is required'),
  password: yup
    .string()
    .matches(/[0-9]/, 'Password should contain at least 1 number')
    .matches(/[\p{Ll}]/u, 'Password should contain 1 lowercase letter')
    .matches(/[\p{Lu}]/u, 'Password should contain 1 uppercase letter')
    .matches(/[\p{P}\p{S}]/u, 'Password should contain 1 special character')
    .required('Password is a required field'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  country: yup.string().required('Country is a required field'),
  image: yup
    .mixed<File>()
    .required()

    .test('fileType', 'Unsupported File Format', (value) => {
      return (
        (value as File) &&
        ['image/jpeg', 'image/png', 'image/gif'].includes((value as File).type)
      );
    })
    .test('fileSize', 'Max file size is 2MB', (file) => {
      return (file as File) && (file as File).size <= 2000000;
    })
    .test('Required', 'Please upload image', (value) => {
      if ((value as File).size <= 0) return false;
      return true;
    }),
  tnc: yup.string().required('You must accept the Terms and Conditions'),
});

export default schemaForUncForm;
