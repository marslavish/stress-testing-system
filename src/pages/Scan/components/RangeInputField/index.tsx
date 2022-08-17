import { InputNumber } from 'antd';
import styles from './index.less';

interface RangeInputProps {
  onRangeChange: (id: number) => (value: number) => void;
  rangeAddrs: number[];
}

const RangeInputField = ({ onRangeChange, rangeAddrs }: RangeInputProps) => {
  return (
    <>
      <div className={styles.option}>IP Range</div>
      <div className={styles.inputs}>
        <InputNumber
          min={0}
          defaultValue={192}
          onChange={onRangeChange(0)}
          className={styles.input}
          value={rangeAddrs[0]}
        />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={168}
          onChange={onRangeChange(1)}
          className={styles.input}
          value={rangeAddrs[1]}
        />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={3}
          onChange={onRangeChange(2)}
          className={styles.input}
          value={rangeAddrs[2]}
        />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={0}
          onChange={onRangeChange(3)}
          className={styles.input}
          value={rangeAddrs[3]}
        />
        <div className={styles.tilde}>~</div>
        <InputNumber defaultValue={192} className={styles.input} disabled={true} />
        <div className={styles.dot}>.</div>
        <InputNumber defaultValue={168} className={styles.input} disabled={true} />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={3}
          onChange={onRangeChange(4)}
          className={styles.input}
          value={rangeAddrs[4]}
        />
        <div className={styles.dot}>.</div>
        <InputNumber
          min={0}
          defaultValue={255}
          onChange={onRangeChange(5)}
          className={styles.input}
          value={rangeAddrs[5]}
        />
      </div>
    </>
  );
};

export default RangeInputField;
