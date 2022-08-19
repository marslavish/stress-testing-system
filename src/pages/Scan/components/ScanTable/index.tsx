import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';

export interface IScanTable {
  key: React.Key;
  ip: string;
  mac: string;
  average: number;
  realtime: number;
  temperature: number;
}

interface ScanTableProps {
  tableData: IScanTable[];
  setIsDisabled: (arg: boolean) => void;
  setSelectedRows: (arg: IScanTable[]) => void;
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

const columns: ColumnsType<IScanTable> = [
  {
    title: 'IP Address',
    dataIndex: 'ip',
    sorter: {
      // compare: (a, b) => a.ip - b.ip,
      multiple: 4,
    },
    render: (ip) => <a>{ip}</a>,
  },
  {
    title: 'MAC Address',
    dataIndex: 'mac',
  },
  {
    title: 'Average HashRate',
    dataIndex: 'average',
    render: (avg) => (
      <span className={avg <= SETTING.AVERAGE * 1000000 ? styles.danger : ''}>
        {formatHashRate(avg)}
      </span>
    ),
    sorter: {
      compare: (a, b) => a.average - b.average,
      multiple: 3,
    },
  },
  {
    title: 'Realtime HashRate',
    dataIndex: 'realtime',
    sorter: {
      compare: (a, b) => a.realtime - b.realtime,
      multiple: 2,
    },
    render: (avg) => formatHashRate(avg),
  },
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    sorter: {
      compare: (a, b) => a.temperature - b.temperature,
      multiple: 1,
    },
    render: (temp) => (
      <span className={temp >= SETTING.TEMPERATURE ? styles.danger : ''}>
        {`${temp.toFixed(2)}℃`}
      </span>
    ),
  },
  {
    title: 'Pools',
    // dataIndex: 'pools',
  },
];

const ScanTable = ({ tableData, setIsDisabled, setSelectedRows }: ScanTableProps) => {
  return (
    <Table
      //TODO: change tooltip language to English
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

export default ScanTable;
