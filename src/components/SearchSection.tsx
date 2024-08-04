import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchSection({
  theme,
}: {
  theme: string;
}): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchValue = searchParams.get('search') as string;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const input = event.target as HTMLInputElement;
    setValue(input.value);
  };

  const searchClickHandler: FormEventHandler<HTMLFormElement> = (
    event
  ): void => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    router.push(`/?search=${data.search}&page=1`);
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
      <form className="search-wrapper" onSubmit={searchClickHandler}>
        <input
          type="text"
          name="search"
          className="search-input"
          value={value}
          onChange={inputChangeHandler}
        />
        <button className="button search-button" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}
