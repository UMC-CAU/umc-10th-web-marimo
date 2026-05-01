import React from 'react';
import Spinner from '../assets/spinner.gif'; 

const Loading: React.FC = () => {
    return (
        <>
            <div w-120 h-120 top-0 left-0 bg-white-70 z-50 flex-col items-center justify-center>
            <text font-bold text-center>잠시만 기다려 주세요~</text>
            <img src={Spinner} alt="로딩중" width="5%" />
            </div>
        </>
    );
};

export default Loading;