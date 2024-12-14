import React, { useEffect, useState } from 'react'
import Chatmsg from './Chatmsg'
import { useDispatch, useSelector } from 'react-redux'
import { addmessage } from '../utils/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';

const LiveChat = () => {

const[liveMsg,setLiveMsg]=useState("");

const dispatch=useDispatch();

const chatMessages=useSelector((store)=>store.chat.messages);
    useEffect(()=>{
        const i=setInterval(()=>{
            //API Polling
            console.log("API polling")
            dispatch(addmessage({
                name: generateRandomName(),
                message: makeRandomMessage(20) + "👍",
            }));
        },1500);
        return()=> clearInterval(i)
    },[]);
  return (
    <>
    <div className='w-96 h-[500px] ml-2 p-2 rounded-lg border border-black bg-slate-100 overflow-y-scroll flex flex-col-reverse'>
      <div>
          {
        chatMessages.map((c,i)=>(
        <Chatmsg key={i}
        name={c.name} message={c.message}/>
        ))
        }
        </div>
       
    </div>
     <form className='w-96 p-2 ml-2 border border-black' onSubmit={(e)=>{
        e.preventDefault();
        console.log("ON FORM SUBMIT"+liveMsg);
        dispatch(
            addmessage({
                name:"Swapnamoy",
                message:liveMsg,
            })
        )
        setLiveMsg("");
     }}>
           <input className='p-2 w-72' type="text" value={liveMsg} onChange={(e)=>{
            setLiveMsg(e.target.value);
           }}/> 
           <button className='px-2 mx-2 bg-green-100'>Send</button>
     </form>
     </>
  )
}

export default LiveChat  