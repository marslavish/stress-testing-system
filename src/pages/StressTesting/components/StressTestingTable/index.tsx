import { Button, Progress, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { pick } from 'lodash';
import styles from './index.less';

export interface IStressTestingTable {
  startData: any;
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

const formatUnit = (unit: string) => (unit.length < 2 ? '0' + unit : unit);

const formatDate = (date: number) => {
  const d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = '' + d.getFullYear(),
    hour = '' + d.getHours(),
    minute = '' + d.getMinutes(),
    second = '' + d.getSeconds();

  return (
    [year, month, day].map(formatUnit).join('-') +
    ' ' +
    [hour, minute, second].map(formatUnit).join(':')
  );
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
    dataIndex: ['startData', 'realtime'],
    render: (realtime) => formatHashRate(realtime),
  },
  {
    title: 'Pools',
    render: (_, record) => {
      const pool = pick(record.startData, ['pool1', 'pool2', 'pool3']);
      return Object.values(pool).join(',');
    },
  },
  {
    title: 'Temperature',
    dataIndex: ['startData', 'temperature'],
    render: (temp) => (
      <span className={temp >= SETTING.TEMPERATURE ? styles.danger : ''}>
        {`${temp.toFixed(2)}℃`}
      </span>
    ),
  },
  {
    title: 'Fan Speed',
    render: (_, record) => {
      const fan = pick(record.startData, ['fan1', 'fan2']);
      return Object.values(fan).join(',');
    },
  },
  {
    title: 'Start Time',
    dataIndex: ['startData', 'dataTime'],
    render: (time) => formatDate(time * 1000),
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    render: (_, record) => {
      const start = record.startData.dataTime * 1000;
      const now = new Date().getTime();
      const progress = +(((now - start) / (48 * 3600 * 1000)) * 100).toFixed(2);
      return <Progress percent={progress} size="small" />;
    },
  },
  {
    title: 'Alters Number',
    dataIndex: 'alters',
    render: (alters) => alters.length,
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
