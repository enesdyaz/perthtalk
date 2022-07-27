import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import PayBg from '../../images/pay-bg.jpg';
import User from '../../images/user-64-13.jpg';
import {set, useForm} from 'react-hook-form'

import { doc, addDoc, collection, } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../firebase';
import UserContext from '../../../UserContext';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'
import {v4 as uuidv4} from 'uuid'
import Emoji from '../../components/Emoji';


function Pay() {

  const [card, setCard] = useState(true);
  const [state, setState] = useState("");
  const [imageFile, setImageFile] = useState();
  const {register, handleSubmit, reset} = useForm();
  const [selectedFile, setSelectedFile] = useState()
  const [checkFile, setCheckFile] = useState(false)
  const [loading, setLoading] = useState(false)
  const user = useContext(UserContext);
  if(!user){
    alert("No User Found")
  }


  const imageHandler = (e) => {
    const imageTarget = e.target.files[0];
    const reader = new FileReader();

    if(!imageTarget){return}
    reader.readAsDataURL(imageTarget);
    reader.onloadend = (finishedEvent) => {
        const { currentTarget:{result} } = finishedEvent;
      setImageFile(result)
    }
    
    setSelectedFile(e.target.files[0])
    if(e.target.files.length > 0){
      setCheckFile(true)
    }else{
      setCheckFile(false)
    }
  }

  
  const imageUpload = async() => {
    const uuid = uuidv4();

    if(imageFile === undefined){
      return null
    }else{
      const storage = getStorage()
      const storageRef = ref(storage, `${user.currentUser.uid}/${uuid}` )
      const response = await uploadString(storageRef, imageFile, "data_url")
      const imageURL = await getDownloadURL(response.ref)
      return imageURL;
    }
    
  }
  
  
  
  
  const feedSubmit = async(data)=> {
    try{
      console.log('4')
      setLoading(true);
      console.log('4-1')
      const imageURL = await imageUpload();
      console.log('4-2')
      const refDoc = await addDoc(collection(db, "Feed"), {
      ...data,
      uid: user.currentUser.uid,
      userName: user.currentUser.displayName,
      email: user.currentUser.email,
      createdAt: Date.now(),
      imageURL: imageURL,
      live: false,
      attend: []
      })
      console.log('5')
      reset();
      console.log('6')
      setSelectedFile(false)
      console.log('7')
      setLoading(false)
      console.log('8')

      setState(`\u{1f600} 글이 잘 저장되었습니다. 추가 작성 혹은 오른쪽 상단 X를 눌러 Feed로 가실수 있습니다. `)
      console.log('9')
      setTimeout(()=>{
        setState("")
      }, 5000)

    }catch(error){
      console.log(error)
    }
  }





  return (
    <>
      <header className="bg-white border-b border-slate-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -mb-px">

            {/* Logo */}
            <Link className="block" to="/">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <defs>
                  <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                    <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                    <stop stopColor="#A5B4FC" offset="100%" />
                  </linearGradient>
                  <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                    <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                    <stop stopColor="#38BDF8" offset="100%" />
                  </linearGradient>
                </defs>
                <rect fill="#6366F1" width="32" height="32" rx="16" />
                <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
              </svg>
            </Link>

            <Link className="block rounded-full bg-slate-100 text-slate-500 hover:text-slate-600" to="/">
              <span className="sr-only">Back</span>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path className="fill-current" d="M15.95 14.536l4.242-4.243a1 1 0 111.415 1.414l-4.243 4.243 4.243 4.242a1 1 0 11-1.415 1.415l-4.242-4.243-4.243 4.243a1 1 0 01-1.414-1.415l4.243-4.242-4.243-4.243a1 1 0 011.414-1.414l4.243 4.243z" />
              </svg>
            </Link>

          </div>
        </div>
      </header>

      <main>

        <div className="relative pt-8">
          <div className="absolute inset-0 bg-slate-800 overflow-hidden" aria-hidden="true">
            <img className="object-cover h-full w-full filter blur opacity-10" src={PayBg} width="460" height="180" alt="Pay background" />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
            <img className="rounded-t shadow-lg" src={PayBg} width="460" height="180" alt="Pay background" />
          </div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
          <div className="bg-white px-8 pb-6 rounded-b shadow-lg">

            {/* Card header */}
            <div className="text-center mb-6">
              <div className="mb-2">
                <img className="-mt-8 inline-flex rounded-full" src={User} width="64" height="64" alt="User" />
              </div>
              <h1 className="text-xl leading-snug text-slate-800 font-semibold mb-2">글 쓰기 🔥</h1>
              <div className="text-sm">
                Learn how to create real web apps using HTML & CSS. Code templates included.
              </div>
            </div>

            {/* Toggle */}
            <div className="flex justify-center mb-6">
              <div className="relative flex w-full p-1 bg-slate-50 rounded">
                <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                  <span className={`absolute inset-0 w-1/2 bg-white rounded border border-slate-200 shadow-sm transform transition duration-150 ease-in-out ${card ? 'translate-x-0' : 'translate-x-full'}`}></span>
                </span>
                <button
                  className="relative flex-1 text-sm font-medium p-1 duration-150 ease-in-out"
                  onClick={(e) => { e.preventDefault(); setCard(true); }}
                >일반 피드</button>
                <button
                  className="relative flex-1 text-sm font-medium p-1 duration-150 ease-in-out"
                  onClick={(e) => { e.preventDefault(); setCard(false); }}
                >판매 제품</button>
              </div>
            </div>


            {/* Card form */}
            {card &&
              <div>
                <form onSubmit={handleSubmit(feedSubmit)}>
                <div className="space-y-4">
                  {/* 카테고리 설정 */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="select-category">카테고리 설정 <span className="text-rose-500">*</span></label>
                    <select {...register("selectCategory")} required id="select-category" className="form-input w-full" type="text" placeholder="John Doe" >
                      <option value="데일리톡">데일리 톡!</option>
                      <option value="내지역톡">내지역 톡!</option>
                    </select>
                  </div>
                  
                  {/* 글 제목 */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-nr">글 제목 <span className="text-rose-500">*</span></label>
                    <input {...register("feedTitle" )} id="card-nr" required  maxLength={40} className="form-input w-full" type="text" placeholder="40자까지 입력할 수 있어요" />
                  </div>
                  {/* 글 내용 */}
                  <div>
                    <label  className="block text-sm font-medium mb-1" htmlFor="card-name">글 내용 <span className="text-rose-500">*</span></label>
                    <textarea id="feedDesc" {...register("feedDescription")}  required className="form-input w-full" type="text" placeholder="" />
                    <Emoji id="feedDesc" />
                  </div>

                  {/* 이미지 업로드 */}
                  <div className="flex justify-center items-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer ">
                    {checkFile ? 
                    <div className='p-4 relative'> 
                    <button className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900" onClick={()=>{setCheckFile(false); setImageFile()}}> X </button>
                    <img className={`w-28 rounded-sm ${checkFile?'opacity-1':'opacity-0'}`} src={selectedFile ? URL.createObjectURL(selectedFile) : null} />
                    <span className="text-[11px] w-56 truncate">{checkFile?selectedFile?.name:'choose a file'}</span></div>
                    :
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    }    
                    </label>
                  </div> 
                  <input onChange={imageHandler}  className="block w-full text-sm w-3/4 hidden text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="dropzone-file" type="file" multiple="" />
                  


                  {/* 유투브 링크 */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">유투브 링크 올리기 <span className="text-rose-500">*</span></label>
                      <input {...register("youtube-link")} id="card-cvc" className="form-input w-full" type="text" placeholder="http://youtube.com/XKehu" />
                    </div>
                  </div>
              </div>
                {/* htmlForm footer */}
                <div className="mt-6">
                  <div className="mb-4">
                    
                    <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white" href="#0">
                      {loading ? <>
                        <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg> <span> Uploading...</span></>
                      : "글 올리기" }
                      </button>
                      <div className="text-center text-xs  text-indigo-600 p-2">{state} </div>
                  </div>
                  <div className="text-xs text-slate-500 italic text-center">비방 및 욕설등 게시가 제한될 수 있는 글은 삼가해주세요. </div>
                </div>
              </form>
              </div>
            }

            {/* PayPal htmlForm */}
            {!card &&
              <div>
                <div>
                <div className="space-y-4">
                  {/* 글 제목 */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-nr">제품 이름 <span className="text-rose-500">*</span></label>
                    <input id="card-nr" className="form-input w-full" type="text" placeholder="1234 1234 1234 1234" />
                  </div>
                    {/* 글 내용 */}
                    <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-name">제품 내용 <span className="text-rose-500">*</span></label>
                    <textarea id="card-name" className="form-input w-full" type="text" placeholder="John Doe" />
                  </div>
                  {/* Expiry and CVC */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1" htmlFor="card-expiry">사진 올리기<span className="text-rose-500">*</span></label>
                      <input id="card-expiry" className="form-input w-full" type="text" placeholder="image.jpg" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">가격 <span className="text-rose-500">*</span></label>
                      <input id="card-cvc" className="form-input w-full" type="text" placeholder="$0 이면 무료 나눔" />
                    </div>
                  </div>
                  {/* Name on Card */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-name">카테고리 설정 <span className="text-rose-500">*</span></label>
                    <input id="card-name" className="form-input w-full" type="text" placeholder="John Doe" />
                  </div>
                  
                  
                </div>
                {/* htmlForm footer */}
                <div className="mt-6">
                  <div className="mb-4">
                    <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white" href="#0">제품 올리기</button>
                  </div>
                  <div className="text-xs text-slate-500 italic text-center">가품 및 판매금지 목록은 게시가 제한될 수 있습니다.  </div>
                </div>
              </div>
              </div>
            }

          </div>
        </div>
      </main>    
    </>
  );
}

export default Pay;