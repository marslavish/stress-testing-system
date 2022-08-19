import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import StressTestingTable from './components/StressTestingTable';
import { request } from 'umi';
import { pick } from 'lodash';

const StressTesting = () => {
  const [tableData, setTableData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isRestarting, setIsRestarting] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('');
  // const [searchQuery, setSearchQuery] = useState('');

  const { Option } = Select;

  const getMonitor = () => {
    request('/api/v1/getMonitor', {
      method: 'get',
    })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMonitor();

    const monitorInterval = setInterval(() => {
      getMonitor();
    }, 60000);

    return () => {
      clearInterval(monitorInterval);
    };
  }, []);

  const addStressTest = (statusCode: 0 | 1) => {
    request('/api/v1/server/miner/addStressTest', {
      method: 'post',
      data: { ...selectedRows[0], status: statusCode },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`,
      },
    })
      .then(() => {
        // setIsSaving(false);
        // message.success('Save successful.');
        console.log('addStressTest: success');
      })
      .catch((error) => console.log(error));
  };

  const removeFromMonitor = () => {
    request('/api/v1/removeFromMonitor', {
      method: 'post',
      data: { mac: selectedRows.map((record) => record.mac) },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`,
      },
    })
      .then(() => {
        // setIsSaving(false);
        // message.success('Save successful.');
        console.log('removeFromMonitor: success');
      })
      .catch((error) => console.log(error));
  };

  const addToMonitor = () => {
    request('/api/v1/addToMonitor', {
      method: 'post',
      data: {
        minerAddresses: selectedRows.map((row) => pick(row, ['mac', 'ip'])),
      },
    })
      .then(() => {
        setIsRestarting(false);
      })
      .catch(console.log);
  };

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleInputChange = () => {
    // ...setSearchQuery()
  };

  const handleSearchClick = () => {
    // ...
  };

  const handleCompleteClick = () => {
    addStressTest(0);
    removeFromMonitor();
    getMonitor();
  };

  const handleRestartClick = () => {
    setIsRestarting(true);
    removeFromMonitor();
    addToMonitor();
    getMonitor();
  };

  const handleRepairClick = () => {
    addStressTest(1);
    removeFromMonitor();
    getMonitor();
  };

  return (
    <>
      <h1>Stress Testing</h1>
      <Card>
        <div className={styles.inputWrapper}>
          <Select
            defaultValue="All"
            style={{ width: 120 }}
            onChange={handleSelectChange}
            className={styles.select}
          >
            <Option value="all">All</Option>
            <Option value="completed">Completed</Option>
            <Option value="executing">Executing</Option>
          </Select>
          <Input
            placeholder="Worker Name or IP or MAC Address"
            prefix={<SearchOutlined />}
            className={styles.input}
            onChange={handleInputChange}
          />
          <Button type="primary" onClick={handleSearchClick}>
            Search
          </Button>
        </div>
        <div className={styles.btnWrapper}>
          <Space size={16}>
            <Button type="primary" onClick={handleCompleteClick} disabled={isDisabled}>
              Complete
            </Button>
            <Button onClick={handleRestartClick} disabled={isDisabled} loading={isRestarting}>
              Restart
            </Button>
            <Button danger onClick={handleRepairClick} disabled={isDisabled}>
              Repair
            </Button>
          </Space>
        </div>
        <StressTestingTable
          tableData={tableData}
          setIsDisabled={setIsDisabled}
          setSelectedRows={setSelectedRows}
        />
      </Card>
    </>
  );
};

export default StressTesting;
