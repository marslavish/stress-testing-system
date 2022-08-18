import { Badge, Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from './index.less';
import ReportTable from '../ReportTable';

export interface IAssetsTable {
  key: React.Key;
  status: string;
  mac: string;
  average: number;
  stress_testing_times: number;
  last_testing_times: number;
}

interface AssetsTableProps {
  tableData: IAssetsTable[];
}

// const enum SETTING {
//   AVERAGE = 80,
//   TEMPERATURE = 95,
// }

// const formatHashRate = (hashRate: number) => {
//   if (hashRate >= 1000000) return `${(hashRate / 1000000).toFixed(2)}TH/s`;
//   if (hashRate >= 1000) return `${(hashRate / 1000).toFixed(2)}GH/s`;
//   return `${hashRate.toFixed(2)}MH/s`;
// };

const initialReportData = {
  startTime: 'start',
  endTime: 'end',
};

const AssetsTable = ({ tableData }: AssetsTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [reportData, setReportData] = useState([initialReportData]);

  const handleDetailsClick = () => {
    setIsModalVisible(true);
  };

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<IAssetsTable> = [
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: () => <Badge status="success" className={styles.badge} />,
    },
    {
      title: 'MAC Address',
      dataIndex: 'mac',
      align: 'center',
    },
    {
      title: 'Average HashRate',
      dataIndex: 'average',
      align: 'center',
      // render: (avg) => (
      //   <span className={avg <= SETTING.AVERAGE * 1000000 ? styles.danger : ''}>
      //     {formatHashRate(avg)}
      //   </span>
      // ),
    },
    {
      title: 'Stress Testing Times',
      dataIndex: 'stress_testing_times',
      align: 'center',
    },
    {
      title: 'Last Testing Times',
      dataIndex: 'last_testing_times',
      align: 'center',
    },
    {
      title: 'Operation',
      align: 'center',
      render: (_, record) => (
        <>
          <Button type="link" onClick={handleDetailsClick}>
            History Report
          </Button>
          <Button type="link" danger onClick={handleDeleteClick}>
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
    <>
      <Table
        //TODO change tooltip language to English
        columns={columns}
        dataSource={tableData}
        rowKey="ip"
      />
    </>
  );
};

export default AssetsTable;
