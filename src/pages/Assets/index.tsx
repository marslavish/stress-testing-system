import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import AssetsTable from './components/AssetsTable';
import LoginPage from './components/LoginPage';

// TODO: set select element height properly (same with stress table)

const initialData = {
  status: 'success',
  mac: 'mac',
  average: 'average',
  stress_testing_times: 9,
  last_testing_times: 2,
};

const Assets = () => {
  const [tableData, setTableData] = useState([initialData]);
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    // getTableData()
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

  const handleDisconnectClick = () => {
    // ...
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage />
      ) : (
        <>
          <div className={styles.title}>
            <h1>Assets</h1>
            <Button type="primary" onClick={handleDisconnectClick}>
              Disconnect
            </Button>
          </div>
          <Card>
            <div className={styles.inputWrapper}>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={handleSelectChange}
                className={styles.select}
              >
                <Option value="all">All</Option>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
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
            <AssetsTable tableData={tableData} />
          </Card>
        </>
      )}
    </>
  );
};

export default Assets;
