import { Button, Progress, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';

export interface IStressTestingTable {
  key: React.Key;
  ip: string;
  mac: string;
  average: number;
  realtime: number;
  temperature: number;
  pools: string;
  speed: string;
  start: string;
  progress: number;
  alters: number;
}

interface StressTableProps {
  tableData: IStressTestingTable[];
  setIsDisabled: (arg: boolean) => void;
  setSelectedRows: (arg: IStressTestingTable[]) => void;
}

const enum SETTING {
  AVERAGE = 80,
  TEMPERATURE = 95,
}

const formatHashRate = (hashRate: number) => {
  if (hashRate >= 1000000) return `${(hashRate / 1000000).toFixed(2)}TH/s`;
  if (hashRate >= 1000) return `${(hashRate / 1000).toFixed(2)}GH/s`;
  return `${hashRate.toFixed(2)}MH/s`;
};

const columns: ColumnsType<IStressTestingTable> = [
  {
    title: 'MAC Address',
    dataIndex: 'mac',
  },
  {
    title: 'IP Address',
    dataIndex: 'ip',
    render: (ip) => <a>{ip}</a>,
  },
  {
    title: 'Realtime HashRate',
    dataIndex: 'realtime',
    render: (avg) => formatHashRate(avg),
  },
  // {
  //   title: 'Average HashRate',
  //   dataIndex: 'average',
  //   render: (avg) => (
  //     <span className={avg <= SETTING.AVERAGE * 1000000 ? styles.danger : ''}>
  //       {formatHashRate(avg)}
  //     </span>
  //   ),
  // },
  {
    title: 'Pools',
    dataIndex: 'pools',
  },
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    render: (temp) => (
      <span className={temp >= SETTING.TEMPERATURE ? styles.danger : ''}>
        {`${temp.toFixed(2)}℃`}
      </span>
    ),
  },
  {
    title: 'Fan Speed',
    dataIndex: 'fan',
  },
  {
    title: 'Start Time',
    dataIndex: 'time',
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    render: (progress) => <Progress percent={progress} size="small" />,
  },
  {
    title: 'Alters Number',
    dataIndex: 'alters',
  },
  {
    title: 'Operation',
    render: () => (
      <Space size={16}>
        <Button type="text">Complete</Button>
        <Button type="text">Restart</Button>
        <Button danger type="text">
          Repair
        </Button>
        <Button type="text">Details</Button>
      </Space>
    ),
  },
];

const StressTestingTable = ({ tableData, setIsDisabled, setSelectedRows }: StressTableProps) => {
  return (
    <Table
      //TODO change tooltip language to English
      columns={columns}
      dataSource={tableData}
      rowSelection={{
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys.length}`, 'selectedRows: ', selectedRows);
          setIsDisabled(selectedRowKeys.length > 0 ? false : true);
          setSelectedRows(selectedRows);
        },
      }}
      rowKey="ip"
    />
  );
};

export default StressTestingTable;
