import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ComicsPage, MainPage} from "../../pages";
import SingleComic from "../../pages/SingleComicPage";

const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/comics" element={<ComicsPage/>} />
            <Route path="/comics/comicsId" element={<SingleComic />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;
