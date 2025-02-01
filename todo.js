import React, { useState , useEffect} from 'react';
import "./style.css";
// get data from local storage
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if(lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const[inputdata, setInputData] = useState("");
  const[items, setItems] = useState(getLocalData());
  const[EditItem, setIsEditItem] = useState("");
  const[togglebutton, setTogglebutton] = useState(false);

  const addItem = () => {
    if(!inputdata){
      alert("please fill the data");
    } else if (inputdata && togglebutton){
      setItems(
        items.map((curElem)=>{
          if(curElem.id === EditItem){
            return {...curElem, name : inputdata};
          }
          return curElem;
         })
      );
    setInputData("")
    setIsEditItem(null);
    setTogglebutton(false);
    }
    else {
      const myNewInputData = {
      id: new Date().getTime().toString(),
      name : inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  // edit the items
  const editItem = (index) => {
    const item_todo_edited  = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name)
    setIsEditItem(index);
    setTogglebutton(true);
  };
  // delete the items
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) =>{
      return curElem.id !== index;
  }); 
  setItems(updatedItems);
  };
  // remove all from list
  const removeAll = () => {
    setItems([]);
  };
  // add element to local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  },[items]);

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src='./images/todo.svg' alt='todologo'/>
                <figcaption> Add Your List Here ✌️</figcaption>
            </figure>
            <div className='addItems'> 
                <input type = 'text' 
                placeholder='✍️ Add Item/' 
                className='form-control'
                value={inputdata}
                onChange={(event) => setInputData(event.target.value)}
                />
                {togglebutton ? ( 
                <i className ="far fa-edit add-btn" onClick={addItem}></i>
                ) : (
                  <i className ="fa-solid fa-plus" onClick={addItem}></i>
                )}
            </div>
            {/* show our items*/}
            <div className='showItems'>
              {items.map((curElem)=> {
                return (
                  <div className='eachItem'>
                  <h3> {curElem.name} </h3>
                  <div className='todo-btn'>
                  <i className ="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                  <i className ="far fa-trash-alt add-btn"
                  onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
                );
              })}
            </div>
            {/* remove all button */}
            <div className='showItems'>
              <button className='btn-effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                <span> CHECK LIST</span>
              </button>
            </div>
            </div> 
      </div>
    </> 
  );
};

export default Todo;
