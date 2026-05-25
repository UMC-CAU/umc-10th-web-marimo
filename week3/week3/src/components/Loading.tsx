import React from 'react';
import Spinner from '../assets/spinner.gif'; 

const Loading: React.FC = () => {
    return (
        // className 속성에 큰따옴표를 쓰고 그 안에 모든 Tailwind 클래스를 넣음
        <div className="fixed w-full h-full top-0 left-0 bg-white/70 z-50 flex flex-col items-center justify-center">
            <p className="font-bold text-center text-xl mb-4 text-black">잠시만 기다려 주세요~</p>
            <img src={Spinner} alt="로딩중" width="50" />
        </div>
    );
};

export default Loading;