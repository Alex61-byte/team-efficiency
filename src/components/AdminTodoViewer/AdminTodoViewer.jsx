import React, { useEffect, useState } from 'react'
import './AdminTodoViewer.css'
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { MdDeleteOutline } from 'react-icons/md'
import { Alert } from 'react-bootstrap';

export default function AdminTodoViewer({ data, user }) {
    const [dataProp, setDataProp] = useState([])
    console.log(dataProp)
    const [id, setId] = useState()
    console.log(id)
    console.log(user)


    function handelChange(id) {
        const newData = [...data];
        const todo = newData.find(todo => todo.id === id)
        todo.todoDone = !todo.todoDone
        setDataProp(newData)
        //setId(id)
        console.log(newData)
    }

    async function DeleteTodo(e) {
        const db = getFirestore()
        await deleteDoc(doc(db, "todo", "team", user, e))
    }

    useEffect(() => {
        setDataProp(data)
    }, [data])

    if (dataProp === null) {
        return (
            <div>
                <Alert variant="info">NO Todo's</Alert>
            </div>
        )
    } else {

        return (
            <div className="todos-container">



                {dataProp.map((data) => {
                    if (data === null) {
                        return <div className="todo-empty">
                            <Alert variant="warning" className="todo-alert">NO Todo's</Alert>
                        </div>


                    } else {
                        return <div className="view-todo" key={data.id}>

                            <h1>{data.todoTitle}</h1>
                            <h3>{data.todoText}</h3>
                            <p className="check-label">Due Date {data.todoDueDate}</p>
                            <label className="check-label" htmlFor="todo">Status</label>
                            <input className="check-box" type="checkbox" name={data.id} id={data.id} checked={data.todoDone} onChange={(e) => handelChange(e.target.id)} />
                            <br />
                            <button className="btn btn-danger btn-del" id={data.id} onClick={(e) => DeleteTodo(e.target.id)}><MdDeleteOutline className="delete" />Delete Todo</button>

                        </div>

                    }
                })}

            </div>
        )
    }
}

