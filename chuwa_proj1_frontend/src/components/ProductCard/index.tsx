import styles from '../../styles/Products.module.css';
import btnStyles from '../../styles/Btn.module.css';

import { Card, Button, Flex } from 'antd';
import QuantitiController from '../QuantityController';

const { Meta } = Card;
const ItemCard = () => (
  <Card
    className={styles.productCard}
    hoverable
    styles={{body: {padding: '0.5rem'}}}
    cover={<img alt="example" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />}
    actions={[
      <Flex gap="small" justify="space-around" wrap>
        <Button className={btnStyles.uniformPrimaryBtn} style={{flexGrow: 1}} size='small'>Add</Button>
        {/* <QuantitiController /> */}
        <Button style={{flexGrow: 1}} size='small'>Edit</Button>
      </Flex>
    ]}
  >
    <Meta
      title={<p className={styles.productCardTitle}>Apple iPhone 11, 128G</p>}
      description={<p className={styles.productCardPrice}>$499.00</p>}
    />
  </Card>
);
export default ItemCard;