import React, { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import PostWindow from './feedWindow';


function FeedPosts() {

  // state
  const [docs, setDocs] = useState([])

  // variables
  const feature = docs.filter((doc) => {
    return doc.live == true
  })
  
  // init - READ "FEED"
  useEffect(()=>{
    const readDocs = async() => {
      try{
          const q = query(collection(db, "Feed"))
          onSnapshot(q, (snap)=>{
          const array  = snap.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
          }))
          const result = array.sort((a,b)=> {return b.createdAt - a.createdAt})
          setDocs(result)
        })
      }catch(error){
        console.log(error)
      }
    }
    readDocs();
  }, [])
  

  return (
    <div>
      <div className='mb-4'>
        <div className="text-red-500 bg-white p-3 ">
          <span className='bg-red-500 text-white rounded-lg p-1 text-xs px-2'>HEART ON </span><small className="text-slate-500 text-xs pl-2">작성자가 댓글창 안에 있어요</small>
        </div>
      {feature.map((x)=>(
        <PostWindow key={x.id} x={x} />
      ))}  
      </div>

      <div>
      {docs.map((x)=>(
        <PostWindow key={x.id} x={x} />
      ))}
      </div>
    </div>
  );
}

export default FeedPosts;
