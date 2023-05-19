import React, {useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import './charSearchForm.scss';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const {loading, error, getCharactersByName, clearError} = useMarvelService();

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onCharLoaded = (char) => {
    setChar(char);
    console.log(char);
  };

  const onSubmit = (data) => {
    clearError();
    getChar(data.nameChar);
    reset();
  }

  const getChar = (name) => {
    clearError();
    getCharactersByName(name).then(onCharLoaded);
  }

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

          </div>
          <button
            type="submit"
            className="button button__main"
            disabled={loading}
          >
            <div className="inner">find</div>
          </button>
        </div>

        {
          char && char.length !== 0 &&
          <div className="char__search-error">
            <span style={{ marginRight: '10px'}}>There is! Visit {char[0].name} page?</span>
            <Link to={`/char/${char[0].id}`}>
              <button className="button button__main">
                <div className="inner">Visit char</div>
              </button>
            </Link>
          </div>
        }
        {
          char && char.length === 0 &&
          <div className="char__search-error">
            The character was not found. Check the name and try again
          </div>
        }
      </form>
    </div>
  );
};

export default CharSearchForm;
