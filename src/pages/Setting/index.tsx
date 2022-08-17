import { Button, Card, Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

const initialSetting = {
  hashrate: 80,
  temperature: 30,
  minspeed: 20,
  maxspeed: 90,
  time: 50,
};

const Setting = () => {
  const [setting, setSetting] = useState(initialSetting);

  useEffect(() => {
    // getCurrentSetting()
  }, []);

  const handleInputChange = (e) => {
    // setSetting(prev => { ...prev, e.target.id: e.target.value })
  };

  const handleSaveClick = () => {
    // post setting to the server
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Scan</h1>
        <Button type="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </div>
      <Card>
        <div className={styles.instruction}>In what conditions the alert will be triggered: </div>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.text}>Real-time hash rate is below than</div>
            <Input
              className={styles.input}
              suffix="TH/s"
              style={{ width: '104px' }}
              id="hashrate"
              value={setting.hashrate}
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
              value={setting.temperature}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.text}>Fan speed is out of the range between</div>
            <Input
              className={styles.input}
              suffix="RPM"
              style={{ width: '124px' }}
              id="minspeed"
              value={setting.minspeed}
              onChange={(e) => handleInputChange(e)}
            />
            <div className={styles.text}>and</div>
            <Input
              className={styles.input}
              suffix="RPM"
              style={{ width: '124px' }}
              id="maxspeed"
              value={setting.maxspeed}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.text}>Pressure measurement time setting</div>
            <Input
              className={styles.input}
              suffix="h"
              style={{ width: '84px' }}
              id="time"
              value={setting.time}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Setting;
