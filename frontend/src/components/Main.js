import React from "react";
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({cards, onAddPlace, onCardClick, onEditAvatar, onEditProfile, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile root__profile">
        <img src={currentUser.avatar} alt={currentUser.about} className="profile__avatar" />
        <button className="profile__avatar-btn" onClick={onEditAvatar} type="button"></button>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-btn main-link" onClick={onEditProfile} type="button"></button>
          </div>
          <p className="profile__sub-title">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn main-link" onClick={onAddPlace} type="button"></button>
      </section>
      <section className="root__elements-wrapper">
        <ul className="elements root__elements">
          {cards.map((card) => (
            <li className="element" key={card._id}>
              <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Main; 