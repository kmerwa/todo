import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { colors } from '../App';

type AddTodoProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (text: string, color: number) => void;
};

function AddTodo({ isOpen, onClose, onSave }: AddTodoProps) {
    const [text, setText] = React.useState("");
    const [selectedColor, setSelectedColor] = React.useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    
    if (!isOpen) return null;

    return(
        <div 
            style={{
                position: "fixed",
                left: "50%",
                transform: "translate(-50%, 0)",
                background: "#393E46",
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "20px 33px",
                borderRadius: "12px"
            }}
        >
            <h2>Add Todo</h2>
            <input 
                ref={inputRef}
                type="text" 
                placeholder='Enter todo'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px",
                    flexWrap: "wrap"
                }}>
                {colors.map((c, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: c,
                            border: i === selectedColor ? "3px solid white" : "2px solid transparent",
                            cursor: "pointer"
                        }}>
                    </div>
                ))}
            </div>
            <div style={{ 
                display: "flex",
                alignSelf: "end",
                gap: "10px",
                 }}>
                <button onClick={onClose}>Cancel</button>
                <button
                    onClick={() => {
                        if (text.trim()) {
                            onSave(text, selectedColor);
                            setText("");
                            setSelectedColor(0);
                            onClose();
                        }
                    }}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddTodo;