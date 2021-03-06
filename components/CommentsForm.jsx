import React, {useRef, useState, useEffect} from 'react';
import {submitComment} from '../services';

const CommentsForm = ({slug}) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        setLocalStorage(window.localStorage);
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, []);


    const handlePostSubmission = () => {
        setError(false);
        if (!commentEl.current.value || !nameEl.current.value || !emailEl.current.value) {
            setError(true);
            return;
        }
        const commentObj = {
            name: nameEl.current.value,
            email: emailEl.current.value,
            comment: commentEl.current.value,
            slug,
        };

        if (storeDataEl.current.checked) {
            localStorage.setItem('name', nameEl.current.value);
            localStorage.setItem('email', emailEl.current.value);
        } else {
            localStorage.removeItem('name');
            localStorage.removeItem('email');
        }

        submitComment(commentObj)
            .then((res) => {
                if (res.createComment) {
                    if (storeDataEl.current.checked) {
                        nameEl.current.value = localStorage.getItem('name');
                        emailEl.current.value = localStorage.getItem('email');
                    } else {
                        nameEl.current.value = '';
                        emailEl.current.value = '';
                    }
                    commentEl.current.value = '';
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                }
            });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentEl}
                          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                          name="comment" placeholder="Comment"/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type="text" ref={nameEl}
                       className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                       placeholder="Name" name="name"/>
                <input type="email" ref={emailEl}
                       className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                       placeholder="Email" name="email"/>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true"/>
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save my name and
                        email</label>
                </div>
            </div>
            {error && <p className="text-sm text-red-500">All fields are required</p>}
            <div className="mt-8 flex justify-center items-center flex-wrap flex-col">
                <button type="button" onClick={handlePostSubmission}
                        className="transition duration-500 ease cursor-pointer p-4 px-6 bg-black text-white rounded-xl hover:scale-110 hover:bg-gray-100 hover:text-black">
                    Send
                </button>
                {showSuccessMessage &&
                    <span
                        className="transition duration-1000 animate-appear text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
            </div>
        </div>
    );
};

export default CommentsForm;