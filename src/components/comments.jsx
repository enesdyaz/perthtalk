import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Avatar from '../images/user-40-02.jpg';
import Emoji from './Emoji';
import UserContext from '../../UserContext';
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, snapshotEqual, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import timeAgo from '../pages/component/TimeAgo';

function Comments() {
    
    // 1. 코멘트 저장하기
    const user = useContext(UserContext)
    const params = useParams();
    const { register, handleSubmit, reset, setFocus}  = useForm()
    const onSubmit = async({comment}) => {
        try{
            const uid = user.currentUser.uid
            const documentId = params.id
            const docRef = await addDoc(collection(db, "Comment"), {
                uid,
                documentId: documentId,
                comment,
                userName: user.currentUser.displayName,
                email: user.currentUser.email,
                createdAt: Date.now()
            });
            scrollBottom();
            setFocus('comment');
        }catch(error){
            console.log('error', error)
        }
        reset();
    }


    // 2. 코멘트 실시간 불러오기 / 같이 uid일 경우 userName 안보이게 하기
    const [comment, setComment] = useState([])
    useEffect(()=>{
        const init = () => {
            const q = query(collection(db, "Comment"), where("documentId", "==", `${params.id}`))
            onSnapshot(q, (snap)=>{
                const array = snap.docs.map((doc, index) =>{
                    const document = doc.data()
                    return {
                        id: doc.id,
                        ...doc.data(),
                        owner: user.currentUser.uid == document.uid,
                        userDisplay: true
                        }
                })
                let data = array.sort((a,b)=> {return a.createdAt - b.createdAt})
                for(let i=1; i<data.length; i++) {
                    if(data[i].uid==data[i-1].uid){
                        data[i].userDisplay = false
                    }    
                }
                setComment(array.sort((a,b)=> {return a.createdAt - b.createdAt}))
        })
        }
        init()    
    }, [])


    // 3. LIVE 만들기
    const liveUpdate = async(status) => {
        console.log('live Update')
        const docRef = await doc(db, "Feed", params.id)
        const data = {
            live: status,
            attend: arrayUnion(user.currentUser.displayName)
        }
        updateDoc(docRef, data).then((result)=>console.log('라이브 업데이트 됨'))
    }

    const location = useLocation()
    window.addEventListener("beforeunload", (e) => {
        if(user.currentUser.uid == params.uid){
            liveUpdate(false)
        } 
    })


    useEffect(()=>{
        if(user.currentUser.uid == params.uid){
            liveUpdate(true)   
            setTimeout(()=>{liveUpdate(false)}, 1200000)     
            return ()=>{
                liveUpdate(false)   
            }
        }else{
            return ()=>  console.log('say goodbye notowner')
        }
        addAttend();
        readAttend();
    }, [location])

    // 4. 스크롤 맨 아래로 내리기
    const scrollBottom = () => {
        window.scrollTo(0, document.querySelector("#commentWindow").scrollHeight)
    }
    const [feed, setFeed] = useState()
    console.log('feed', feed)
    //5. Props Feed / Attend 불러오기
    useEffect(()=>{
        let unmounted = false
        const readFeed = async()=> {
            const documentId = params.id;
            const ref = await doc(db, "Feed", documentId)
            const oneFeed = await getDoc(ref);
            setFeed(oneFeed.data())
            return false
        }
        readFeed();

        return ()=> { unmounted = true}


    }, [])

    return (
    <>
    <div key={params.id} className="max-w-md mx-auto">
    {/* 댓글 창 컴포넌트 / 색상 포함 */}
    <div id="commentWindow" className=" shadow-lg  min-h-screen  bg-blue-300  pb-24">
 
        {/* 댓글창 */}
        <div className="fixed bottom-0 p-1 w-full max-w-md fiex z-10 bg-white">
              
            <Emoji id="commentEmoji" />
                <form onSubmit={handleSubmit(onSubmit)}>   
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>                </div>
                        <textarea {...register("comment")} rows={1} cols={10} wrap={'soft'} id="commentEmoji" required className="break-all block p-2 pl-10 pr-16 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="기분 좋은 댓글 적어주세요"  /> 
                        <button type="submit" className="text-indigo-500 absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4  ">댓글</button>
                    </div>
                </form>
            </div>

        {/* 헤더 코멘트창/백버튼 */}
        <div className="flex justify-between p-4 bg-white" style={{borderBottom: '1px solid #f5f5f5'}}>
            <div>  
                <Link to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </Link> 
            </div>
            <div className="font-bold ">HOJU TALK</div>
            <div className="pr-5"></div>
        </div>
        {/* 헤더 메인 콘테이너 */}
        {feed && 
        <div className='bg-white p-4'>
            <div className='text-sm font-bold'>{feed.feedTitle}</div>
            <div className='flex'>
                <div className="text-xs pr-4 flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {feed.userName}</div>
                <div className="text-xs flex" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    {timeAgo(feed.createdAt)}</div>

            </div>
            
            <p className="text-sm mt-4">{feed.feedDescription}</p>
        </div>
        }
        

        
        {/* 댓글 컨텐츠 */}
        <div >
            {comment.map((e)=>(
            <div key={e.id} className={`flex-cols ${e.userDisplay?"pt-3":"pt-1"} `}>
                <div className={`${e.userDisplay ? "ml-4  text-slate-600 text-[10px] max-w-sm ":"hidden" } `}>
                    {e.userName}
                </div>
                <div className='flex'>
                    <div className={` ${e.owner?" bg-yellow-300" : "bg-white "} mr-1 p-1 px-4 ml-4 max-w-sm  rounded-lg inline-block `}  >
                        <div className={` font-light text-slate-800 text-xs`}>{e.comment}</div>
                    </div>
                    <div className=" flex-col ">
                        <div className="h-3"></div>
                        <div className="text-[10px] text-slate-100 ">{timeAgo(e.createdAt)}</div>
                    </div>
                    
                </div>
            </div>
            
            ))
            }
        </div>
    </div>
    </div>
    </>
  );
}

export default Comments;