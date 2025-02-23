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
            console.error('שגיאה בהורדת התמונה', error);
        }
    };

    return (
        <div>
            {resizedImages.length > 0 && (
                <div>
                    <h3>תמונות להורדה</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        {resizedImages.map((img, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <img src={img.url} alt={`Size ${img.size}`} width="150" />
                                <br />
                                <button onClick={() => downloadImage(img.url, img.size)}>הורד {img.size}px</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoDownload;
