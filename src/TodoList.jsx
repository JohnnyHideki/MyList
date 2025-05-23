import React, { useState, useEffect, use } from "react";
import './TodoList.css';
import Icone from './assets/icon.png';

function TodoList() {

    const listStorage = localStorage.getItem("List");

    const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        localStorage.setItem("List", JSON.stringify(list));
    }, [list]);


    function addItem(form) {
        form.preventDefault();
        if (newItem.trim() === "") {
            return;
        }
        setList([...list, { text: newItem, isCompleted: false }]);
        setNewItem("");
        document.getElementById("input").focus();
    }


    function clicked(index) {
        const newList = [...list];
        newList[index].isCompleted = !newList[index].isCompleted;
        setList(newList);
    }

    function deleted(index) {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    }

    function deletedAll() {
        setList([]);
    }
    return (
        <div>
            <h1>My List</h1>
            <form onSubmit={addItem}>
                <input
                    id="input"
                    type="text"
                    value={newItem}
                    onChange={(e) => { setNewItem(e.target.value) }}
                    placeholder="Add a new task"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listTasks">
                <div style={{ textAlign: "center" }}>
                    {
                        list.length < 1
                            ?
                            <img className="center-icon" src={Icone} />
                            :
                        
                            list.slice().reverse().map((item, index) => 
                            {
                                const realIndex = list.length - 1 - index;
                           
                            return (
                                   
                                <div className={item.isCompleted ? 'item complete' : 'item'} key={realIndex}>
                                    <span onClick={() => { clicked(realIndex) }}>{item.text}</span>
                                    <button onClick={() => { deleted(realIndex) }} className="del">Delete</button>
                                </div>

                            )
                         })
                    }
                    {

                        list.length > 0 &&
                        <button onClick={() => { deletedAll() }} className="deleteAll">Delete All</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList;