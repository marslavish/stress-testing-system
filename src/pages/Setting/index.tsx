import { Button, Card, Input, message, Spin } from 'antd';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import styles from './index.less';

interface ISetting {
  hashRate: number;
  temperature: number;
  fanLow: number;
  fanHigh: number;
  testTime: number;
}

const Setting = () => {
  const [setting, setSetting] = useState<ISetting>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getSetting = async () => {
    request('/api/v1/getSetting', {
      method: 'get',
    })
      .then((response) => {
        setSetting(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSetting((prevState) => ({ ...prevState, [id]: Number(value) }));
  };

  const handleSaveClick = () => {
    setIsSaving(true);
    request('/api/v1/saveSetting', {
      method: 'post',
      data: setting,
    })
      .then(() => {
        setIsSaving(false);
        message.success('Save successful.');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Setting</h1>
        <Button type="primary" loading={isSaving} onClick={handleSaveClick}>
          Save
        </Button>
      </div>
      <Spin spinning={isLoading}>
        <Card>
          <div className={styles.instruction}>In what conditions the alert will be triggered: </div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.text}>Real-time hash rate is below than</div>
              <Input
                className={styles.input}
                suffix="TH/s"
                style={{ width: '104px' }}
                id="hashRate"
                value={setting?.hashRate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className={styles.wrapper}>
              <div className={styles.text}>Temperature is higher than</div>
              <Input
                className={styles.input}
                suffix="°C"
                style={{ width: '84px' }}
                id="temperature"
                value={setting?.temperature}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className={styles.wrapper}>
              <div className={styles.text}>Fan speed is out of the range between</div>
              <Input
                className={styles.input}
                suffix="RPM"
                style={{ width: '124px' }}
                id="fanLow"
                value={setting?.fanLow}
                onChange={(e) => handleInputChange(e)}
              />
              <div className={styles.text}>and</div>
              <Input
                className={styles.input}
                suffix="RPM"
                style={{ width: '124px' }}
                id="fanHigh"
                value={setting?.fanHigh}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className={styles.wrapper}>
              <div className={styles.text}>Pressure measurement time setting</div>
              <Input
                className={styles.input}
                suffix="h"
                style={{ width: '84px' }}
                id="testTime"
                value={setting?.testTime}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </Card>
      </Spin>
    </>
  );
};

export default Setting;
