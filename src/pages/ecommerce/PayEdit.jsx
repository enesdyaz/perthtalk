import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PayBg from '../../images/pay-bg.jpg';
import User from '../../images/user-64-13.jpg';
import {useForm} from 'react-hook-form'

import { doc, addDoc, collection, query, getDoc, updateDoc, } from 'firebase/firestore'
import { db } from '../../firebase';


function PayEdit() {

  let param = useParams();
  const {register, handleSubmit, reset, setValue, getValues} = useForm()  
  const [card, setCard] = useState(true);
  const [state, setState] = useState("")

  useEffect(()=>{
    const init = async() => {
      const ref = doc(db, "Feed", `${param.id}`)
      const data = await getDoc(ref)
      const value = data.data();
        setValue("feedTitle", value.feedTitle)
        setValue("feedDescription", value.feedDescription)
    }
    init();
  }, [])
  
  const feedUpdate = async()=> {
    try{
      const ok = window.confirm("정말 수정 하시겠습니까?")
      if(ok){
        const formData = getValues();
        const updateRef = doc(db, 'Feed', `${param.id}`)
        await updateDoc(updateRef, {
          ...formData,
        })

        setState(`\u{1f600} 글이 잘 수정 되었습니다. 추가 작성 혹은 오른쪽 상단 X를 눌러 Feed로 가실수 있습니다. `)
        setTimeout(()=>{
          setState("")
        }, 5000)
      }
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
                <form onSubmit={handleSubmit(feedUpdate)}>
                <div className="space-y-4">
                  {/* 글 제목 */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-nr">글 제목 <span className="text-rose-500">*</span></label>
                    <input {...register("feedTitle")}  id="card-nr" required  className="form-input w-full" type="text" placeholder="" />
                  </div>
                    {/* 글 내용 */}
                    <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="card-name">글 내용 <span className="text-rose-500">*</span></label>
                    <textarea {...register("feedDescription")}  id="card-name" required className="form-input w-full" type="text" placeholder="" />
                  </div>
                  {/* Expiry and CVC */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1" htmlFor="card-expiry">사진 올리기<span className="text-rose-500">*</span></label>
                      <input {...register("fileUpload")} id="card-expiry" className="form-input w-full" type="text" placeholder="image.jpg" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">유투브 링크 올리기 <span className="text-rose-500">*</span></label>
                      <input {...register("youtube-link")} id="card-cvc" className="form-input w-full" type="text" placeholder="http://youtube.com/XKehu" />
                    </div>
                  </div>

                  {/* Name on Card */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="select-category">카테고리 설정 <span className="text-rose-500">*</span></label>
                    <select {...register("selectCategory")} required id="select-category" className="form-input w-full" type="text" placeholder="John Doe" >
                      <option value="데일리톡">데일리 톡!</option>
                      <option value="내지역톡">내지역 톡!</option>
                    </select>
                  </div>
                  
                  
                </div>
                {/* htmlForm footer */}
                <div className="mt-6">
                  <div className="mb-4">
                    <div className="text-center text-xs  text-indigo-600 p-2">{state} </div>
                    <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white" href="#0">글 수정하기</button>
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

export default PayEdit;