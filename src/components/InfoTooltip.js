import React from "react";
import { useNavigate } from "react-router-dom";

export function InfoTooltip(props) {
  const navigate = useNavigate();

  const onClose = () => {
    props.onClose();
    if (props.isSuccess) {
      navigate("/sign-in", { replace: true });
    }
  };

  return (
    <div
      className={`popup popup_type_info-tools ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <div className="popup__form">
          <img
            className="popup__picture-info"
            src={props.imgInfoTools}
            alt="Иллюстрация - действие прошло успешно или нет"
          />
          <h3 className="popup__title popup__title_info-tools">
            {props.textInfoTools}
          </h3>
          <button
            className="popup__close-button"
            onClick={onClose}
            type="button"
            aria-label="Закрыть"
          />
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
