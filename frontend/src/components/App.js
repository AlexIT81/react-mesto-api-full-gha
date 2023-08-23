import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardConfirmPopup from "./DeleteCardConfirmPopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import * as auth from "../utils/Auth.js";
import iconSuccess from "../images/alert-yes.svg";
import iconNotSuccess from "../images/alert-no.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setisInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({
    message: "",
    icon: ""
  });
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    name: "",
  });
  const [isSelectedCardPopupOpen, setIsSelectedCardPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] =
    useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] =
    useState(false);
  const [isDeleteCardPopupLoading, setIsDeleteCardPopupLoading] =
    useState(false);
  const [deleteCardConfirm, setDeleteCardConfirm] = useState({});
  const [isDeleteCardConfirmPopupOpen, setIsDeleteCardConfirmPopupOpen] =
    useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getServerData()
      .then((res) => {
        const [initialCards, userData] = res;
        setCurrentUser(userData.data);
        setCards(initialCards.data);
      })
      .catch((err) => console.error(err));
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleInfoTooltip(message, icon) {
    setisInfoTooltipPopupOpen(true);
    setInfoTooltipData({ message, icon });
  }

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name });
    setIsSelectedCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ link: "", name: "" });
    setIsSelectedCardPopupOpen(false);
    setIsDeleteCardConfirmPopupOpen(false);
    setisInfoTooltipPopupOpen(false);
    setInfoTooltipData({ message: "", icon: "" });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsEditProfilePopupLoading(true);
    api
      .setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData.data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsEditProfilePopupLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsEditAvatarPopupLoading(true);
    api
      .setAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData.data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsEditAvatarPopupLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsAddPlacePopupLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsAddPlacePopupLoading(false));
  }

  function handleCardDelete() {
    setIsDeleteCardPopupLoading(true);
    api
      .deleteCard(deleteCardConfirm.card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter(
            (item) => item._id !== deleteCardConfirm.card._id
          );
        });
        closeAllPopups();
        setDeleteCardConfirm({});
      })
      .catch((err) => console.error(err))
      .finally(() => setIsDeleteCardPopupLoading(false));
  }

  function handleCardDeleteConfirmClick(card) {
    setDeleteCardConfirm({ card });
    setIsDeleteCardConfirmPopupOpen(true);
  }

  /** авторизация  */
  const checkToken = (token) => {
    return auth
      .checkAuth(token)
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn]);

  /** регистрация пользователя */
  const onRegister = ({ password, email }) => {
    return auth
      .register(password, email)
      .then((res) => {
        if (!res || res.error) {
          handleInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.", iconNotSuccess);
        } else {
          handleInfoTooltip("Вы успешно зарегистрировались!", iconSuccess);
          navigate("/sign-in", { replace: true });
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        handleInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.", iconNotSuccess);
      });
  };

  /** Логинемся */
  const onLogin = ({ password, email }) => {
    return auth
      .login(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setUserEmail(email);
        } else {
          console.error(res.message);
        }
        return res;
      })
      .catch((err) => console.error(err));
  };

  /** Выход пользователя */
  const onSignOut = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  return (
    <div className='page'>
      <div className='root page__root'>
        <CurrentUserContext.Provider value={currentUser}>
          <Header userEmail={userEmail} onSignOut={onSignOut} />
          <main className='root__main'>
            <Routes>
              <Route
                path='/'
                element={
                  <ProtectedRouteElement
                    element={Main}
                    loggedIn={loggedIn}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteConfirmClick}
                  />
                }
              />
              <Route
                path='/sign-up'
                element={<Register onRegister={onRegister} />}
              />
              <Route path='/sign-in' element={<Login onLogin={onLogin} />} />
              <Route
                path='*'
                element={
                  loggedIn ? (
                    <Navigate to='/' replace />
                  ) : (
                    <Navigate to='/sign-in' replace />
                  )
                }
              />
            </Routes>
          </main>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isEditProfilePopupLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isAddPlacePopupLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isEditAvatarPopupLoading}
          />
          <DeleteCardConfirmPopup
            isOpen={isDeleteCardConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isLoading={isDeleteCardPopupLoading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            message={infoTooltipData.message}
            icon={infoTooltipData.icon}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isSelectedCardPopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
