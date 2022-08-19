import { CloseCircleOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Spin, Menu, message } from 'antd';
import { pick } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import CIDRInputField from './components/CIDRInputField';
import RangeInputField from './components/RangeInputField';
import type { IScanTable } from './components/ScanTable';
import ScanTable from './components/ScanTable';
import styles from './index.less';
import { request } from 'umi';

// TODO: dropdown (save ip), start stress testing
// TODO: min-width, responsive input fields, remove built-in login, refactor ws send msg
// TODO: clean up component css, organize code by grouping with comments, delete unneccesary files
// TODO: get lint-staged:js back

const Scan: React.FC = () => {
  const [ipAddrs, setIpAddrs] = useState<number[]>([192, 168, 5, 0, 24]);
  const [rangeAddrs, setRangeAddrs] = useState<number[]>([192, 168, 5, 0, 5, 255]);
  const [tableData, setTableData] = useState<IScanTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>('0%');
  const [socket, setSocket] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedRows, setSelectedRows] = useState<IScanTable[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);

  const onIpChange = (id: number) => (value: number) => {
    setIpAddrs((prev) => prev.map((ip, idx) => (idx === id ? value : ip)));
  };

  const onRangeChange = (id: number) => (value: number) => {
    setRangeAddrs((prev) => prev.map((ip, idx) => (idx === id ? value : ip)));
  };

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('ipDefault', JSON.stringify([ipAddrs, rangeAddrs]));
    } else {
      isMounted.current = true;
    }
  }, [ipAddrs, rangeAddrs]);

  useEffect(() => {
    const savedIp = localStorage.getItem('ipDefault');
    if (savedIp) {
      setIpAddrs(JSON.parse(savedIp)[0]);
      setRangeAddrs(JSON.parse(savedIp)[1]);
    }
  }, []);

  const formatIp = (ip: number[], sep = '.'): string => {
    return ip.join(sep).replace(/\.(?=[^.]*$)/, '/');
  };

  const getIps = (data: IScanTable[]) => data.map((item) => item.ip);

  const handleScanClick = (scanType: string) => () => {
    setProgress('0%');
    setIsLoading(true);

    const scanTypes = {
      CIDRScan: 'wsCIDR',
      RangeScan: 'wsRangeScan',
    };

    const ws = new WebSocket(`ws://192.168.3.26:38725/ws/${scanTypes[scanType]}`);
    setSocket(ws);

    ws.onopen = function () {
      console.log('ws open');
      if (scanType === 'CIDRScan') {
        ws.send(`{"host":"${formatIp(ipAddrs)}","ipFirst":${JSON.stringify(getIps(tableData))}}`);
        return;
      }
      ws.send(
        `{
          "ip1":${rangeAddrs[0]},
          "ip2":${rangeAddrs[1]},
          "ip3":${rangeAddrs[2]},
          "ip4":${rangeAddrs[3]},
          "ip5":${rangeAddrs[4]},
          "ip6":${rangeAddrs[5]},
          "ipFirst":${JSON.stringify(getIps(tableData))}
        }`,
      );
      setTableData([]);
    };

    ws.onmessage = function (event) {
      console.log('ws message:');
      console.log(JSON.parse(event.data).data);
      setTableData((prev) => [...prev, ...JSON.parse(event.data).data.devices]);
      setProgress(`${JSON.parse(event.data).data.progress}%`);
    };

    ws.onclose = function (event) {
      console.log('ws close:');
      if (event.wasClean) {
        console.log(`[close] code=${event.code} reason=${event.reason}`);
      } else {
        // 例如服务器进程被杀死或网络中断
        // 在这种情况下，event.code 通常为 1006
        setIsLoading(false);
        console.log('[close] Connection died');
      }
    };

    ws.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };
  };

  const handleStopClick = () => {
    setIsLoading(false);
    if (socket) socket.close();
  };

  const handleTestingClick = () => {
    setIsSaving(true);
    const data = {
      minerAddresses: selectedRows.map((row) => pick(row, ['mac', 'ip'])),
    };
    request('/api/v1/addToMonitor', {
      method: 'post',
      data: data,
    })
      .then(() => {
        setIsSaving(false);
        message.success('Save successful.');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loading = (
    <div className={styles.loading}>
      <div>
        <LoadingOutlined style={{ fontSize: 50 }} spin={false} />
        <div className={styles.loadingTips}>{progress}</div>
      </div>
      <Button type="primary" className={styles.stopBtn} onClick={handleStopClick}>
        stop scanning
      </Button>
    </div>
  );

  const menu = (
    <Menu
      // onClick={handleMenuClick}
      items={[
        {
          label: (
            <div className={styles.ipItem}>
              <div className={styles.ipWrapper}>{formatIp(ipAddrs, ' . ')}</div>
              <CloseCircleOutlined className={styles.circle} />
            </div>
          ),
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

  return (
    <>
      {/* TODO: change title style */}
      <h1>Scan</h1>
      <Spin spinning={isLoading} indicator={loading}>
        <Card>
          <div className={styles.form}>
            <div className={styles.field}>
              <CIDRInputField onIpChange={onIpChange} ipAddrs={ipAddrs} />
              <Dropdown.Button
                type="primary"
                overlay={menu}
                placement="bottomRight"
                icon={<DownOutlined className={styles.icon} />}
                trigger={['click']}
                onClick={handleScanClick('CIDRScan')}
                className={styles.buttons}
                overlayClassName={styles.menu}
              >
                CIDR Scan
              </Dropdown.Button>
            </div>

            {/* ======FIELD====== */}

            <div className={styles.field}>
              <RangeInputField onRangeChange={onRangeChange} rangeAddrs={rangeAddrs} />
              <Dropdown.Button
                type="primary"
                overlay={menu}
                placement="bottomRight"
                icon={<DownOutlined className={styles.icon} />}
                trigger={['click']}
                onClick={handleScanClick('RangeScan')}
                className={styles.buttons}
                overlayClassName={styles.menu}
              >
                Range Scan
              </Dropdown.Button>
            </div>

            <Button
              type="primary"
              disabled={isDisabled}
              className={styles.button}
              onClick={handleTestingClick}
              loading={isSaving}
            >
              Start Stress Testing
            </Button>
          </div>

          {/* ======TABLE====== */}
          <ScanTable
            tableData={tableData}
            setIsDisabled={setIsDisabled}
            setSelectedRows={setSelectedRows}
          />
        </Card>
      </Spin>
    </>
  );
};

export default Scan;
