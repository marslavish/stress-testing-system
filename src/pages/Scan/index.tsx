import { DownOutlined } from '@ant-design/icons';
import { Button, Card, InputNumber, Dropdown, Menu, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import styles from './index.less';

interface DataType {
  key: React.Key;
  ip: number;
  mac: string;
  avg_hashrate: number;
  realtime_hashrate: number;
  temp: number;
  pools: string;
}

const data: DataType[] = [
  {
    key: '1',
    ip: 1,
    mac: 'test',
    avg_hashrate: 2,
    realtime_hashrate: 3,
    temp: 3,
    pools: 'ok',
  },
  {
    key: '2',
    ip: 3,
    mac: 'hello',
    avg_hashrate: 8,
    realtime_hashrate: 4,
    temp: 1,
    pools: 'cola',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'IP Address',
    dataIndex: 'ip',
    sorter: {
      compare: (a, b) => a.ip - b.ip,
      multiple: 4,
    },
  },
  {
    title: 'MAC Address',
    dataIndex: 'mac',
  },
  {
    title: 'Average HashRate',
    dataIndex: 'avg_hashrate',
    sorter: {
      compare: (a, b) => a.avg_hashrate - b.avg_hashrate,
      multiple: 3,
    },
  },
  {
    title: 'Realtime HashRate',
    dataIndex: 'realtime_hashrate',
    sorter: {
      compare: (a, b) => a.realtime_hashrate - b.realtime_hashrate,
      multiple: 2,
    },
  },
  {
    title: 'Temperature',
    dataIndex: 'temp',
    sorter: {
      compare: (a, b) => a.temp - b.temp,
      multiple: 1,
    },
  },
  {
    title: 'Pools',
    dataIndex: 'pools',
  },
];

const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const menu = (
  <Menu
    // onClick={handleMenuClick}
    items={[
      {
        label: '1st menu item',
        key: '1',
      },
      {
        label: '2nd menu item',
        key: '2',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);

const Scan: React.FC = () => {
  const onChange = (value: number) => {
    console.log('changed', value);
  };

  return (
    <>
      <h1>Scan</h1>
      <Card>
        <div className={styles.form}>
          <div className={styles.field}>
            <div className={styles.option}>CIDR</div>
            <div className={styles.inputs}>
              <InputNumber
                min={0}
                defaultValue={192}
                onChange={onChange}
                className={styles.input}
              />
              <div className={styles.dot}>.</div>
              <InputNumber
                min={0}
                defaultValue={168}
                onChange={onChange}
                className={styles.input}
              />
              <div className={styles.dot}>.</div>
              <InputNumber min={0} defaultValue={5} onChange={onChange} className={styles.input} />
              <div className={styles.dot}>.</div>
              <InputNumber min={0} defaultValue={0} onChange={onChange} className={styles.input} />
              <div className={styles.slash}>/</div>
              <InputNumber min={0} defaultValue={24} onChange={onChange} className={styles.input} />
            </div>
            <Dropdown.Button
              type="primary"
              overlay={menu}
              placement="bottomRight"
              icon={<DownOutlined className={styles.icon} />}
              trigger={['click']}
              onClick={() => console.log('clicked')}
              className={styles.buttons}
              overlayClassName={styles.menu}
            >
              CIDR Scan
            </Dropdown.Button>
          </div>

          {/* ======FIELD====== */}

          <div className={styles.field}>
            <div className={styles.option}>IP Range</div>
            <div className={styles.inputs}>
              <InputNumber
                min={0}
                defaultValue={192}
                onChange={onChange}
                className={styles.input}
              />
              <div className={styles.dot}>.</div>
              <InputNumber
                min={0}
                defaultValue={168}
                onChange={onChange}
                className={styles.input}
              />
              <div className={styles.dot}>.</div>
              <InputNumber min={0} defaultValue={3} onChange={onChange} className={styles.input} />
              <div className={styles.dot}>.</div>
              <InputNumber min={0} defaultValue={0} onChange={onChange} className={styles.input} />
              <div className={styles.tilde}>~</div>
              <InputNumber defaultValue={192} className={styles.input} disabled={true} />
              <div className={styles.dot}>.</div>
              <InputNumber defaultValue={168} className={styles.input} disabled={true} />
              <div className={styles.dot}>.</div>
              <InputNumber min={0} defaultValue={3} onChange={onChange} className={styles.input} />
              <div className={styles.dot}>.</div>
              <InputNumber
                min={0}
                defaultValue={255}
                onChange={onChange}
                className={styles.input}
              />
            </div>
            {/* TODO: move dropdown menu to the left */}
            <Dropdown.Button
              type="primary"
              overlay={menu}
              placement="bottomRight"
              icon={<DownOutlined className={styles.icon} />}
              trigger={['click']}
              onClick={() => console.log('clicked')}
              className={styles.buttons}
              overlayClassName={styles.menu}
            >
              Range Scan
            </Dropdown.Button>
          </div>

          <Button disabled={true} className={styles.button}>
            Start Stress Testing
          </Button>
        </div>

        {/* ======TABLE====== */}

        <Table
          //TODO change tooltip language to English
          columns={columns}
          dataSource={data}
          rowSelection={{ ...rowSelection }}
        />
      </Card>
    </>
  );
};

export default Scan;
