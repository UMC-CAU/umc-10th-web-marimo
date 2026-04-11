import React from 'react';

interface UserInputProps {
    type: string;
    placeholder: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInput = ({ type, placeholder, value, name, onChange }: UserInputProps) => {
    return (
        <input
            className="userInput"
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
        />
    );
}

export default UserInput;