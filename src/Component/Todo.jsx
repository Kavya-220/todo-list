import React, { useEffect, useRef, useState } from 'react'
import todo_list from '../assets/todo_list.png'
import TodoItems from './TodoItems'
import './Todo.css'

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])
    const [editingId, setEditingId] = useState(null)

    const inputRef = useRef()

    const add = () => {
        const inputText = inputRef.current.value.trim()

        if (inputText === "") {
            return null
        }

        if (editingId) {
            setTodoList((prev) => prev.map(todo => 
                todo.id === editingId ? { ...todo, text: inputText } : todo
            ))
            setEditingId(null)
        } else {
            const newTodo = {
                id: Date.now(),
                text: inputText,
                isComplete: false,
            }
            setTodoList((prev) => [...prev, newTodo])
        }
        inputRef.current.value = ""
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo
            })
        })
    }

    const editTodo = (id) => {
        const todoToEdit = todoList.find(todo => todo.id === id)
        inputRef.current.value = todoToEdit.text
        setEditingId(id)
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoList))
    }, [todoList])

    return (
        <>
            <div className='bg-white container place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
                <div className="flex items-center mt-7 gap-2">
                    <img className='w-8' src={todo_list} alt="" />
                    <h1 className='text-3xl text-slate-50 font-semibold'>To-Do List</h1>
                </div>
                <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                    <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
                    <button onClick={add} className='border-none style rounded-full bg-red-500 w-32 h-14 text-large font-medium cursor-pointer text-white'>
                        {editingId ? "UPDATE" : "ADD +"}
                    </button>
                </div>
                <div>
                    {todoList.map((item, index) => {
                        return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} editTodo={editTodo} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Todo
