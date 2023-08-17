// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import DefaultLayout from './layout/DefaultLayout/DefaultLayout'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import LoginLayout from './layout/LoginLayout/LoginLayout'
import Header from './components/Header/Header'
import Slide from './components/Slide/Slide'
import ShowMovie from './components/ShowMovie/ShowMovie'
import Search from './components/Search/Search'
import FindFilm from './components/FindFilms/FindFilm'
import LayoutProfile from './layout/LayoutProfile/LayoutProfile'
import BookMarked from './components/BookMarked/BookMarked'
import Register from './components/Login/Register'
import Profile from './components/Profile/Profile'
import PlayingMovie from './components/PlayingMovie/PlayingMovie'
import Detail from './components/Detail/Detail'
import RequiredAuth from './components/RequireAuth'
import NotFound from './components/NotFound/NotFound'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={
          <DefaultLayout>
            <Header />
            <Slide />
            <ShowMovie />
          </DefaultLayout>} />
        <Route path="/search" element={<DefaultLayout><Search /></DefaultLayout>} />
        <Route path='/explore' element={<DefaultLayout><FindFilm /></DefaultLayout>} />
        {/* kiem tra xem accessToken ddusng khong thi moi chi di den component do */}
        <Route element={<RequiredAuth />}>
          <Route path='/detail/:id' element={<DefaultLayout>
            <Detail />
          </DefaultLayout>} />
          <Route path='/bookmarked' element={<LayoutProfile><BookMarked /></LayoutProfile>} />
          <Route path='/profile' element={<LayoutProfile><Profile/></LayoutProfile>} />
          <Route path='/playing-movie/:id' element={<DefaultLayout><PlayingMovie /></DefaultLayout>} />
        </Route>
        <Route path='/login' element={<LoginLayout><Login /></LoginLayout>} />
        <Route path='/register' element={<LoginLayout><Register /></LoginLayout>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
