import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ComicsPage, MainPage} from "../../pages";
import SingleComic from "../../pages/SingleComicPage";
import Page404 from "../../pages/Page404";

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/comics" element={<ComicsPage/>} />
            <Route path="/comics/:comicsId" element={<SingleComic />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
