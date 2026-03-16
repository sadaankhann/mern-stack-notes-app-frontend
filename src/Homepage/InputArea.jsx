import React, { createContext, useContext, useState } from 'react'
import { Filenames } from './Homepage';

const InputArea = () => {

    const API = import.meta.process.env.VITE_API_URL

    const {filesName, setFilesName, text, background} = useContext(Filenames);

    const [heading, setHeading] = useState("");
    const [paragraph, setParagraph] = useState("");

    async function recallingForFileData() {
        const data = await fetch(`${API}/getfiles`, {
            method: 'GET',
            credentials: 'include'
        });
        const response = await data.json();
        setFilesName(response.files);
        setHeading("");
        setParagraph("");
    }

    async function bhejoDataBackend(e) {

        e.preventDefault();

        let sendingData = await fetch(`${API}/inputText`, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                heading: heading,
                paragraph: paragraph
            })
        });
        const response = await sendingData.json();
        if(response.success){
            recallingForFileData();
        }
    }

    return (
            <div className={`${text, background} flex gap-3`}>

                <form onSubmit={bhejoDataBackend} className={`${text} flex flex-col gap-5`}>
                    <input type="text" name="heading" id="" required value={heading} className={`${text} h-[40px] border-1 outline-none p-3 w-[400px]`} placeholder='Enter Heading' onChange={(e) => {
                        setHeading(e.target.value);
                    }} />
                    <input type="text" required name="paragraph" id="" value={paragraph} className=' h-[40px] border-1 outline-none p-3 w-[400px]' placeholder='Enter Data' onChange={(e) => {
                        setParagraph(e.target.value);
                    }} />
                    <button type='submit' className='p-1 bg-blue-600 rounded-sm text-white font-bold pl-3 pr-3'>Add Task</button>
                </form>
            </div> 

    )
}

export default InputArea

