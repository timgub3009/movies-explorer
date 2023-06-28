import './Infotooltip.css';

const Infotooltip = ({ popupMessage, status, onClose}) => {
    return (
      <section className={` popup ${status ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <h2 className="popup__status">{popupMessage}</h2>
          <button className="popup__close" type="button" onClick={onClose} />
        </div>
      </section>
    );
  };
  
  export default Infotooltip;