import React, { useState, useEffect } from "react";
import { Button, Divider, Dropdown, Table, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "../../components/layouts/modal/CommonDialog.css";
import "./investmentType.css";

import RejectReasonModal from "../../components/layouts/modal/RejectReasonModal";
import ChangeInvestTypeModal from "../../components/layouts/modal/ChangeInvestTypeModal";
import ViewDocModal from "../../components/layouts/modal/ViewDocModal";
import { useSelector } from "react-redux";
import AlertWarningModal from "../../components/layouts/modal/AlertWarningModal";
import AlertSuccessModal from "../../components/layouts/modal/AlertSuccessModal";
import ConfirmModal from "../../components/layouts/modal/ConfirmModal";
import {
  approval_items,
  date_time_items,
  items,
  view_items,
} from "../../common/constants";

const { Text } = Typography;

const InvestmentTypeLists = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [OpenDocModal, setOpenDocModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null); // State to track selected item
  const [selectedApprovalItem, setSelectedApprovalItem] = useState(null);
  const [selectedDateTimeItem, setSelectedDateTimeItem] = useState(null);
  //const [selectedViewItem, setSelectedViewItem] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [showInvestModal, setInvestModal] = useState(false);

  const [approvalWatingCount, setApprovalWatingCount] = useState(0);

  const [successModal, openSuccessModal] = useState(false);
  const [warningModal, openWarningModal] = useState(false);
  const [confirmModal, openConfirmModal] = useState(false);
  const [message, setMessage] = useState("");

  // columns for application list
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      render: (text) => `${text}`,
      width: 70,
    },
    {
      title: "기존유형",
      dataIndex: "existing_type",
      width: 100,
    },
    {
      title: "신청유형",
      dataIndex: "application_type",
      width: 100,
    },
    {
      title: "제출서류",
      dataIndex: "document",
      render: (text) => (
        <Button
          style={{
            backgroundColor: "#EBEEF3",
            borderColor: "#D7D8DA",
            borderWidth: "1px",
            color: "black",
          }}
          onClick={() => setOpenDocModal(true)}
        >
          {text}
        </Button>
      ),
      width: 100,
    },
    {
      title: "신청일시",
      dataIndex: "application_date_time",
      width: 200,
      align: "center",
      // sorter: (a, b) => {
      //   if (defaultSort === "신청일시순") {
      //     return (
      //       new Date(a.application_date_time) -
      //       new Date(b.application_date_time)
      //     );
      //   }
      // },
    },
    {
      title: "승인여부",
      dataIndex: "approval_status",
      width: 150,
      render: (text) => {
        let color, backgroundColor;

        switch (text) {
          case "승인대기":
            color = "#9A3412";
            backgroundColor = "#FFEDD5";
            break;
          case "승인거부":
            color = "#991B1B";
            backgroundColor = "#FEE2E2";
            break;
          default:
            color = "#166534";
            backgroundColor = "#DCFCE7";
        }

        return (
          <span
            style={{
              color: color,
              backgroundColor: backgroundColor,
              padding: "2px 10px",
              borderRadius: 10,
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "승인거부 사유",
      dataIndex: "reject_reason",
      width: 400,
    },
    {
      title: "승인일시",
      dataIndex: "approval_date_time",
      width: 200,
      align: "center",
      // sorter: (a, b) => {
      //   if (defaultSort === "승인일시순") {
      //     return (
      //       new Date(a.application_date_time) -
      //       new Date(b.application_date_time)
      //     );
      //   }
      // },
    },
    {
      title: "관리자",
      dataIndex: "manager",
      width: 150,
    },
  ];

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    console.log(selectedRows);
    setSelectedRows(newSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    columnWidth: "50px",
    onChange: onSelectChange,
    getCheckboxProps: (record) => {
      return {
        disabled:
          record.approval_status === "승인대기" ||
          record.approval_status === "승인거부",
      };
    },
  };

  // Access investment lists from Redux store
  const dataArray = useSelector((state) => state.investment.data);
  const [filterArray, setFilterArray] = useState(dataArray);

  useEffect(() => {
    // Filter the data array to count items where approval_status is "승인대기"
    const waitingCount = dataArray.filter(
      (item) => item.approval_status === "승인대기"
    ).length;
    setApprovalWatingCount(waitingCount);
  }, [dataArray, filterArray]); // Dependency array ensures useEffect runs when data changes

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
    if (selectedRowKeys.length > 0) {
      if (e.key === "승인완료") {
        console.log("to approved on selected items ");
        setInvestModal(true);
      } else if (e.key === "승인거부") {
        console.log("to denied on selected row");
        setModalOpen(true);
      }
    } else {
      console.log("there are no applications selected.");
      setMessage("선택된 신청건이 없습니다.");
      openWarningModal(true);
    }
  };

  //filter appoval(approved or denied)
  //default is Approval All
  const handleApprovalMenuClick = (e) => {
    setSelectedApprovalItem(e.key);
    if (e.key === "승인여부 전체") {
      setFilterArray(dataArray);
      return;
    }
    setFilterArray(dataArray.filter((item) => item.approval_status === e.key));
  };

  //sort table on application date time or approval date time
  const handleDateTimeMenuClick = (e) => {
    setSelectedDateTimeItem(e.key);
    let data = [...dataArray];
    if (e.key === "신청일시순") {
      // Sort the data array based on the applicatoin date time
      data.sort(
        (a, b) =>
          new Date(a.application_date_time) - new Date(b.application_date_time)
      );
    } else if (e.key === "승인일시순") {
      //sort with approval date time
      data.sort(
        (a, b) =>
          new Date(a.approval_date_time) - new Date(b.approval_date_time)
      );
    }
    // Update the state with the sorted data
    setFilterArray(data);
  };

  //render 승인상태 변경 dropdown
  const menuProps = {
    items: items, //name must be "items"
    onClick: handleMenuClick,
  };

  //render approval dropdown
  const approvalMenuProps = {
    items: approval_items, //name must be "items"
    onClick: handleApprovalMenuClick,
  };

  //render sort dropdown
  const dateTimeMenuProps = {
    items: date_time_items, //name must be "items"
    onClick: handleDateTimeMenuClick,
  };
  const viewMenuProps = {
    items: view_items, //name must be "items"
    //onClick: handleViewMenuClick,
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const NoDataComponent = () => (
    <div
      style={{
        height: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Pretendard-Regular",
      }}
    >
      조회 결과가 없습니다.
    </div>
  );

  // const onRowAction = (record, rowIndex) => {
  //   return {
  //     onDoubleClick: (event) => {
  //       setInvestModal(true);
  //       console.log("event, record, rowIndex :", event, record, rowIndex);
  //     },
  //   };
  // };

  return (
    <div style={{ fontFamily: "Pretendard-Regular" }}>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ fontSize: 20, fontFamily: "Pretendard-Bold" }}>
            신청 목록
          </span>
          <span style={{ fontSize: 14 }}>
            (총 {dataArray.length}명 | 승인대기 {""}
            <Text type="danger" underline>
              {approvalWatingCount}
            </Text>
            건)
          </span>
        </div>

        <div style={{ alignSelf: "flex-end" }}>
          <Dropdown menu={approvalMenuProps}>
            <Button
              style={{
                width: 160,
                justifyContent: "space-between",
              }}
            >
              <span>{selectedApprovalItem ?? "승인여부 전체"}</span>
              <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown menu={dateTimeMenuProps}>
            <Button
              style={{
                width: 160,
                justifyContent: "space-between",
                margin: "0px 4px",
              }}
            >
              <span>{selectedDateTimeItem ?? "신청일시순"}</span>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown menu={viewMenuProps}>
            <Button style={{ width: 160, justifyContent: "space-between" }}>
              <span>50개씩 보기</span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <Divider />
      <div
        style={{
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          style={{
            backgroundColor: "#2A3958",
            color: "white",
            width: "100px",
          }}
          onClick={() => setModalOpen(true)}
        >
          등록
        </Button>

        <RejectReasonModal visible={modalOpen} onCancel={handleCancel} />
        <ViewDocModal
          visible={OpenDocModal}
          onCancel={() => setOpenDocModal(false)}
        />
        <ChangeInvestTypeModal
          visible={showInvestModal}
          onCancel={() => setInvestModal(false)}
        />

        <div style={{ alignSelf: "flex-end", gap: "8px" }}>
          <span style={{ marginRight: 16 }}>
            선택한 <Text>{selectedRowKeys.length}</Text>건
          </span>
          <Dropdown menu={menuProps}>
            <Button style={{ width: 160, justifyContent: "space-between" }}>
              {selectedItem ?? "승인상태 변경"}
              <DownOutlined />
            </Button>
          </Dropdown>

          <Button
            style={{
              backgroundColor: "#2A3958",
              marginLeft: 4,
              color: "white",
              width: "100px",
            }}
          >
            저장
          </Button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Table
          scroll={{ x: "100%", y: "56vh" }}
          rowSelection={rowSelection}
          columns={columns}
          rowClassName={(record, index) => (index % 2 !== 0 ? "even-row" : "")}
          // onRow={onRowAction}
          size="small"
          locale={{
            emptyText: <NoDataComponent />,
          }}
          dataSource={filterArray}
          pagination={{
            showSizeChanger: false,
            defaultPageSize: 50,
            position: ["bottomCenter"],
          }}
        />
      </div>

      <AlertWarningModal
        open={warningModal}
        onClose={() => {
          openWarningModal(false);
        }}
        message={message}
      />

      <ConfirmModal
        open={confirmModal}
        onOk={() => {
          openConfirmModal(false);
          setMessage("저장되었습니다.");
          openSuccessModal(true);
        }}
        onClose={() => {
          openConfirmModal(false);
          setMessage("");
        }}
        message={message}
      />

      <AlertSuccessModal
        open={successModal}
        onClose={() => {
          openSuccessModal(false);
        }}
        message={message}
      />
    </div>
  );
};
export default InvestmentTypeLists;
