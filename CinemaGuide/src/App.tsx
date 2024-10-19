import { FC, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header';
import { MainPage } from './components/main/main_page/MainPage';
import { Footer } from './components/footer/Footer';
import { GenresPage } from './components/main/genre_page/GenresPage';
import { FilmPage } from './components/main/film_page/FilmPage';
import { GenreFilmsPage } from './components/main/genre_page/GenreFilmsPage';
import { Loading } from './components/general/Loading';
import { ModalPage } from './components/main/modal/ModalPage';
import { getAuthorisedUser } from './api/auth';
import { Movie, User } from './api/types';
import { AccountPage } from './components/main/account_page/AccountPage';
import { TrailerPage } from './components/main/modal/TrailerPage';
import './App.css';
import "./media.css";
import { ScrollToTop } from './components/general/ScrollToTop';
import { SearchPage } from './components/main/modal/SearchPage';

const App: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [trailerIsOpen, setTrailerIsOpen] = useState<boolean>(false);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const [film, setFilm] = useState<Movie>();
  const [user, setUser] = useState<User>();

  const getUserData = async (): Promise<void> => {
    const data = await getAuthorisedUser();
    setUser(data);
  }

  const handleSearchOpen = () => {
    setSearchIsOpen(true);
  }

  const handleSearchClose = () => {
    setSearchIsOpen(false);
  }


  const handleTrailerOpen = (film: Movie) => {
    setTrailerIsOpen(true);
    setFilm(film);
  }

  const handleTrailerClose = () => {
    setTrailerIsOpen(false);
  }

  const handleModalClose = () => {
    setModalIsOpen(false);
  }

  const handleModalOpen = () => {
    setModalIsOpen(true);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <BrowserRouter>
      <div className="general-container">
        <ScrollToTop />
        <ModalPage isOpen={modalIsOpen} onClose={handleModalClose} refetchUser={getUserData} />
        <TrailerPage isOpen={trailerIsOpen} film={film!} onClose={handleTrailerClose} />
        <SearchPage isOpen={searchIsOpen} onClose={handleSearchClose} />

        <div className="header">
          <Header onModalOpen={handleModalOpen} onSearchOpen={handleSearchOpen} user={user} />
        </div>

        <div className="main">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<MainPage user={user} onModalOpen={handleModalOpen} onTrailerOpen={handleTrailerOpen} onRefetchUser={getUserData} />}/>
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/genres/:genre" element={<GenreFilmsPage />} />
              <Route path="/films/:filmId" element={<FilmPage user={user} onModalOpen={handleModalOpen} onTrailerOpen={handleTrailerOpen} onRefetchUser={getUserData} />}/>
              <Route path="/account/:pageType" element={<AccountPage user={user!} refetchUser={getUserData}/>} />
            </Routes>
          </Suspense>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
