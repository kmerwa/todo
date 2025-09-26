import React, { PureComponent, useEffect, useRef, useState } from 'react'

type AddTaskProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (text: string) => void;
};

function AddTask({ isOpen, onClose, onSave }: AddTaskProps) {
    const [text, setText] = React.useState("");
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
            <h2>Add Task</h2>
            <input 
                ref={inputRef}
                type="text" 
                placeholder='Enter todo'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div style={{ 
                display: "flex",
                alignSelf: "end",
                gap: "10px",
                 }}>
                <button onClick={onClose}>Cancel</button>
                <button
                    onClick={() => {
                        if (text.trim()) {
                            onSave(text);
                            setText("");
                            onClose();
                        }
                    }}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddTask;