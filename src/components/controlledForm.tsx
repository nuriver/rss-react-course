import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormData {
  name: string;
  password: string;
  age: number;
  confirmPassword: string;
  gender: 'male' | 'female';
  country: string;
  image: FileList;
  tnc: boolean;
}

export default function ControlledForm() {
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
        console.log(value);
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const formValues = watch();

  const isFormFilled = () => {
    return (
      formValues.name &&
      formValues.age &&
      formValues.gender &&
      formValues.password &&
      formValues.confirmPassword &&
      formValues.country &&
      formValues.image &&
      formValues.image.length > 0 &&
      formValues.tnc
    );
  };

  return (
    <div className="controlled-form-wrapper">
      <div className="form-container">
        <header className="form-header">USER REGISTRATION</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="name" className="label">
                Name
              </label>
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>
            <input type="text" id="name" {...register('name')} />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="age" className="label">
                Age
              </label>
              {errors.age && (
                <p className="error-message">{errors.age.message}</p>
              )}
            </div>
            <input type="number" id="age" {...register('age')} />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="password" className="label">
                Password
              </label>
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>
            <input type="text" id="password" {...register('password')} />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <input
              type="text"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
          </div>
          <div className="form-elements-wrapper">
            <label htmlFor="gender">Gender</label>
            <select id="gender" {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="country" className="label">
                Country
              </label>
              {errors.country && (
                <p className="error-message">{errors.country.message}</p>
              )}
            </div>
            <input type="text" id="country" {...register('country')} />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="image" className="label">
                Upload picture
              </label>
              {errors.image && (
                <p className="error-message">{errors.image.message}</p>
              )}
            </div>
            <input type="file" id="image" {...register('image')} />
          </div>
          <div className="form-elements-wrapper tnc-wrapper">
            <input
              type="checkbox"
              id="tnc"
              className="tnc-checkbox"
              {...register('tnc')}
            />
            <label htmlFor="tnc" className="label">
              I agree to the Terms and Conditions
            </label>
          </div>
          <button
            className="button button-bright"
            type="submit"
            disabled={!isFormFilled()}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
