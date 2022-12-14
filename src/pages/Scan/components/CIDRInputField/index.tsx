import { InputNumber } from 'antd';
import styles from './index.less';

interface CIDRInputProps {
  onIpChange: (id: number) => (value: number) => void;
  ipAddrs: number[];
}

const CIDRInputField = ({ onIpChange, ipAddrs }: CIDRInputProps) => {
  return (
    <>
      <div className={styles.option}>CIDR</div>
      <div className={styles.inputs}>
        <InputNumber
          className={styles.input}
          min={0}
          defaultValue={192}
          onChange={onIpChange(0)}
          value={ipAddrs[0]}
        />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={168}
          onChange={onIpChange(1)}
          value={ipAddrs[1]}
          className={styles.input}
        />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={5}
          onChange={onIpChange(2)}
          value={ipAddrs[2]}
          className={styles.input}
        />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={0}
          onChange={onIpChange(3)}
          value={ipAddrs[3]}
          className={styles.input}
        />
        <div className={styles.slash}>/</div>
        <InputNumber
          min={0}
          defaultValue={24}
          onChange={onIpChange(4)}
          value={ipAddrs[4]}
          className={styles.input}
        />
      </div>
    </>
  );
};

export default CIDRInputField;
