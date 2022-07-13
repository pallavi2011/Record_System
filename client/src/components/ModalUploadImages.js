import React, {useState}from 'react';
import { Button, Modal, Image } from 'semantic-ui-react';



const ModalUploadImages = ({userID, users, headerTitle, user}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = e => setModalOpen(true);
    const handleClose = e => setModalOpen(false);

    return (
          <Modal 
              trigger={<Button onClick={e => handleOpen(e)} color='green'>Open Images</Button>}
              open={modalOpen}
              onClose={e =>handleClose(e)}
              dimmer='inverted'
              size='tiny'
            >
            <Modal.Header>Images</Modal.Header>
            {user.files && user.files.map((file) => (
              <Modal.Content>
              <Image size='large' src={`http://localhost:3000/${file.filePath}`} wrapped />
            </Modal.Content>
            ))}
          </Modal>
    );
  }


export default ModalUploadImages;