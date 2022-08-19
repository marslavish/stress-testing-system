import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import StressTestingTable from './components/StressTestingTable';
import { request } from 'umi';

const StressTesting = () => {
  const [tableData, setTableData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
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
    const monitorInterval = setInterval(() => {
      getMonitor();
    }, 60000);

    return () => {
      clearInterval(monitorInterval);
    };
  }, []);

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
    // ...
  };

  const handleSaveClick = () => {
    // ...
  };

  const handleRepairClick = () => {
    // ...
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
            <Button onClick={handleSaveClick} disabled={isDisabled}>
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
