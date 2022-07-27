import { addDoc, collection } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import UserContext from '../../UserContext';
import { db } from '../firebase';
import Emoji from './Emoji';


function CreateComment(documentId, ){
    const user = useContext(UserContext)
    const params = useParams();
    const { register, handleSubmit, reset}  = useForm()
    const onSubmit = async({comment}) => {
        try{
            const uid = user.currentUser.uid
            const documentId = params.id
            const docRef = await addDoc(collection(db, "Comment"), {
                uid,
                documenteId: documentId,
                comment,
                createdAt: Date.now()
            });
        }catch(error){
            console.log('error', error)
        }
        reset();
    }
    return (
        <>
         {/* 댓글창 */}
        <div className="fixed bottom-0 p-1 w-full max-w-md fiex">
            <hr></hr>
            <Emoji id="commentWindow" />
            <form onSubmit={handleSubmit(onSubmit)}>   
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>                </div>
                    <textarea {...register("comment")} rows={1} cols={10} wrap={'soft'} id="commentWindow" required className="break-all block p-2 pl-10 pr-16 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="기분 좋은 댓글 적어주세요"  /> 
                    <button type="submit" className="text-indigo-500 absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">댓글</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default CreateComment;