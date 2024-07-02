// import React from 'react';
import { Card, Button, Flex } from 'antd';
const { Meta } = Card;
const App = () => (
  <Card
    hoverable
    style={{
      gridColumn: "span 3",
      padding: "0.5rem",
      border: "1px solid #CCCCCC",
      borderRadius: "5px"
    }}
    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
    actions={[
      <Flex style={{margin: "0 0.5rem"}} gap="small" justify="space-around" wrap>
        <Button style={{flexGrow: 1}} type="primary">Add</Button>
        <Button style={{flexGrow: 1}}>Edit</Button>
      </Flex>
    ]}
  >

    <Meta
      title={<p style={{ fontSize: '0.8rem', fontWeight: '500', color: "#6B7280" }}>Apple iPhone 11, 128G</p>}
      description={<p style={{ fontSize: '1.1rem', fontWeight: '600', color: "black" }}>$499.00</p>}
    />
  </Card>
);
export default App;