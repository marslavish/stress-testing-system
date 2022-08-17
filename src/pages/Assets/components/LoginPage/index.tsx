import { Button, Card, Input } from 'antd';
import styles from './index.less';

const LoginPage = () => {
  return (
    <>
      <h1>Assets</h1>
      <Card className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.field}>
            <div className={styles.text}>服务端地址</div>
            <Input placeholder="输入服务端地址" />
          </div>
          <div className={styles.field}>
            <div className={styles.text}>用户名</div>
            <Input placeholder="输入用户名" />
          </div>
          <div className={styles.field}>
            <div className={styles.text}>密码</div>
            <Input placeholder="输入密码" />
          </div>
          <Button type="primary" block className={styles.btn} size="large">
            Connect
          </Button>
        </div>
      </Card>
    </>
  );
};

export default LoginPage;
