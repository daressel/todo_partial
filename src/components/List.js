import Item from "./Item";
import {Col} from "antd"

export const List = ({items, handleDeleteItem}) => {
  return(
    <Col span={24} className="items">
      {items.map(item => {
        return(
          <div key={item.id} style={{margin: 10}}>
            <Item item = {item} handleDeleteItem = {handleDeleteItem}/>
          </div>
        )
      })}
    </Col>
  )  
}