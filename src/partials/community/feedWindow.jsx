import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';
import UserImage03 from '../../images/user-40-03.jpg';

import { collection, onSnapshot, query, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import UserContext from '../../../UserContext';
import CarouselWindow from '../../pages/component/carousel';
import HeartGif from '../../images/svg/heartAni.gif'
import timeAgo from '../../pages/component/TimeAgo';

const postWindow = ({x}) => {
    // state
    const [owner, setOwner] = useState(false)
    const [comment, setComment] = useState([])

    // variables
    const user = useContext(UserContext);
    let navigate = useNavigate();

    // functions
    const count = () => {
        const result = comment.filter((c)=>{
        return c.documentId === x.id
        }).length
        return result
    }

    const onDelete = async() => {
        try{
            const ok = window.confirm("정말 삭제하시겠습니까?")
            if(ok){
                const delRef = doc(db, 'Feed', `${x.id}`)
                await deleteDoc(delRef)
            }        
        }catch(error){
            console.log(error)
        }
    }   
    
    const onUpdate = () => {
        navigate(`/ecommerce/payEdit/${x.id}`)
    }

    // init - SET_OWNER
    useEffect(()=>{
        const isOwner =()=> {
            if(user.currentUser?.uid == x.uid){
                setOwner(true)
            }else{
                setOwner(false)
            }
        }
        isOwner();
    }, [])
    
    // init - READ "COMMENT"
    useEffect(()=>{
        const readComment = async() => {
            try{
            const q = await query(collection(db, "Comment"))
            onSnapshot(q, (snap)=>{
                const c = snap.docs.map((doc)=>({
                ...doc.data()
                }))
                setComment(c.sort((a,b)=> {return b.createdAt - a.createdAt}))

            }) 
            }catch(error){
            console.log(error)
            }
        }
        readComment();
    },[])

    return(
           <div key={x.id} className="bg-white px-3 divide-y">
                {/* Header */}
                
                {/* Body */}
                <Link to={`/comments/${x.id}/${x.uid}/${x.feedTitle}`}>

                <div className="text-sm text-slate-800 py-2 flex justify-between ">

                <div className='container-left pr-2'>
                    {/* 1. TITLE */}
                    <p className="font-slate-800 mb-1 font-m "> {x.feedTitle}</p>
                    {/* User */} 
                    <div className="flex items-start space-x-3">
                        {/* <img className="rounded-full shrink-0" src={UserImage03} width="40" height="40" alt="User 03" /> */}
                        <div className='flex'>

                            {/* Like button */}
                            <button className="flex items-center text-slate-400 hover:text-indigo-500">
                                <div className="">{x.live? <div className='pr-1 -mt-1'><img src={HeartGif} /></div> : <svg className="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z" />
                                </svg>}
                                </div>
                            </button>
                            <div className="leading-tight text-xs text-slate-500 mr-4"> {x.userName} </div>
                            <div className="text-xs text-slate-500">{timeAgo(x.createdAt) }</div>

                            {/* Menu button */}
                            {owner ? <>
                                <EditMenu align="" className="relative inline-flex shrink-0">
                                    <li>
                                        <button onClick={onUpdate} className="font-medium text-sm text-indigo-600 hover:text-indigo-800 flex py-1 px-3" to="#0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                        </svg>
                                            <span className="pl-2">글 수정</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={onDelete} className="font-medium text-sm text-red-600 hover:text-red-800 flex py-1 px-3" to="#0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                            <span className="pl-2">글 삭제</span>
                                        </button>
                                        </li>
                                </EditMenu>
                            </> : ""}
                         </div>
                        </div>
                    </div>
                    <div>
                </div>
                
                    <div className="containerRight flex ">
                        <div className={`${x.imageURL===null ? "hidden" : "w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg"}`} style={{backgroundImage: `url(${x.imageURL})`}} >
                        </div>

                         <div className='flex flex-col justify-center h-14  border-slate-300 rounded-lg bg-slate-100 p-2 '>
                            
                            <div>
                            <div  className=" text-slate-400 hover:text-indigo-500">
                                <svg className="w-4 h-4 shrink-0 fill-current font-thin" viewBox="0 0 16 16">
                                <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                                </svg>
                            </div>
                            </div>
                            <div className="text-xs text-center text-slate-500">{count()}</div>
                        </div>
                    </div>
                </div>
                </Link>                  

                {/* Footer */}
                <footer className="flex items-center space-x-4">
               
                {/* 댓글 */}
                
                   
                
                </footer>
            </div>
    
    )
}

export default postWindow;