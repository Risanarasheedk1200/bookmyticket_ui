import React from 'react';
import Modal from 'react-modal';

const MyModal = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <div >
        <button style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onRequestClose}>Close Modal</button>
        {content}
      </div>
    </Modal>
  );
};

export default MyModal;
