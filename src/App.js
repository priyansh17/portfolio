import './App.css';
import React from 'react';
import RouterComponent from './Router';
import ThreeBackground from './ThreeBackground';

function App() {
    return (
        <div className="App">
            <ThreeBackground fixed />
            <RouterComponent />
        </div>
    );
}

export default App;
