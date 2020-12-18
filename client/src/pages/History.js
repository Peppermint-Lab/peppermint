import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

// const data = [];

import { baseUrl } from "../utils";

class History extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [{}],
  };

  componentDidMount() {
    // make fetch request
    fetch(`${baseUrl}/api/v1/tickets/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ data: result.tickets }, () =>
          console.log(this.state.data)
        );
      });
  }

  componentWillUnmount() {
    this.setState({ searchText: "", searchedColumn: "" });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: " Contact Name",
        dataIndex: "name",
        key: "name",
        width: "15%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Client",
        dataIndex: ["client", "name"],
        key: "client",
        width: "15%",
        ...this.getColumnSearchProps("client"),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "15%",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Engineer",
        dataIndex: ["assignedto", "name"],
        key: "assignedto",
        width: "15%",
        ...this.getColumnSearchProps("assignedto"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "15%",
        ...this.getColumnSearchProps("status"),
      },
      {
        title: "Issue",
        dataIndex: "issue",
        key: "issue",
        width: "15%",
        ...this.getColumnSearchProps("issue"),
      },
    ];

    return <Table columns={columns} dataSource={this.state.data} pagination={{ pageSize: 10 }}/>;
  }
}

export default History;
