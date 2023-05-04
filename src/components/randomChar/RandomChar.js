import React, {useEffect, useState} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';
import useMarvelService from "../../services/MarvelService";

const RandomChar = () => {
  const [char, setChar] = useState(null);

  const {loading, error, clearError, getCharacter} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
    .then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <div className="try__it" onClick={updateChar}>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
        </div>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  );
}

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki} = char;

  return (
    <div className="randomchar__block">
      {
        thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
          ? <img src={thumbnail}
                 style={{objectFit: 'contain'}}
                 alt="Random character" className="randomchar__img"/>
          : <img src={thumbnail}
                 style={{objectFit: 'cover'}}
                 alt="Random character" className="randomchar__img"/>
      }

      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
