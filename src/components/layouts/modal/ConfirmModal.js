import React from "react";
import { Modal } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";

const ConfirmModal = ({ message, open, onOk, onClose }) => {
  return (
    <Modal
      centered={true}
      width={350}
      open={open} // Set visible to true to display the modal
      onCancel={onClose} // Handle cancel event with onCancel function
      footer={[
        <button
          style={{
            backgroundColor: "#2A3958",
            color: "white",
            width: "80px",
            borderRadius: "6px",
          }}
          key="submit"
          type="primary"
          onClick={onOk}
        >
          확인
        </button>,
        <button
          style={{
            borderColor: "#D7D8DA",
            color: "black",
            width: 80,
            borderRadius: 6,
            marginLeft: 4,
          }}
          key="cancel"
          onClick={onClose}
        >
          취소
        </button>,
      ]}
    >
      <div>
        <div className="outer-exc">
          <div className="inner-exc">
            <ExclamationOutlined color="#D46B08" className="exc-icon" />
          </div>
        </div>
        <span>{message}</span>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
