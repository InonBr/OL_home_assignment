import { Modal } from 'react-bootstrap';
import RegisterForm from './RegisterForm';

const ModalComponent = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.closeFunc}>
      <Modal.Header closeButton>
        <Modal.Title>Wlecome friend!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <RegisterForm closeModal={props.closeFunc} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
