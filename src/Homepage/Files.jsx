import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import { Filenames } from './Homepage';

const Files = () => {

    const { filesName, setFilesName, text, background } = useContext(Filenames);
    const [message, setMessage] = useState('')
    const [showMap, setShowMap] = useState(false);
    const [filesData, setFileData] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [currentFileName, setCurrentFileName] = useState();
    const [readOnlyToWriteOnly, setReadOnlyToWriteOnly] = useState(true);
    const [textAreaTextChanging, setTextAreaChanging] = useState();

    useEffect(() => {
        recallingForFileData();
    }, [])

    async function recallingForFileData() {
        const data = await fetch('http://localhost:3000/getfiles', {
            method: 'GET',
            credentials: "include"
        });
        const response = await data.json();
        if (!response.success) {
            setShowMap(false);
            setFilesName([]); 
            setMessage(response.message);
        } else {
            setMessage('');
            setShowMap(true);
            setFilesName(response.files);
        }

    }

    const showData = async (filepath) => {
        const data = await fetch('http://localhost:3000/getfiledata', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ filepath: filepath })
        })
        const response = await data.json();
        // store data and show modal
        setFileData(response.filedata || "");

        setTextAreaChanging(response.filedata || "");
        setCurrentFileName(filepath)

        setModalVisible(true);
    }

    const deletingFile = async () => {
        const deleting = await fetch('http://localhost:3000/deletingfile', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: currentFileName })
        })

        const response = await deleting.json();

        if (response.success) {
            recallingForFileData();
        }
    }

    const updatingFileData = async (filename, filedata) => {
        const sendingData = await fetch('http://localhost:3000/updatingdata', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filename: filename,
                filedata: filedata
            })
        })

        const response = await sendingData.json();

        if (response.success) {
            recallingForFileData();
        }

    }

    return (
            <>
                {showMap && <div className={`${text, background} grid gap-6 grid-cols-3`}>
                    {filesName.map((elem, idx) => {
                        return <div key={idx} className={` p-2 h-[54px] border-1 w-[200px] cursor-pointer`} onClick={() => showData(elem)}>
                            <p className='block font-bold'>{elem}</p>
                            <p className='text-blue-600 text-sm'>See file data</p>
                        </div>
                    })}
                </div>}
                {(!showMap) && <div className={`${text, background}`}>{message}</div>}

                {/* modal overlay */}
                {modalVisible && (
                    <div className={`${text, background} fixed inset-0 flex items-center justify-center z-50`}>
                        {/* background blur */}
                        <div className='absolute inset-0 bg-opacity-40 backdrop-blur-sm'></div>
                        <div className='relative bg-white p-6 w-96 h-96 flex flex-col'>
                            <textarea
                                className='flex-1 border p-2 mb-4 resize-none text-black'
                                value={textAreaTextChanging}
                                readOnly={readOnlyToWriteOnly} onChange={(e) => setTextAreaChanging(e.target.value
                                )}
                            />
                            <div className='relative flex justify-between z-100'>
                                <button className={`${(!readOnlyToWriteOnly) ? 'hidden' : 'flex'} px-4 py-2 bg-blue-500 text-white rounded`} onClick={() => {
                                    (!readOnlyToWriteOnly) ? setReadOnlyToWriteOnly(true) : setReadOnlyToWriteOnly(false);
                                }}>Edit</button>
                                <button className={`${(readOnlyToWriteOnly) ? 'hidden' : 'flex'}  px-4 py-2 bg-green-500 text-white rounded`} onClick={() => {

                                    (filesData != textAreaTextChanging) ? updatingFileData(currentFileName, textAreaTextChanging) : null;
                                    setModalVisible(false)
                                }}>Save</button>
                                <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => {
                                    deletingFile();
                                    setModalVisible(false)
                                }}>Delete</button>
                                <button className='px-4 py-2 bg-gray-500 text-white rounded' onClick={() => {
                                    setModalVisible(false)
                                    setReadOnlyToWriteOnly(true);
                                }}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
    )
}

export default Files
