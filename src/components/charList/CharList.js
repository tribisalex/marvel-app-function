import './charList.scss';
import React, {useEffect, useRef, useState} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
    let [charList, setCharList] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);
    let [newItemLoading, setNewItemLoading] = useState(false);
    let [offset, setOffset] = useState(210);
    let [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
        .getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList((charList) => [...charList, ...newCharList]);
        setLoading((loading) => false);
        setNewItemLoading((newItemLoading) => false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
    };

    const onCharListLoading = () => {
        setNewItemLoading((newItemLoading) => true);
    };

    const onError = () => {
        setError((error) => true);
        setError((loading) => false);
    };

    const liItemRefs = useRef([]);

    const shadowChar = (id) => {
        liItemRefs.current.forEach((item) =>
          item.classList.remove('char__item_selected')
        );
        liItemRefs.current[id].classList.add('char__item_selected');
        liItemRefs.current[id].focus();
    };

    const renderItems = (charList) => {
        return (
          <ul className="char__grid">
              {charList.map((item, i) => {
                  return (
                    <li onClick={() => {
                        props.onCharSelected(item.id);
                        shadowChar(i);
                    }}
                        key={item.id}
                        className="char__item"
                        ref={(el) => (liItemRefs.current[i] = el)}>
                        {
                            item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                              ? <img src={item.thumbnail}
                                     style={{objectFit: 'contain'}}
                                     alt={item.name} className="randomchar__img"/>
                              : <img src={item.thumbnail}
                                     style={{objectFit: 'cover'}}
                                     alt={item.name} className="randomchar__img"/>
                        }
                        <div className="char__name">{item.name}</div>
                    </li>
                  )
              })
              }
          </ul>
        )
    }

    // const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (

      <div className="char__list">
          {errorMessage}
          {spinner}
          {content}
          <button
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{display: charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
          >
              <div className="inner">load more</div>
          </button>
      </div>
    )
}

export default CharList;
