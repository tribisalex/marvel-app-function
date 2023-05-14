import './singleComicPage.scss';
import { Link, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvelService from "../services/MarvelService";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";

const SingleComic = () => {
  const { comicsId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicsId]);

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const updateComic = () => {
    clearError();
    getComics(comicsId).then(onComicLoaded);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

  return (
    <div className="char__info">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({comic}) => {
  const {title, description, pageCount, thumbnail, language, price} = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <Link to={'/comics'} className="single-comic__back">Back to all</Link>
    </div>
  )
}

export default SingleComic;
