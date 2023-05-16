import { useState } from 'react';

import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  //текст для посещения страницы: There is! Visit {char[0].name} page?
  //текст ошибки: The character was not found. Check the name and try again

  return (
    <div className="char__search-form">
      <form>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          {/* input должен быть required */}
          <input placeholder="Enter name" />
          <div className="error"></div>
          <button
            type="submit"
            className="button button__main"
            disabled={loading}
          >
            <div className="inner">find</div>
          </button>
        </div>
        <div className="char__search-error"></div>
      </form>
    </div>
  );
};

export default CharSearchForm;
