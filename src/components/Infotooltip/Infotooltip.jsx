import './Infotooltip.css';

const Infotooltip = ({ errorMessage, status, onClose}) => {
    return (
      <section className={` popup ${status ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__status">{errorMessage}</h2>
          <button className="popup__close" type="button" onClick={onClose} />
        </div>
      </section>
    );
  };
  
  export default Infotooltip;