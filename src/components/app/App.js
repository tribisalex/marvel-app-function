import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Spinner from "../spinner/Spinner";
import {lazy, Suspense} from "react";

const Page404 = lazy(() => import('../../pages/Page404'))
const MainPage = lazy(() => import('../../pages/MainPage'))
const ComicsPage = lazy(() => import('../../pages/ComicsPage'))
const SingleComic = lazy(() => import('../../pages/SingleComicPage'))
const SingleChar = lazy(() => import('../../pages/SingleCharPage'))

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/comics" element={<ComicsPage/>}/>
              <Route path="/comics/:comicsId" element={<SingleComic/>}/>
              <Route path="/char/:charId" element={<SingleChar/>}/>
              <Route path='*' element={<Page404/>}/>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App;
