import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import decoration from "../resources/img/vision.png";
import {useState} from "react";
import CharSearchForm from "../components/CharSearchForm/CharSearchForm";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  }

  return (
    <>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <div>
            <CharInfo charId={selectedChar}/>
            <CharSearchForm />
          </div>
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  );
};

export default MainPage;

