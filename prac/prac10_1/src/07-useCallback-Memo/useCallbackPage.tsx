import React, {useMemo, useState} from 'react'

export default function UseCallbackPage() {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string>('');

    const handleIncreaseCount = (num: number) => {
        setCount(prev => prev + num);
    };

    const handleText = (text: string) => {
        setText(text);
    };

    return (
    <div>
        <h1>같이 배우는 리엑트 useCallback편</h1>
        <h2>Count: {count}</h2>
        
    </div>
    );
} 