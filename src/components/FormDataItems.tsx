import { selectFormData } from '../features/formDataSlice';
import { useAppSelector } from '../store/store';

export default function FormDataItems() {
  const formData = useAppSelector(selectFormData);

  if (formData.length < 1) {
    return null;
  }

  const formDataItems = formData.map((data, index) => {
    return (
      <div className="data-item-container" key={index}>
        {index === formData.length - 1 && (
          <p className="new-item-indicator">New item</p>
        )}
        <p className="data-item">
          <span>Name: </span>
          {data.name}
        </p>
        <p className="data-item">
          <span>Age: </span>
          {data.age}
        </p>
        <p className="data-item">
          <span>Gender: </span>
          {data.gender}
        </p>
        <p className="data-item">
          <span>Email: </span>
          {data.email}
        </p>
        <p className="data-item">
          <span>Country: </span>
          {data.country}
        </p>
        <p className="data-item">
          <span>Password: </span>
          {data.password}
        </p>
        <div className="data-image-wrapper">
          <img className="data-image" src={data.image} alt="Uploaded image" />
        </div>
      </div>
    );
  });

  return <div className="data-items-wrapper">{formDataItems}</div>;
}
