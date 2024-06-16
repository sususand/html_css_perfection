import { useState } from "react";
import { Modal, Form, Button, Divider, Dropdown, Upload } from "antd";

import AlertSuccessModal from "./AlertSuccessModal";
import AlertWarningModal from "./AlertWarningModal";
import ConfirmModal from "./ConfirmModal";

import { DownOutlined } from "@ant-design/icons";
import { investment_items } from "../../../common/constants";

const ChangeInvestTypeModal = ({ visible, onCancel }) => {
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [message, setMessage] = useState("");

  const [selectedInvestmentType, setSelectedInvestmentType] = useState(null);

  const [form] = Form.useForm();
  form.setFieldValue({
    memberNumber: "abc111, abc222",
    memberName: "김길동, ㈜가나다라투자",
    investmentType: "",
    attachDoc: "",
  });

  const handleInvestmentMenuClick = (e) => {
    console.log("click", e);
    setSelectedInvestmentType(e.key);
    console.log("label ", e.key);
  };

  const handleCancel = () => {
    //form.resetFields();
    onCancel();
  };

  const handleFileUpload = (fileList) => {
    if (!fileList) {
      setMessage("필수입력항목을 입력해주세요.");
      setOpenWarningModal(true);
      return;
    }
    // File type validation
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const files = fileList.map((file) => file.originFileObj);
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setMessage("파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.");
      setOpenWarningModal(true);
      return false;
    }

    // File size validation
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 100 * 1024 * 1024; // 100MB
    console.log(totalSize, maxSize);
    if (totalSize > maxSize) {
      setMessage("최대 100MB까지 등록 가능합니다.");
      setOpenWarningModal(true);
      console.log("Up to 100MB can be registered.");

      return false;
    }

    // Number of files validation
    if (files.length > 10) {
      setMessage("최대 10개의 파일을 등록할 수 있습니다.");
      setOpenWarningModal(true);
      return false;
    }

    return true;
  };

  const onFinish = async (values) => {
    const fileList = form.getFieldValue("attachDoc");
    const isValid = handleFileUpload(fileList);

    if (isValid) {
      setOpenConfirmModal(true);
      setMessage("투자유형을 변경하시겠습니까?");
      //after confimation alert success message
      console.log("Form values:", values);

      return;
    }
    setMessage("파일 등록에 실패하였습니다.");
    setOpenWarningModal(true);
  };

  return (
    <>
      <Modal
        title="투자유형 변경"
        open={visible}
        centered={true}
        width={800}
        onCancel={handleCancel}
        footer={[
          <Button
            style={{
              backgroundColor: "#2A3958",
              color: "white",
              width: 120,
            }}
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            저장
          </Button>,
          <Button
            style={{ borderColor: "#D7D8DA", color: "black", width: 120 }}
            key="cancel"
            onClick={handleCancel}
          >
            취소
          </Button>,
        ]}
      >
        <Divider />

        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          labelCol={{ span: 6 }}
          labelAlign="left"
          colon={false}
          style={{
            background: "#EEF0F4",
            textAlign: "left",
            fontFamily: "Pretendard-Regular",
          }}
        >
          <Form.Item name="memberNumber" label="회원번호">
            <span> abc111</span>
          </Form.Item>
          <Form.Item name="memberName" label="회원명/법인명">
            <span>김길동 </span>
          </Form.Item>
          <Form.Item required name="investmentType" label="투자유형">
            <Dropdown
              menu={{
                items: investment_items,
                onClick: handleInvestmentMenuClick,
              }}
            >
              <Button
                style={{
                  width: 200,
                  justifyContent: "space-between",
                }}
              >
                <span>{selectedInvestmentType ?? "일반개인"}</span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item
            required={true}
            name="attachDoc"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            //rules={[{ required: true, message: "파일을 선택해주세요." }]}
            label={
              <div
                style={{
                  alignSelf: "center",
                }}
              >
                서류첨부
              </div>
            }
          >
            <Upload
              //accept=".jpg,.jpeg,.gif,.png,.pdf"
              //maxCount={10}
              beforeUpload={() => false} // To prevent auto uploading
              multiple
            >
              <Button style={{ backgroundColor: "#EEF0F4" }}>파일 선택</Button>
            </Upload>
          </Form.Item>
        </Form>
        <ul>
          <li>
            <span>파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.</span>
          </li>
          <li>
            <span>최대 10개, 100MB까지 등록이 가능합니다.</span>
          </li>
        </ul>
        <Divider />
      </Modal>

      <AlertWarningModal
        open={openWarningModal}
        onClose={() => {
          setOpenWarningModal(false);
          setMessage("");
        }}
        message={message}
      />

      <AlertSuccessModal
        open={openSuccessModal}
        onClose={() => {
          setOpenSuccessModal(false);
          setMessage("");
        }}
        message={message}
      />

      <ConfirmModal
        open={openConfirmModal}
        onOk={() => {
          setOpenConfirmModal(false);
          setMessage("저장되었습니다.");
          setOpenSuccessModal(true);
        }}
        onClose={() => {
          setOpenConfirmModal(false);
          setMessage("");
        }}
        message={message}
      />
    </>
  );
};

export default ChangeInvestTypeModal;
