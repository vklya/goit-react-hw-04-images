import { useState } from 'react';
import { toast } from 'react-toastify';
import {GoSearch} from 'react-icons/go';
import css from './searchbar.module.scss'

export default function Searchbar ({onSubmit}) {
  const [query, setQuery] = useState('');

  const handleChange = ({ target }) => {
    setQuery(target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warning('Enter data to continue searching');
      return;
    }   
    
    onSubmit({query});
    setQuery('');
  }

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={css.button}>
          <GoSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
};
