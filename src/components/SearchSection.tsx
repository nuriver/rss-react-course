import { FormEventHandler, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '../context/ThemeContext';

export default function SearchSection({
  search,
}: {
  search: string;
}): JSX.Element {
  const router = useRouter();
  const theme = useContext(ThemeContext);

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
        theme !== 'dark'
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
          defaultValue={search}
        />
        <button className="button search-button" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
}
