import { DownOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, Modal, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useState } from 'react';
import styles from './index.less';

export interface IReportTable {
  key: React.Key;
  startTime: string;
  endTime: string;
}

interface ReportTableProps {
  tableData: IReportTable[];
}

const { Text, Link } = Typography;

const menu = (
  <Menu
    // onClick={onMenuClick}
    items={[
      {
        key: '1',
        label: <Text type="danger">Delete</Text>,
      },
      {
        key: '2',
        label: <Link>Copy Report Link</Link>,
      },
    ]}
  />
);

const ReportTable = ({ tableData }: ReportTableProps) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDetailsClick = () => {
    // setIsModalVisible(true);
  };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const columns: ColumnsType<IReportTable> = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      align: 'center',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      align: 'center',
    },
    {
      title: 'Operation',
      align: 'center',
      render: () => (
        <Dropdown.Button overlay={menu} icon={<DownOutlined className={styles.icon} />}>
          Details
        </Dropdown.Button>
      ),
    },
  ];

  return (
    <>
      <Table
        //TODO change tooltip language to English
        columns={columns}
        dataSource={tableData}
        rowKey="ip"
      />
      {/* <Modal
        title="Historical Report List"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        closable
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
};

export default ReportTable;
