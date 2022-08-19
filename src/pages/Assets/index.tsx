import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import AssetsTable from './components/AssetsTable';
import LoginPage from './components/LoginPage';
import { request } from 'umi';

// TODO: set select element height properly (same with stress table)
// TODO: set global card container height

const Assets = () => {
  const [tableData, setTableData] = useState([]);
  // const [selectedOption, setSelectedOption] = useState<string>('');
  // const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const { Option } = Select;

  const getTableData = () => {
    request('/api/v1/server/miner/getMinersPage', {
      method: 'get',
      params: {
        page: 1,
        size: 20,
        status: null,
        mac: null,
      },
      headers: {
        Authorization: `Bearer ${token || JSON.parse(localStorage.getItem('user')!).token}`,
      },
    })
      .then((response) => {
        setTableData(response.data.content);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!token) return;
    getTableData();
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
      getTableData();
    }
    return;
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
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
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
            <AssetsTable tableData={tableData} refresh={getTableData} />
          </Card>
        </>
      )}
    </>
  );
};

export default Assets;
