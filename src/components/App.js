import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/Api.js";
import * as Auth from "../utils/Auth.js";

import unionBad from "../images/Union-bad.jpg";
import unionGood from "../images/Union-good.jpg";

function App() {
  // Стейт для попапа редактирования профиля. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  // Для попапа добавления карточки. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  // Стейт для попапа изменения аватала. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  // Стейт для попапа отрытия картинки. Хук, управляющий внутренним состоянием. закрыто/открытo
  const [selectedCard, setSelectedCard] = React.useState({});
  // Стейт отвечает за текущего пользователя
  const [currentUser, setСurrentUser] = React.useState({ name: "", about: "" });
  // cтейт массива карточек
  const [cards, setCards] = React.useState([]);
  // идет загрузка
  const [isLoading, setIsLoading] = React.useState(false);
  // статус пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = React.useState(false);
  // email который отображать в шапке профиля
  const [email, setEmail] = React.useState("");
  // Стейт для попапа информирования об успешной или неуспешной регистрации
  const [isInfoToolsPopupOpen, setInfoToolsPopupOpen] = React.useState(false);
  // Текст в попапе информирования об успешной или неуспешной регистрации
  const [textInfoTools, setTextInfoTools] = React.useState("");
  // Картинка в попапе информирования об успешной или неуспешной регистрации
  const [imgInfoTools, setImgInfoTools] = React.useState({ unionGood });
  // Успешная или неуспешная регистрация
  const [isSuccess, setIsSuccess] = React.useState(false);

  const navigate = useNavigate();

  // эффект при монтировании
  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    // если у пользователя есть токен в localStorage, эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const jwt = localStorage.getItem("jwt");
      // здесь будем проверять токен
      Auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);

            // авторизуем пользователя
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.error(err));
    }
  }

  function handleLogin(e) {
    setLoggedIn(true);
  }

  function register(password, email) {
    Auth.register(password, email)
      .then((res) => {
        setInfoToolsPopupOpen(true);
        setImgInfoTools(unionGood);
        setTextInfoTools("Вы успешно зарегистрировались!");
        setIsSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setInfoToolsPopupOpen(true);
        setImgInfoTools(unionBad);
        setTextInfoTools("Что-то пошло не так! Попробуйте ещё раз.");
        setIsSuccess(false);
      });
  }

  function authorize(email, password) {
    Auth.authorize(email, password)
      .then((data) => {
        if (data) {
          handleLogin();
          navigate("/", { replace: true });
          setEmail(email);
        }
      })
      .catch((err) => {
        console.error(err);
        setInfoToolsPopupOpen(true);
        setImgInfoTools(unionBad);
        setTextInfoTools("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  // эффект при монтировании, который вызывает загрузку данных и карточек пользователя с сервера после авторизации и обновляет стейт-переменные.
  React.useEffect(() => {
    if (loggedIn) {
      // загрузка данных пользователя с сервера и обновляет стейт-переменную из полученного значения.
      api
        .getUserInfo()
        .then((jsonUser) => {
          setСurrentUser(jsonUser);
        })
        .catch((err) => {
          console.error(err);
        });
      // загрузка карточек с сервера и обновляет стейт-переменную из полученного значения.
      api
        .getInitialCards()
        .then((jsonCard) => {
          setCards(jsonCard);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  // изменение стейт переменных для открытия попапа
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Закрытие попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoToolsPopupOpen(false);
  }

  // зарос к api на изменение данных профиля
  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .sendUserInfo(name, about)
      .then((json) => {
        setСurrentUser(json);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // зарос к api на изменение аватара
  function handleUpdateAvatar({ linkAvatar }) {
    setIsLoading(true);
    api
      .changeAvatar(linkAvatar)
      .then((json) => {
        setСurrentUser(json);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // лайк карточки. постановка и снятие. зарос к api
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c)),
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c)),
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  // удаление карточки. зарос к api
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.filter(function (item) {
            return item !== card;
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // добавление карточки. запрос к api
  function handleAddPlaceSubmit({ nameImage, linkImage }) {
    setIsLoading(true);
    api
      .sendNewCard(nameImage, linkImage)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                path="/"
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} authorize={authorize} />}
          />
          <Route path="/sign-up" element={<Register register={register} />} />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <PopupWithForm name="warning" title="Вы уверены?" buttonText="Да" />

        <InfoTooltip
          isOpen={isInfoToolsPopupOpen}
          onClose={closeAllPopups}
          textInfoTools={textInfoTools}
          imgInfoTools={imgInfoTools}
          isSuccess={isSuccess}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isInfoToolsPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
