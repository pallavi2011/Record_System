import React, {useState} from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ModalConfirmDelete = ({server, socket, handleUserDeleted, buttonColor, buttonTriggerTitle, user, headerTitle}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = e => setModalOpen(true);
    const handleClose = e => setModalOpen(false);
  
    const handleSubmit = (e) => {
  
      let params = e.target.getAttribute('data-userID');
  
      axios({
        method: 'delete',
        responseType: 'json',
        url: `${server}/api/users/${params}`,
      })
      .then((response) => {
        handleClose();
        handleUserDeleted(response.data.result);
        socket.emit('delete', response.data.result);
      })
      .catch((err) => {
        handleClose();
        throw err;
      });
    }
    return (
      <Modal
        trigger={<Button onClick={e => handleOpen(e)} color={buttonColor}>{buttonTriggerTitle}</Button>}
        open={modalOpen}
        onClose={e=>handleClose(e)}
        dimmer='inverted'
        size='tiny'
      >
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete <strong>{user.name}</strong>?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ e =>handleSubmit(e)} data-userID={user._id} color='red'>Yes</Button>
          <Button onClick={e => handleClose(e)} color='black'>No</Button>
          </Modal.Actions>
      </Modal>
    );
  }


export default ModalConfirmDelete;