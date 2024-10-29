import React, { useState } from 'react';
import { BsLightningChargeFill } from "react-icons/bs";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegTrashAlt } from "react-icons/fa";
import "./List.css";
import { v4 as uuidv4 } from 'uuid';

const List = () => {
    const [date, setDate] = useState(new Date());
    const handleDateChange = (newDate) => {
        setDate(newDate);
        console.log('Selected date:', newDate.toDateString());
    };

    const [text, setText] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let date = new Date()
        if(!text.trim()){
            return null
        }
        let newTodos = {
            id: uuidv4(),
            text,
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setData([...data, newTodos]);
        setText("");
        closeHolder();
    };

    const [isVisible, setIsVisible] = useState(false);
    const openHolder = () => {
        setIsVisible(true);
    };

    const closeHolder = () => {
        setIsVisible(false);
    };

    return (
        <main className='h-[100vh]'>
            <div className="bg-[rgb(38,38,38)] bg-opacity-100 text-white w-[13rem] h-full fixed px-5 py-3 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-3xl font-semibold">
                    <BsLightningChargeFill className='text-yellow-400' />
                    <h2>Bekzod</h2>
                </div>
                <div className="mt-5">
                    <div className="w-full h-12 bg-[rgb(242,200,107)] bg-opacity-100 text-black flex items-center rounded-md px-4 cursor-pointer hover:bg-yellow-700 hover:text-white font-semibold">
                        New List
                    </div>
                </div>
            </div>
            <div className="bg-[rgb(23,23,23)] bg-opacity-100 h-full w-full flex flex-col">
                <div className='flex justify-center pt-9'>
                    <div className='flex text-white justify-between w-[560px]'>
                        <div className='cursor-pointer hover:bg-slate-400 h-6 rounded-md hover:opacity-80 px-1 text-[rgb(212,212,212)] text-opacity-100' onClick={openHolder}>
                            <h2>+ Add Todo</h2>
                        </div>
                        <div className='cursor-pointer hover:bg-slate-400 h-6 rounded-md hover:opacity-80 px-1 text-[rgb(212,212,212)] text-opacity-100'>
                            <h2>Sort</h2>
                        </div>
                    </div>
                </div>
                <div className='mt-16 text-center flex justify-center flex-col items-center gap-3'>
                    {data.map((item) => (
                        <div key={item.id} className="flex items-center w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md justify-between">
                            <div>
                                <p className="text-gray-300 font-medium">{item.text}</p>
                                <p className="text-sm text-gray-500 text-left">{item.time}</p>
                            </div>
                            <div>
                                <FaRegTrashAlt className='text-white cursor-pointer' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[rgb(38,38,38)] bg-opacity-100 w-[320px] h-full fixed right-0 top-0 px-5 py-3 flex flex-col items-center">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="custom-calendar"
                />
                <button className='bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out mt-6'>Clear Filter</button>
            </div>
            {isVisible && (
                <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[649px] h-[340px] bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 text-gray-300">
                    <div className="text-lg font-semibold text-center text-gray-400">+ Add Todo</div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <input
                            type="text"
                            value={text} onChange={(e) => setText(e.target.value)}
                            placeholder="Todo's Title"
                            className="w-full p-2 bg-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <div className="flex justify-between space-x-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Date</label>
                                <input
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    className="w-full p-2 bg-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400">Priority</label>
                                <div className="flex items-center space-x-2">
                                    <label className="flex items-center space-x-1">
                                        <input type="radio" name="priority" className="text-yellow-500 focus:ring-0" />
                                        <span>High</span>
                                    </label>
                                    <label className="flex items-center space-x-1">
                                        <input type="radio" name="priority" className="text-yellow-500 focus:ring-0" />
                                        <span>Mid</span>
                                    </label>
                                    <label className="flex items-center space-x-1">
                                        <input type="radio" name="priority" className="text-yellow-500 focus:ring-0" />
                                        <span>Low</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400">Tags</label>
                            <input
                                type="text"
                                placeholder="separate tags with comma"
                                className="w-full p-2 bg-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button type='button' className="px-4 py-2 bg-yellow-500 text-gray-800 font-semibold rounded-md" onClick={closeHolder}>Cancel</button>
                            <button type='submit' className="px-4 py-2 bg-yellow-500 text-gray-800 font-semibold rounded-md">Add</button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}

export default List;