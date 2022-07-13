import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import FormUser from './FormUser';

const ModalUser = ({headerTitle, buttonTriggerTitle, buttonSubmitTitle,buttonColor,userID, handleUserAdded, handleUserUpdated, server, socket }) => {
  return (
    <Modal
    trigger={<Button color='green'>{buttonTriggerTitle}</Button>}
    dimmer='inverted'
    size='large'
    closeIcon='close'
  >
    <Modal.Header>{headerTitle}</Modal.Header>
    <Modal.Content>
      <FormUser
        buttonSubmitTitle={buttonSubmitTitle}
        buttonColor={buttonColor}
        userID={userID}
        handleUserAdded={handleUserAdded}
        handleUserUpdated={handleUserUpdated}
        server={server}
        socket={socket}
      />
    </Modal.Content>
  </Modal>
  )
}

export default ModalUser