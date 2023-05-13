import './comicsList.scss';
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

const ComicsList = (props) => {
    let [comicsList, setComicsList] = useState([]);
    let [newItemLoading, setNewItemLoading] = useState(false);
    let [offset, setOffset] = useState(210);
    let [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        clearError();
        getAllComics(offset)
        .then(onCharListLoaded);
    }

    const onCharListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 9) {
            ended = true;
        }
        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemLoading((newItemLoading) => false);
        setOffset((offset) => offset + 9);
        setComicsEnded((comicsEnded) => ended);
    };

    const renderItems = (comicsList) => {
        const items = comicsList.map((item, i) => {
            return (
              <li className="comics__item" key={i}>
                  <Link to={`/comics/${item.id}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="comics__item-img"
                      />
                      <div className="comics__item-name">{item.title}</div>
                      <div className="comics__item-price">{item.price}</div>
                  </Link>
              </li>
            )
        });
        return <ul className="comics__grid">{items}</ul>
    };

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) || !loading && comicsList ? items : null;

    return (
      <div className="comics__list">
          {errorMessage}
          {spinner}
          {content}
          <button
            className="button button__main button__long"
            // disabled={newItemLoading}
            // style={{display: comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
          >
              <div className="inner">load more</div>
          </button>
      </div>
    )
}

export default ComicsList;
