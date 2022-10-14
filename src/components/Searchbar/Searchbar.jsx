import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im'
import css from './Searchbar.module.css'

function Searchbar ({onSubmit}) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = evt => {
    setInputValue(evt.target.value );
};

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === ""){
      return ;
    }
    
    onSubmit(inputValue);   
    e.target.reset();
  }

  return(

    <header className={css.Searchbar}>
    <form className={css.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={css.SearchForm_button}>
      <ImSearch size ={30}/>
      </button>
  
      <input
        className={css.SearchFormInput}
        type="text"
        autoComplete="off"
        // value={inputValue} 
        onChange={handleChange}            
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>

)
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}