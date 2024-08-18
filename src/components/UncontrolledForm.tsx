import { FormDataWithConvertedImage, Gender } from '../types/interfaces';
import { selectCountries } from '../features/countrySlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addData } from '../features/formDataSlice';
import convertToBase64 from '../utilities/convertToBase64';
import { Link, useNavigate } from 'react-router-dom';
import { FormEventHandler, useRef } from 'react';
import * as yup from 'yup';
import schemaForUncForm from '../yup/shemaForUncForm';

export default function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const tncSpaceSaver = useRef<HTMLParagraphElement>(null);
  const nameError = useRef<HTMLParagraphElement>(null);
  const ageError = useRef<HTMLParagraphElement>(null);
  const emailError = useRef<HTMLParagraphElement>(null);
  const passwordError = useRef<HTMLParagraphElement>(null);
  const confirmPasswordError = useRef<HTMLParagraphElement>(null);
  const genderError = useRef<HTMLParagraphElement>(null);
  const countryError = useRef<HTMLParagraphElement>(null);
  const imageError = useRef<HTMLParagraphElement>(null);
  const tncError = useRef<HTMLParagraphElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data = new FormData(target);

    tncSpaceSaver.current?.classList.remove('space-saver-hidden');

    if (nameError.current) nameError.current.textContent = '';
    if (ageError.current) ageError.current.textContent = '';
    if (emailError.current) emailError.current.textContent = '';
    if (passwordError.current) passwordError.current.textContent = '';
    if (confirmPasswordError.current)
      confirmPasswordError.current.textContent = '';
    if (genderError.current) genderError.current.textContent = '';
    if (countryError.current) countryError.current.textContent = '';
    if (imageError.current) imageError.current.textContent = '';
    if (tncError.current) tncError.current.textContent = '';

    const formData = {
      name: data.get('name'),
      password: data.get('password'),
      age: data.get('age'),
      email: data.get('email'),
      confirmPassword: data.get('confirmPassword'),
      gender: data.get('gender'),
      country: data.get('country'),
      image: data.get('image'),
      tnc: data.get('tnc'),
    };

    try {
      await schemaForUncForm.validate(formData, { abortEarly: false });
      const dataImage = formData.image as File;
      const imageBase64 = (await convertToBase64(dataImage)) as string;

      const formDataForRedux: FormDataWithConvertedImage = {
        name: formData.name as string,
        password: formData.password as string,
        age: formData.age as string,
        email: formData.email as string,
        confirmPassword: formData.confirmPassword as string,
        gender: formData.gender as Gender,
        country: formData.country as string,
        image: imageBase64 as string,
      };

      dispatch(addData(formDataForRedux));
      formRef.current?.reset();
      navigate('/main');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path === 'name' && nameError.current) {
            nameError.current.textContent = error.message;
          }
          if (error.path === 'age' && ageError.current) {
            ageError.current.textContent = error.message;
          }
          if (error.path === 'email' && emailError.current) {
            emailError.current.textContent = error.message;
          }
          if (error.path === 'password' && passwordError.current) {
            passwordError.current.textContent = error.message;
          }
          if (
            error.path === 'confirmPassword' &&
            confirmPasswordError.current
          ) {
            confirmPasswordError.current.textContent = error.message;
          }
          if (error.path === 'gender' && genderError.current) {
            genderError.current.textContent = error.message;
          }
          if (error.path === 'country' && countryError.current) {
            countryError.current.textContent = error.message;
          }
          if (error.path === 'image' && imageError.current) {
            imageError.current.textContent = error.message;
          }
          if (error.path === 'tnc' && tncError.current) {
            tncError.current.textContent = error.message;
            tncSpaceSaver.current?.classList.add('space-saver-hidden');
          }
        });
      }
    }
  };

  return (
    <div className="uncontrolled-form-wrapper">
      <div className="form-container">
        <header className="form-header">USER REGISTRATION</header>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="name" className="label">
                Name
              </label>
              <p className="error-message" ref={nameError}></p>
            </div>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="age" className="label">
                Age
              </label>
              <p className="error-message" ref={ageError}></p>
            </div>
            <input type="number" id="age" name="age" />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="email" className="label">
                Email
              </label>
              <p className="error-message" ref={emailError}></p>
            </div>
            <input type="text" id="email" name="email" />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="password" className="label">
                Password
              </label>
              <p className="error-message" ref={passwordError}></p>
            </div>
            <input type="text" id="password" name="password" />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <p className="error-message" ref={confirmPasswordError}></p>
            </div>
            <input type="text" id="confirmPassword" name="confirmPassword" />
          </div>
          <div className="form-elements-wrapper">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p className="error-message" ref={genderError}></p>
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="country" className="label">
                Country
              </label>
              <p className="error-message" ref={countryError}></p>
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
              name="country"
              autoComplete="off"
            />
          </div>
          <div className="form-elements-wrapper">
            <div className="label-wrapper">
              <label htmlFor="image" className="label">
                Upload picture
              </label>
              <p className="error-message" ref={imageError}></p>
            </div>
            <input type="file" id="image" name="image" />
          </div>
          <p className="error-message tnc-error" ref={tncError}></p>
          <p className="error-message space-saver" ref={tncSpaceSaver}>
            text for saving space
          </p>

          <div className="form-elements-wrapper tnc-wrapper">
            <input
              type="checkbox"
              id="tnc"
              name="tnc"
              className="tnc-checkbox"
            />
            <label htmlFor="tnc" className="label">
              I agree to the Terms and Conditions
            </label>
          </div>
          <button className="button button-bright" type="submit">
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
