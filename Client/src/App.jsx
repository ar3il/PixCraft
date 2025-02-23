import React, { useState } from 'react';
import PhotoUpload from './PhotoUpload';
import PhotoDownload from './PhotoDownload';

function App() {
    const [resizedImages, setResizedImages] = useState([]);

    return (
        <div>
            <PhotoUpload setResizedImages={setResizedImages} />
            <PhotoDownload resizedImages={resizedImages} />
        </div>
    );
}

export default App;
