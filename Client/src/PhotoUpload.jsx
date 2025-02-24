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
            console.error('Error uploading image', error);
        }
    };

    return (
        <div>
            <h1 className='titels'>Photo Uploade</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} className='upload'/>
            
            {preview && (
                <div>
                    <h3>Preview</h3>
                    <img src={preview}  className = "preview" alt="preview"/>
                </div>
            )}
             
           
            <button onClick={handleUpload} disabled={!image} className='preview-SmallSize-button'>Preview of possible designs </button>
            
        </div>
    );
}

export default PhotoUpload;
