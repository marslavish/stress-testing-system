import { Badge, Button, message, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from './index.less';
import ReportTable from '../ReportTable';
import formatHashRate from '@/utils/formatHashRate';
import formatDate from '@/utils/formatDate';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { request } from 'umi';

export interface IAssetsTable {
  stressTests: any;
  key: React.Key;
  status: string;
  mac: string;
  average: number;
  stress_testing_times: number;
  last_testing_times: number;
  content: any;
}

interface AssetsTableProps {
  tableData: IAssetsTable[];
  refresh: any;
}

const initialReportData = {
  key: 1,
  startTime: 'start',
  endTime: 'end',
};

const AssetsTable = ({ tableData, refresh }: AssetsTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (tableData.length === 0) return null;

  // const [reportData, setReportData] = useState([initialReportData]);

  const handleDetailsClick = () => {
    setIsModalVisible(true);
  };

  const handleDeleteClick = (record: IAssetsTable) => {
    Modal.confirm({
      title: 'Are you sure deleting this miner?',
      icon: <ExclamationCircleOutlined style={{ color: '#ff7875' }} />,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        request('/api/v1/server/miner/deleteMiner', {
          method: 'POST',
          data: {
            mac: record.mac,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`,
          },
        })
          .then(() => {
            refresh();
          })
          .catch((error) => message.error(error.message));
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<IAssetsTable> = [
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (status) => (
        <Badge status={status === 'OK' ? 'success' : 'error'} className={styles.badge} />
      ),
    },
    {
      title: 'MAC Address',
      dataIndex: 'mac',
      align: 'center',
    },
    {
      title: 'Average HashRate',
      align: 'center',
      render: (_, record) => {
        const stressTests = record.stressTests;
        const lastTest = stressTests[stressTests.length - 1];
        if (lastTest.records.length === 0) return '-';
        const average = lastTest.records[lastTest.records.length - 1].average;
        return formatHashRate(average);
      },
    },
    {
      title: 'Stress Testing Times',
      dataIndex: 'stressTests',
      align: 'center',
      render: (value) => value.length,
    },
    {
      title: 'Last Testing Times',
      align: 'center',
      render: (data) =>
        formatDate(data.stressTests[data.stressTests.length - 1].startData.dataTime),
    },
    {
      title: 'Operation',
      align: 'center',
      render: (_, record) => (
        <>
          <Button type="link" onClick={handleDetailsClick}>
            History Report
          </Button>
          <Button type="link" danger onClick={() => handleDeleteClick(record)}>
            Delete
          </Button>

          <Modal
            title="Historical Report List"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            closable
          >
            {/* TODO: should get data from record instead */}
            <ReportTable tableData={[initialReportData]} />
          </Modal>
        </>
      ),
    },
  ];

  return (
    <Table
      //TODO change tooltip language to English
      columns={columns}
      dataSource={tableData}
      rowKey="mac"
    />
  );
};

export default AssetsTable;
