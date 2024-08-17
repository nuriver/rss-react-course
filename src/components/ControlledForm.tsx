import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormData, FormDataWithConvertedImage } from '../types/interfaces';
import { selectCountries } from '../features/countrySlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addData } from '../features/formDataSlice';
import convertToBase64 from '../utilities/convertToBase64';
import { Link, useNavigate } from 'react-router-dom';
import schema from '../yup/schema';

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: 'onChange' });
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const file = data.image[0];
    const imageBase64 = (await convertToBase64(file)) as string;

    const formDataWithBase64: FormDataWithConvertedImage = {
      ...data,
      image: imageBase64,
    };
    dispatch(addData(formDataWithBase64));
    reset();
    navigate('/main');
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
              <label htmlFor="email" className="label">
                Email
              </label>
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            <input type="email" id="email" {...register('email')} />
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
            <datalist id="country-list">
              {countries.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
            <input
              type="text"
              list="country-list"
              id="country"
              autoComplete="off"
              {...register('country')}
            />
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
      <Link className="button button-bright header-link" to={'/main'}>
        MAIN
      </Link>
    </div>
  );
}
