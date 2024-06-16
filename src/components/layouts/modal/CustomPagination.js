import React, { useState } from "react";
import { Pagination, Button } from "antd";

const CustomPagination = ({ current, total, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
    // Perform any other actions based on the page change
  };

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <Button> {"< Previous"} </Button>;
    }
    if (type === "next") {
      return <Button> {"Next >"} </Button>;
    }
    if (type === "jump-prev") {
      return <Button> {"<<"} </Button>;
    }
    if (type === "jump-next") {
      return <Button> {">>"} </Button>;
    }
    if (type === "page") {
      return (
        <Button
          type={current === currentPage ? "primary" : "default"}
          onClick={() => handlePageChange(current)}
        >
          {current}
        </Button>
      );
    }
    return originalElement;
  };

  return (
    <Pagination
      current={current}
      total={total} // Replace with your total number of pages
      pageSize={pageSize} // Replace with your page size
      showSizeChanger={false} // Optional: Hide page size changer
      showQuickJumper
      showLessItems
      itemRender={itemRender}
    />
  );
};

export default CustomPagination;
