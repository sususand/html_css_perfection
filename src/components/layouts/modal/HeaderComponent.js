import { Menu } from "antd";
import { Link } from "react-router-dom";

function HeaderComponent() {
  return (
    <Menu
      mode="horizontal"
      style={{
        display: "flex",
        background: "#EBEEF3",
        fontFamily: "Pretendard-Regular",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      defaultSelectedKeys={["2"]}
    >
      <Menu.Item key="1" disabled={true}>
        <Link>기본정보 관리</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/investment-types">투자유형 관리</Link>
      </Menu.Item>
      <Menu.Item key="3" disabled={true}>
        <Link>입출금내역 조회</Link>
      </Menu.Item>
      <Menu.Item key="4" disabled={true}>
        <Link>영업내역 조회</Link>
      </Menu.Item>
      <Menu.Item key="5" disabled={true}>
        <Link>투자내역 조회</Link>
      </Menu.Item>
      <Menu.Item key="6" disabled={true}>
        <Link>채권내역 조회</Link>
      </Menu.Item>
      <Menu.Item key="7" disabled={true}>
        <Link>SMS 관리</Link>
      </Menu.Item>
      <Menu.Item key="8" disabled={true}>
        <Link>상담내역 관리</Link>
      </Menu.Item>
      <Menu.Item key="9" disabled={true}>
        <Link>1:1문의내역 조회</Link>
      </Menu.Item>
    </Menu>
  );
}

export default HeaderComponent;
