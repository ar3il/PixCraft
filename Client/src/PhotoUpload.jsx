import React, { useState } from 'react';

function PhotoUpload({ setResizedImages }) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.images) {
                setResizedImages(data.images); 
            }
        } catch (error) {
            console.error('שגיאה בהעלאת התמונה', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>העלאת תמונה</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            {preview && (
                <div>
                    <h3>תצוגה מקדימה:</h3>
                    <img src={preview} alt="תצוגה מקדימה" width="200" />
                </div>
            )}

            <br />
            <button onClick={handleUpload} disabled={!image}>שלח</button>
        </div>
    );
}

export default PhotoUpload;
