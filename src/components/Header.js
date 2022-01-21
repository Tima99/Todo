import React, { useEffect } from "react";
import List from "./List";
import { v4 as uuid } from 'uuid';
import "../css/header.css";

const LOCAL_STORAGE_KEY = 'addItems'

let addItemsArr =null

function Header() {
    const [addItem, setItem] = React.useState([]);
    let inputRef = React.useRef();
    addItemsArr = [...addItem]

    function AddDoIt(e) {
        e.preventDefault();
        let item = inputRef.current.value;
        let uniqueID = uuid()
        setItem( prevAddItem => [
            ...prevAddItem,
            <List item={item} id={uniqueID} key={uniqueID} remove={Remove}/>
        ]);
        inputRef.current.value = null
    }
    
    function Remove(uuID){
        let items = [...addItemsArr]
        items.splice(items.indexOf(items.find(item => item.props.id == uuID)), 1)
        setTimeout(()=> setItem([...items]) , 100)
    }

    useEffect(()=>{
        let savedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        savedItems && savedItems.forEach( store => {
            let uniqueID = uuid()
            setItem( prevAddItem => [
                ...prevAddItem,
                <List item={store.item} id={uniqueID} key={uniqueID} remove={Remove}/>
            ])
        })
    }, [])
    
    useEffect(()=>{
        let saveItem = [...addItem] 
        saveItem = saveItem.map(item => item.props)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveItem))
    } , [addItem])

    return (
        <div>
            <img src="./images/checklist.png" alt="image" className="bgImage"/>
            <div className="date">{new Date().toDateString()}</div>
            <form className="input-container" onSubmit={AddDoIt}>
                {(!addItem.length && <div className="shadow-text" >Add Work for Accomplish</div>)}

                <input
                    type="text"
                    name="add-todo"
                    placeholder="Typing..."
                    ref={inputRef}
                />
                <div className="left-doits">{addItem.length} Left</div>
                {addItem}
            </form>
        </div>
    );
}

export default Header;
