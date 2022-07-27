import React from 'react';
import Ad1 from "../../images/ad/Advanced-Dental-Spa-2.png"
import Ad2 from '../../images/ad/best_accounting.jpeg'
import Ad3 from '../../images/ad/bodyfriend-chair.jpeg'
import Ad4 from '../../images/ad/chickychicky-1.jpeg'
import Ad5 from '../../images/ad/duxtonHotel-1.jpeg'
import Ad6 from '../../images/ad/퍼스-한의원-1.png'
import Ad7 from '../../images/ad/elainblind.jpeg'
import Ad8 from '../../images/ad/kh유학원_logo.jpeg'
import Ad9 from '../../images/ad/tk_logo.jpeg'

function FeedLeftContent() {
  return (
    <div className="w-full md:w-60 mb-8 md:mb-0">
      <div className="md:sticky md:top-16 md:h-[calc(100vh-64px)] md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          
          {/* Title */}
  
          
          {/* Search form */}
          {/* <div className="xl:hidden mb-6">
            <form className="relative">
              <label htmlFor="feed-search-mobile" className="sr-only">
                Search
              </label>
              <input id="feed-search-mobile" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Search…" />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
          </div> */}
          
          {/* Links */}
          <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-4 md:space-y-3 -mx-4">
            {/* Group 1 */}
            <div className="p-2">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-3 ">한인 업소록 (유학원)</div>


              <ul className="flex flex-nowrap md:block mr-3 md:mr-0">

                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex w-48 items-center px-2.5 py-2  rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad1})`}} >
                        </div><span className="text-sm font-medium text-slate-700">하얀 잇몸 치과 <br /> <small>perth</small></span>
                  </a>
                </li>

                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex w-48 items-center px-2.5 py-2 rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad2})`}} >
                        </div><span className="text-sm font-medium text-slate-700">베스트 어카운트 <br /> <small>perth</small></span>
                  </a>
                </li>
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex w-48 items-center px-2.5 py-2 rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad3})`}} >
                        </div><span className="text-sm font-medium text-slate-700">바디 프렌드 <br /> <small>전국 배달</small></span>
                  </a>
                </li>
                <li className="mr-0.5 w-48 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad4})`}} >
                        </div><span className="text-sm font-medium text-slate-700">치키치키 치킨 <br /> <small>perth</small></span>
                  </a>
                </li>
                <li className="mr-0.5 w-48 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad5})`}} >
                        </div><span className="text-sm font-medium text-slate-700">덕스텐 뷔페  <br /> <small>주말 할인 $39</small></span>
                  </a>
                </li>
                <li className="mr-0.5 w-48 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad6})`}} >
                        </div><span className="text-sm font-medium text-slate-700">퍼스 한의원  <br /> <small>50% 할인</small></span>
                  </a>
                </li>
                <li className="mr-0.5 w-48 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad7})`}} >
                        </div><span className="text-sm font-medium text-slate-700">일라인 커튼  <br /> <small>할인 적용중</small></span>
                  </a>
                </li>
                <li className="mr-0.5 w-48 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-white" href="#0">
                  <div className="w-14 h-14 mr-2 pr-4 bg-center bg-origin-content bg-cover rounded-lg" style={{backgroundImage: `url(${Ad8})`}} >
                        </div><span className="text-sm font-medium text-slate-700">KH 유학원  <br /> <small>전국 학교 스페셜</small></span>
                  </a>
                </li>
                

              </ul>
            </div>
            {/* Group 2 */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase mb-3">한인업소록 (이민/법무사/회계사/변호사 )</div>
              <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 mr-2" viewBox="0 0 16 16">
                      <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0Z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-600">Productivity</span>
                  </a>
                </li>
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 mr-2" viewBox="0 0 16 16">
                      <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0Z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-600">Self Development</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default FeedLeftContent;
