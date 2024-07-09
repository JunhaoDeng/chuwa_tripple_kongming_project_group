import styles from '../../styles/Products.module.css';
import btnStyles from '../../styles/Btn.module.css';

import { Card, Button, Flex } from 'antd';
import QuantitiController from '../QuantityController';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const { Meta } = Card;

type ItemCardPropsType = {
  index: number // the index where this item locate in the state.products.product_list
}
const ItemCard = (props: ItemCardPropsType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const product: any = useSelector((state: RootState) => state.products.product_list[props.index]);

  return <Card
    className={styles.productCard}
    hoverable
    styles={{body: {padding: '0.5rem'}}}
    cover={<img alt="example" src={ product.image_link } />}
    actions={[
      <Flex gap="small" justify="space-around" wrap>
        <Button className={btnStyles.uniformPrimaryBtn} style={{flexGrow: 1}} size='small'>Add</Button>
        {/* <QuantitiController /> */}
        <Button style={{flexGrow: 1}} size='small'>Edit</Button>
      </Flex>
    ]}
  >
    <Meta
      title={<p className={styles.productCardTitle}>{ product.name }</p>}
      description={<p className={styles.productCardPrice}>{ (product.price / 100).toFixed(2) }</p>}
    />
  </Card>
};
export default ItemCard;