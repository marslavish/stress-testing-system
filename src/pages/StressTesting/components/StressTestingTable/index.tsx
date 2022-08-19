import formatDate from '@/utils/formatDate';
import formatHashRate from '@/utils/formatHashRate';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Progress, Table, Typography } from 'antd';
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

const { Text, Link } = Typography;

const menu = (
  <Menu
    // onClick={onMenuClick}
    items={[
      {
        key: '1',
        label: <Text>Restart</Text>,
      },
      {
        key: '2',
        label: <Link>Complete</Link>,
      },
      {
        key: '3',
        label: <Link type="danger">Repair</Link>,
      },
      {
        key: '4',
        label: <Text>Download log</Text>,
      },
    ]}
  />
);

const columns: ColumnsType<IStressTestingTable> = [
  {
    title: 'MAC Address',
    dataIndex: 'mac',
    width: 160,
    align: 'center',
  },
  {
    title: 'IP Address',
    dataIndex: 'ip',
    width: 160,
    align: 'center',
    render: (ip) => <a>{ip}</a>,
  },
  {
    title: 'Realtime HashRate',
    dataIndex: ['startData', 'realtime'],
    align: 'center',
    render: (realtime) => formatHashRate(realtime),
  },
  {
    title: 'Pools',
    align: 'center',
    render: (_, record) => {
      const pool = pick(record.startData, ['pool1', 'pool2', 'pool3']);
      return Object.values(pool).join('');
    },
  },
  {
    title: 'Temperature',
    dataIndex: ['startData', 'temperature'],
    align: 'center',
    render: (temp) => (
      <span className={temp >= SETTING.TEMPERATURE ? styles.danger : ''}>
        {`${temp.toFixed(2)}℃`}
      </span>
    ),
  },
  {
    title: 'Fan Speed',
    align: 'center',
    render: (_, record) => {
      const fan = pick(record.startData, ['fan1', 'fan2']);
      return Object.values(fan).join(',');
    },
  },
  {
    title: 'Start Time',
    align: 'center',
    dataIndex: ['startData', 'dataTime'],
    render: (time) => formatDate(time),
  },
  {
    title: 'Progress',
    align: 'center',
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
    align: 'center',
    dataIndex: 'alters',
    render: (alters) => alters.length,
  },
  {
    title: 'Operation',
    align: 'center',
    fixed: 'right',
    width: 150,
    render: () => (
      <Dropdown.Button overlay={menu} icon={<DownOutlined className={styles.icon} />}>
        Details
      </Dropdown.Button>
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
          setIsDisabled(selectedRowKeys.length > 0 ? false : true);
          setSelectedRows(selectedRows);
        },
      }}
      rowKey="ip"
      scroll={{ x: 1500 }}
    />
  );
};

export default StressTestingTable;
