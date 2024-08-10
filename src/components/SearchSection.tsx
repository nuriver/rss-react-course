import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';

export default function SearchSection({
  theme,
}: {
  theme: string;
}): JSX.Element {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search') as string;

  const searchClickHandler: FormEventHandler<HTMLFormElement> = (
    event
  ): void => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    navigate(`/?search=${data.search}&page=1`);
  };

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target as HTMLInputElement;
    setValue(input.value);
  };

  return (
    <div
      className={
        theme === 'light'
          ? 'search-section'
          : 'search-section search-section-dark'
      }
      role="search"
    >
      <form onSubmit={searchClickHandler} className="search-wrapper">
        <input
          name="search"
          type="text"
          className="search-input"
          onChange={inputChangeHandler}
          value={value}
        />
        <button className="button search-button" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}
