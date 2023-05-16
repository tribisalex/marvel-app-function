import React, {useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import './charSearchForm.scss';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const {loading, error, getCharacterByName, clearError} = useMarvelService();

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));

    reset();
  }

  //текст для посещения страницы: There is! Visit {char[0].name} page?
  //текст ошибки: The character was not found. Check the name and try again

  return (
    <div className="char__search-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          <div style={{color: 'red'}}>
            <input placeholder="Enter name"
                   {...register('nameChar', {
                     required: 'Обязательное поле!',
                   })}
            />
            <div className="error" style={{marginTop: '10px'}}>
              {errors.nameChar && <span>{errors.nameChar.message}</span>}
            </div>
            <div className="textMessage">
              There is! Visit  page?
              <Link to={`/comics/${itemId0}`}>
                <button>Visit char</button>
              </Link>
            </div>
          </div>
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
