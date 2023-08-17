import React from 'react'
import './ModalComfirm.css'
import {ModalComfirmProps} from '../../types/types'


const ModelComfirmDelete: React.FC<ModalComfirmProps> = ({ onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-content">
        <p>Bạn chắc chắn muốn xoá?</p>
        <div className="confirmation-modal-actions">
          <button className="btn btn-yes" onClick={handleConfirm}>Yes</button>
          <button className="btn btn-no" onClick={handleCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ModelComfirmDelete;
