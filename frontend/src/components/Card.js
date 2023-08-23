import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `element__icon${
    isLiked ? ' element__icon_active' : ''
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <>
      <img
        className='element__img'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className='element__trash main-link'
          type='button'
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className='element__block'>
        <h2 className='element__title'>{card.name}</h2>
        <div className='element__icon-wrapper'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <span className='element__icon-count'>{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
