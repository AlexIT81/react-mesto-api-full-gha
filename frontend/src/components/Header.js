import { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";
import SignUpHeaderButton from "./menu/SignUpHeaderButton";
import SignInHeaderButton from "./menu/SignInHeaderButton";
import MenuBasic from "./menu/MenuBasic";
import MenuBurger from "./menu/MenuBurger";

function Header({ userEmail, onSignOut }) {
  const [isBurgerClicked, setisBurgerClicked] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);

  const updateSize = () => setWindowSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener('resize', updateSize)
    };
  }, []);

  useEffect(() => {
    if (windowSize < 618) {
      setIsBurgerMenuActive(true);
    } else {
      setIsBurgerMenuActive(false);
    }
  }, [windowSize])

  const handleBurgerMenuClick = () => {
    setisBurgerClicked(!isBurgerClicked);
  };

  const handleExitClick = () => {
    onSignOut();
  };

  return (
    <>
      <nav className={`burger ${isBurgerClicked ? "burger_active" : ""}`}>
        <ul className='burger__menu'>
          <li>{userEmail}</li>
          <li>
            <button
              type='button'
              className='burger__btn main-link'
              onClick={() => {
                handleBurgerMenuClick();
                onSignOut();
              }}
            >
              Выйти
            </button>
          </li>
        </ul>
      </nav>
      <header className='header root__header'>
        <Link className='main-link' to='/' title='Проект - Место'>
          <img src={logo} alt='Проект - Место.' className='header__logo' />
        </Link>
        <nav>
          <ul className='header__menu'>
            <Routes>
              <Route path='/sign-in' element={<SignInHeaderButton />} />
              <Route path='/sign-up' element={<SignUpHeaderButton />} />
              <Route
                path='/'
                element={
                  isBurgerMenuActive ? (
                    <MenuBurger
                      isBurgerClicked={isBurgerClicked}
                      onBurgerMenuClick={handleBurgerMenuClick}
                    />
                  ) : (
                    <MenuBasic
                      userEmail={userEmail}
                      onExitClick={handleExitClick}
                    />
                  )
                }
              />
            </Routes>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
