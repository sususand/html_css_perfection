import { useState } from "react";
import { Modal, Form, Button, Divider, Col } from "antd";
import "./ViewDocModal.css";
import AlertSuccessModal from "./AlertSuccessModal";
import AlertWarningModal from "./AlertWarningModal";
import ConfirmModal from "./ConfirmModal";

const ViewDocModal = ({ visible, onCancel }) => {
  const [requiredField, setRequiredField] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form] = Form.useForm();
  form.setFieldValue({
    memberNumber: "abc111, abc222",
    memberName: "김길동, ㈜가나다라투자",
    reason: "",
  });

  const handleCancel = () => {
    //form.resetFields();
    onCancel();
  };

  const onFinish = (values) => {
    console.log("values ", values);
  };

  return (
    <>
      <Modal
        title="서류 보기"
        open={visible}
        centered={true}
        width={800}
        height={700}
        className="view-doc-style"
        onCancel={handleCancel}
        footer={[
          <Button
            style={{
              width: 120,
              borderColor: "#D7D8DA",
              backgroundColor: "#EBEEF3",
            }}
            key="cancel"
            onClick={handleCancel}
          >
            파일 다운로드
          </Button>,
          <Button
            style={{
              backgroundColor: "#2A3958",
              color: "white",
              width: 100,
            }}
            type="primary"
            onClick={handleCancel}
          >
            확인
          </Button>,
        ]}
      >
        <Divider />

        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          labelCol={{ span: 6 }}
          labelWrap={true}
          labelAlign="left"
          colon={false}
          className="doc-form"
          style={{
            background: "#EEF0F4",
            textAlign: "left",
            borderRadius: 6,
            fontFamily: "Pretendard-Regular",
          }}
        >
          <Form.Item
            required={true}
            name="reason"
            label={
              <div
                style={{
                  alignSelf: "center",
                }}
              >
                서류
              </div>
            }
          >
            <div className="view-doc-container">
              <Col className="col-view-doc">
                <span>img</span>
              </Col>

              <Col className="col-view-doc">
                <span>img</span>
              </Col>

              <Col className="col-view-doc">
                <span>img</span>
              </Col>
            </div>
          </Form.Item>
        </Form>

        <Divider />
      </Modal>

      <AlertWarningModal
        open={requiredField}
        onOk={() => {
          setRequiredField(false);
        }}
        message={"필수입력항목을 입력해주세요."}
      />

      <AlertSuccessModal
        open={success}
        onOk={() => {
          setSuccess(false);
        }}
        message={"필수입력항목을 입력해주세요."}
      />
      <ConfirmModal
        open={success}
        onOk={() => {
          setSuccess(false);
        }}
        message={"필수입력항목을 입력해주세요."}
      />
    </>
  );
};

export default ViewDocModal;
