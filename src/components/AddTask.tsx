import React, { PureComponent, useState } from 'react'
import { colors } from '../App';

type AddTaskProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (text: string, color: number) => void;
};

function AddTask({ isOpen, onClose, onSave }: AddTaskProps) {
    const [text, setText] = React.useState("");
    const [selectedColor, setSelectedColor] = React.useState(0);

    if (!isOpen) return null;

    return(
        <div 
            style={{
                position: "fixed",
                left: "50%",
                transform: "translate(-50%, 0)",
                minWidth: "400px",
                height: "200px",
                background: "#393E46",
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
                // position: "fixed",
                // inset: 0,
                // background: "rgba(0,0,0,0.5)",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
            }}
        >
            <h2>Add Task</h2>
            <input 
                type="text" 
                placeholder='Enter task'
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
            <div style={{ marginTop: "10px" }}>
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

export default AddTask;