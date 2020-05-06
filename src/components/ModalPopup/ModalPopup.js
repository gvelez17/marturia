import React from 'react'
import Popup from 'reactjs-popup'
import { connect } from 'react-redux'
import { closeModal } from '../../actions/modalPopup';

  const mapStateToProps = state => {
  return {
  modal: state.modal
}}

function ModalPopup({modal, dispatch}) {

  const popupStyle = {
    content: {
      position: "relative",
      background: "rgb(255, 255, 255)",
      width: "400px",
      margin: "auto",
      border: "10px solid #25646a",
      fontSize: "1.5rem",
      fontWeight: "1.5rem",
      padding: "5px",
      borderRadius: "4px",
      height: "200px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }
  const close = () => {
      return dispatch(closeModal());
  }


  return (
    <Popup
        contentStyle={popupStyle.content}
	      open={modal.isOpen}
	      onClose={() => {close()}}>
          <div className='popup'>
  <p className='close-button' onClick={() => close()}>
    &times;
  </p>
<p className="popup-message">{modal.message}</p>
</div>
    </Popup>
  )
}

export default connect(mapStateToProps)(ModalPopup);

