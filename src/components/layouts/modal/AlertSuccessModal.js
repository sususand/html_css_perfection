import React from "react";
import { Modal } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const AlertSuccessModal = ({ message, open, onClose }) => {
  return (
    <Modal
      centered={true}
      width={350}
      open={open} // Set visible to true to display the modal
      onCancel={onClose} // Handle cancel event with onOk function
      footer={
        <button
          style={{
            backgroundColor: "#2A3958",
            color: "white",
            width: "80px",
            borderRadius: "6px",
          }}
          onClick={onClose}
        >
          확인
        </button>
      } // Custom footer button
    >
      <div>
        <div className="outer-circle">
          <div className="inner-circle">
            <CheckOutlined className="check-icon" />
          </div>
        </div>
        <span>{message}</span>
      </div>
    </Modal>
  );
};

export default AlertSuccessModal;
