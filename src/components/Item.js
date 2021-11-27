import {Col, Row, Checkbox, Button, Typography} from "antd"
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from "react";

const Item = ({item, handleDeleteItem}) => {
  const [status, setStatus] = useState(item.status)
  const [name, setName] = useState(item.name)

  const handleEditName = (newName) => {
    const reg = /[\wа-яА-Я]/;
    if(newName.match(reg)){
      item.name = newName
      handleEditItem('name', newName, item.id)
      setName(newName)
    }
  }

  const handleEditStatus = () => {
    if(item.status === 'done'){
      handleEditItem('status', 'undone', item.id)
      setStatus('undone')
    }
    else{
      handleEditItem('status', 'done', item.id)
      setStatus('done')
    }    
  }

  const handleEditItem = (parName, parVal, id) => {
    const updateStorageItems = JSON.parse(localStorage.getItem('items'))
    const item = updateStorageItems.find(item => item.id === id)
    const itemIndex = updateStorageItems.findIndex(item => item.id === id)
    item[parName] = parVal
    updateStorageItems[itemIndex] = item
    localStorage.setItem('items', JSON.stringify(updateStorageItems))
  }

  return (
    <Row justify='center' className='item'>
      <Col span={3} className='item-data'>
        <Checkbox
          checked={status === 'done' ? true : false}
          onChange={handleEditStatus}
        ></Checkbox>
      </Col>
      <Col span={14} className='item-data'>
        <Typography.Text
          editable={{onChange: handleEditName}}
        >
          {name}
        </Typography.Text>
      </Col>
      <Col span={5}>
        {`${item.createdAt.time} ${item.createdAt.date}`}
      </Col>
      <Col span={2}>
        <Button
          danger={true}
          type='primary'
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteItem(item.id)}
        >
        </Button>        
      </Col>
    </Row>
  );
}
 
export default Item;