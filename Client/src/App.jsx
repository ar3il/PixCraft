import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload';
import PhotoDownload from './PhotoDownload';
import './styles.css'

function App() {
    const [resizedImages, setResizedImages] = useState([]);

    return (
        <div className='main-screen'>
            <div className='main-window'>
            <PhotoUpload setResizedImages={setResizedImages} />
            <PhotoDownload resizedImages={resizedImages} />

            </div>
           
        </div>
    );
}

export default App;
