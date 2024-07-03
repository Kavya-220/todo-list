import React from 'react';
import tick from '../assets/tick.png';
import delete_icon from '../assets/delete.png';
import not_tick from '../assets/not_tick.png';
import edit from '../assets/edit.png';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
    return (
        <div className="flex items-center my-3">
            <div onClick={() => toggle(id)} className='flex flex-1 items-center cursor-pointer'>
                <img className='w-6' src={isComplete ? tick : not_tick} alt="" />
                <p className={`text-slate-50 ml-2 text-size decoration-red-500 font-medium ${isComplete ? "line-through" : ""}`}>
                    {text}
                </p>
            </div>
            <div>
                <img onClick={() => editTodo(id)} src={edit} alt="" className='w-5 ml-2 cursor-pointer' />
            </div>
            <div>
                <img onClick={() => deleteTodo(id)} src={delete_icon} alt="" className='w-5 ml-2 cursor-pointer' />
            </div>
        </div>
    );
};

export default TodoItems;
