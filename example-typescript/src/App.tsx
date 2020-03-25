import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SizeReceiverHoc} from "./SizeReceiverComponent";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{
                    width: "512px",
                    height: "512px",
                    backgroundColor: "blue",
                }}>
                    <SizeReceiverHoc sizeSettings={{
                        height: "100%",
                        minHeight: 200,
                        updateHeight: true
                    }}/>
                </div>
            </header>
        </div>
    );
}

export default App;
