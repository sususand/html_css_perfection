import { useState } from "react";
import { Modal, Form, Input, Checkbox, Button, Divider, Col } from "antd";
import "./RejectReasonModal.css";

import AlertSuccessModal from "./AlertSuccessModal";
import AlertWarningModal from "./AlertWarningModal";
const RejectReasonModal = ({ visible, onCancel }) => {
  const [requiredField, setRequiredField] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otherReasonVisible, setOtherReasonVisible] = useState(false);
  const [form] = Form.useForm();
  form.setFieldValue({
    memberNumber: "abc111, abc222",
    memberName: "김길동, ㈜가나다라투자",
    reason: "",
  });

  const handleOtherReasonChange = (e) => {
    setOtherReasonVisible(e.target.checked);
  };

  const handleCancel = () => {
    //form.resetFields();
    onCancel();
  };

  const [checkedList, setCheckedList] = useState([]);
  const onChange = (list) => {
    setCheckedList(list);
    console.log(list, "from list");
  };

  const onFinish = (values) => {
    console.log(" onfinished checked list", checkedList, requiredField);
    if (checkedList.length > 0) {
      console.log("Success ", checkedList);
      setSuccess(true);
    }
    if (checkedList.length === 0) {
      setRequiredField(true);
      console.log("required to check");
    }
  };

  return (
    <>
      <Modal
        title="승인거부 사유 입력"
        open={visible}
        centered={true}
        width={800}
        onCancel={handleCancel}
        footer={[
          <Button
            style={{
              backgroundColor: "#2A3958",
              color: "white",
              width: 100,
            }}
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            저장
          </Button>,
          <Button
            style={{ width: 100, borderColor: "#D7D8DA", color: "black" }}
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
            <span>abc111, abc222</span>
          </Form.Item>
          <Form.Item name="memberName" label="회원명/법인명">
            <span>김길동, ㈜가나다라투자 </span>
          </Form.Item>

          <Form.Item
            required={true}
            name="reason"
            label={
              <div
                style={{
                  alignSelf: "center",
                }}
              >
                승인거부 사유
              </div>
            }
          >
            <Checkbox.Group onChange={onChange}>
              <Col span={16}>
                <Checkbox value="doc_not_identify">서류 식별 불가</Checkbox>
              </Col>

              <Col span={16}>
                <Checkbox value="missing_doc">필수 서류 누락</Checkbox>
              </Col>

              <Col span={16}>
                <Checkbox value="expired_doc">
                  서류의 내용이 등록된 회원정보와 다름
                </Checkbox>
              </Col>

              <Col span={16}>
                <Checkbox value="missing_info">
                  서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인,
                  본인서명 등)
                </Checkbox>
              </Col>

              <Col span={16}>
                <Checkbox value="invalid_period">
                  서류의 유효기간이 초과됨
                </Checkbox>
              </Col>

              <Col span={16}>
                <Checkbox value="other" onChange={handleOtherReasonChange}>
                  직접 입력
                </Checkbox>
              </Col>
            </Checkbox.Group>
            <Input.TextArea
              style={{ marginTop: 8, overflow: "auto" }}
              placeholder="사유 입력"
              disabled={!otherReasonVisible}
            />
          </Form.Item>
        </Form>

        <Divider />
      </Modal>

      <AlertWarningModal
        open={requiredField}
        onClose={() => {
          setRequiredField(false);
        }}
        message={"필수입력항목을 입력해주세요."}
      />

      <AlertSuccessModal
        open={success}
        onClose={() => {
          setSuccess(false);
        }}
        message={"필수입력항목을 입력해주세요."}
      />
    </>
  );
};

export default RejectReasonModal;
