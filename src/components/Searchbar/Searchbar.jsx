import { Component } from 'react';
import { toast } from 'react-toastify';
import {GoSearch} from 'react-icons/go';
import css from './searchbar.module.scss'

export default class Searchbar extends Component {

    state = {
        query: '',
    }

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ query: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { onSubmit } = this.props;

        if (this.state.query.trim() === '') {
            toast.warning('Enter data to continue searching');
            return;
        }   
        
        onSubmit({ ...this.state });
        this.reset();
    }

    reset() {
        this.setState({
            query: '',
        })
    }

    render() {
        const { query } = this.state;
        const { handleSubmit, handleChange } = this;

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
}