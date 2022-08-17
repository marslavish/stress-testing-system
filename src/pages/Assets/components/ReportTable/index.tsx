import { Badge, Button, Modal, Table } from 'antd';
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
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
    },
    {
      title: 'Operation',
      render: () => (
        <Button type="link" className={styles.link} onClick={handleDetailsClick}>
          查看详情
        </Button>
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
