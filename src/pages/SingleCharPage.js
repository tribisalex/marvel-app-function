import './singlePage.scss';
import { Link, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import useMarvelService from "../services/MarvelService";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";
import withSingle from "../components/HOC/withSinglePage";
//
//
//
// const SingleChar = (props) => {
//
//   const errorMessage = props.error ? <ErrorMessage/> : null;
//   const spinner = props.loading ? <Spinner/> : null;
//   const content = !(props.loading || props.error || !props.item) ? <View item={props.item}/> : null;
//
//  return (
//     <div className="char__info">
//       {errorMessage}
//       {spinner}
//       {content}
//     </div>
//   );
// }
//
// const View = ({ char }) => {
//   const { name, description, thumbnail } = char;
//
//   return (
//     <div className="single-char">
//       <img src={ thumbnail } alt={ name } className="single-char__img"/>
//       <div className="single-char__info">
//         <h2 className="single-char__name">{ name }</h2>
//         <p className="single-char__descr">{ description }</p>
//       </div>
//       <Link to={'/'} className="single-char__back">Back to main page</Link>
//     </div>
//   )
// }
//
// const SingleCharWithSinglePage = withSingle(SingleChar, 'getCharacter');






const SingleChar = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;

  return (
    <div className="char__info">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail } = char;

  return (
    <div className="single-char">
      <img src={ thumbnail } alt={ name } className="single-char__img"/>
      <div className="single-char__info">
        <h2 className="single-char__name">{ name }</h2>
        <p className="single-char__descr">{ description }</p>
      </div>
      <Link to={'/'} className="single-char__back">Back to main page</Link>
    </div>
  )
}

export default SingleChar;
