import React from 'react';

function PhotoDownload({ resizedImages }) {
    const downloadImage = async (url, size) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `image_${size}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading image', error);
        }
    };

    return (
        <div>
             <h1 className='titels2'>Photo Designs For Dowanload</h1>
            {resizedImages.length > 0 && (
                   <div className='final-containar'>
                    <div className='final-preview'>
                        {resizedImages.map((img, index) => (
                            <div key={index}>
                                <img src={img.url} alt={`Size ${img.size}`}  />
                                <br />
                                <button onClick={() => downloadImage(img.url, img.size)}>Dowanload{img.size}px</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoDownload;
