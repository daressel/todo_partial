import { useEffect, useState } from "react";
import { AddItem } from "./components/AddItem";
import { List } from "./components/List";
import { SortFilterPanel } from "./components/SortFilterPanel";
import uuid from 'react-native-uuid';
import { Pagination, Row, Col, Alert } from "antd";


function App() {
  if (!localStorage.getItem('items')) localStorage.setItem('items', '[]')
  const [items, setItems] = useState(localStorage.getItem('items'))
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [alertMessege, setAlertMessege] = useState('')
  const [itemsOnPage, setItemsOnPage] = useState([]);
  const [countOfItems, setCountOfItems] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    let updateFilteredItems
    const itemsParse = JSON.parse(localStorage.getItem('items'))
    if(filter === 'all'){
      updateFilteredItems = itemsParse.slice(0).reverse()
    }
    else{
      updateFilteredItems = itemsParse.slice(0).reverse().filter(item => item.status === filter)
    }
    updateFilteredItems.sort(() => sort)
    const countItems = updateFilteredItems.length
    setCountOfItems(countItems)
    const updateShowItems = updateFilteredItems.slice((activePage-1)*pageSize, (activePage)*pageSize)
    if(updateShowItems.length){
      setAlertMessege('')
    }else if(sort === -1){
      setActivePage(Math.ceil(countItems/pageSize))
    }else if(updateShowItems.length === 0 && updateFilteredItems.length){
      setActivePage(Math.ceil((countItems - 1)/pageSize))
    }
    !updateShowItems.length ? setAlertMessege("Items is empty ^_^") : void(0)
    setItemsOnPage(updateShowItems)
    window.scrollTo(0, 0);

  }, [items, activePage, filter, sort, pageSize])
  

  //обработчик добавления нового item
  const handleAddItem = (name) => {
    const reg = /[\wа-яА-Я]/;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const curDate = new Date()
    const timeObj = {}
    timeObj.date = `${curDate.getDate()} ${months[curDate.getMonth()]}`
    let createdTime = ''    
    curDate.getHours().toString().length === 2 ? createdTime += curDate.getHours().toString() : createdTime += '0' + curDate.getHours().toString()
    createdTime += ':'
    curDate.getMinutes().toString().length === 2 ? createdTime += curDate.getMinutes().toString() : createdTime += '0' + curDate.getMinutes().toString()
    timeObj.time = createdTime
    if(!name.match(reg)){
      return 0
    }
    const newItem = {
      id: uuid.v4(),
      name: name.trim(),
      status: "undone",
      createdAt: timeObj
    }
    const allItems = JSON.parse(items)
    allItems.push(newItem)
    localStorage.setItem('items', JSON.stringify(allItems))
    setItems(localStorage.getItem('items'))
    if(sort === -1){
      if(itemsOnPage.length === 5){
        setActivePage(countOfItems)
      }
      else{
        setActivePage(countOfItems)
      }
    }else{
      setActivePage(1)
    }    
    setFilter('all')
  }

  // обработчик установки фильтра
  const handleFilteredItems = (typeFilter='all') => {
    setActivePage(1)
    setFilter(typeFilter)
  }
  // обработчик установки сортировки
  const handleSort = (sortType) => {
    setActivePage(1)
    setSort(sortType)
  }

  // обработчик удаления item
  const handleDeleteItem = (id) => {
    const updateStorageItems = JSON.parse(localStorage.getItem('items')).filter(item => item.id !== id)
    localStorage.setItem('items', JSON.stringify(updateStorageItems))
    setItems(localStorage.getItem('items'))
  }
  //обработчик установки страницы
  const handlePage = (number, pagesize) => {
    setActivePage(number)
    setPageSize(pagesize)
  }

  return (
    <Row justify='center'>
      <Col span={12}>
        <Row justify='center'>
          <h2>ToDo</h2>
        </Row>
        <Row justify='center'>
          <AddItem handleAddItem={handleAddItem}/>
        </Row>
        <SortFilterPanel filter={filter} sort={sort} handleFilter={handleFilteredItems} handleSort={handleSort}/>
       {alertMessege && <Row justify='center'>
          <Alert
            message={alertMessege}
            type='info'
          />
        </Row>}
        <Row justify='center'>
          <List items={itemsOnPage} handleDeleteItem = {handleDeleteItem}/>
        </Row>
        <Row justify='center'>
          <Pagination 
            style={{marginBottom: '50px'}}
            onChange={handlePage} 
            total={countOfItems} 
            defaultCurrent={0}
            current={activePage}
            defaultPageSize={pageSize} 
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 15, 20]}
            hideOnSinglePage={true}
          />
        </Row>
      </Col>
    </Row>
  );
}
export default App;