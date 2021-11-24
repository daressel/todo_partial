import { useState } from "react";

export const Pagination = ({items, handlePage}) => {
  const [activePage, setActivePage] = useState(0)
  
  // получаем количество страниц, исходя из количества items
  // .ceil - для окнугления в большую сторону
  const numberOfPages = Math.ceil(items.length/5);

  const handleClick = (newPage) => {
    if(newPage > (numberOfPages - 1) || newPage < 0){
      return 0
    }
    setActivePage(newPage)
    handlePage(newPage);
  }
  return(
    <div className="block" id="pagination">
      <span className="page arrow" onClick={() => handleClick(0)}>
        <i className="fas fa-angle-double-left"></i>
      </span>
      <span className="page arrow" onClick={() => handleClick(activePage + 1)}>
        <i className="fas fa-angle-left"></i>
      </span>
      {/* создаем массив из количества страниц элементов */}
      {[...Array(numberOfPages)].map((x, i) =>
        {
          let classes = 'page '
          i > activePage + 2 ? classes += 'no-vis ' : void(0)
          i < activePage - 2 ? classes += 'no-vis ' : void(0)
          i === activePage ? classes += 'active ' : void(0)
          return(<span className={classes} key={i+1} onClick={() => {handlePage(i); setActivePage(i)}}>{i+1}</span>)
        }
      )}
      <span className="page arrow" onClick={() => handleClick(activePage + 1)}>
        <i className="fas fa-angle-right"></i>
      </span>
      <span className="page arrow" onClick={() => handleClick(numberOfPages - 1)}>
      <i className="fas fa-angle-double-right"></i>
      </span>
      
      
    </div>
  )
}