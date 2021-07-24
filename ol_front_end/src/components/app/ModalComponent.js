import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import RegisterForm from './RegisterForm';
import LoginFrom from './LogInForm';

const ModalComponent = (props) => {
  const [headMessage, setHeadMessage] = useState('');

  useEffect(() => {
    headText();
  });
  const headText = () => {
    if (props.modalForm === 'login') {
      setHeadMessage('Wlecome back!');
    } else {
      setHeadMessage('Wlecome friend!');
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.closeFunc}>
      <Modal.Header closeButton>
        <Modal.Title>{headMessage}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.modalForm === 'register' && (
          <RegisterForm closeModal={props.closeFunc} />
        )}

        {props.modalForm === 'login' && (
          <LoginFrom closeModal={props.closeFunc} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
