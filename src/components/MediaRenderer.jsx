import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ProductInfo from './ProductInfo';

const MediaRenderer = ({ mediaContent, onDurationChange, onTimeUpdate, isActive }) => {
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);

    if (!mediaContent) return null;
    
    const { type, url } = mediaContent;

    const handleMuteToggle = () => {
        setMuted(!muted);
        if (videoRef.current) {
            videoRef.current.muted = !muted;
        }
    };

    useEffect(() => {
        if (type === "video" && videoRef.current) {
            const handleTimeUpdate = () => {
                onTimeUpdate(videoRef.current.currentTime);
            };
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [type, onTimeUpdate]);

    useEffect(() => {
        if (type === "video" && videoRef.current) {
            if (isActive) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isActive, type]);

    return (
        <div className="h-full w-full relative">
            {type === "image" ? (
                <img 
                    src={`${url}.jpg`} 
                    alt="Story Media" 
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="h-full w-full">
                    <video 
                        ref={videoRef}
                        src={url}
                        className="h-full w-full object-cover"
                        autoPlay={isActive}
                        muted={muted}
                        loop
                        onLoadedMetadata={(e) => onDurationChange(e.target.duration)}
                    />
                    <button 
                        onClick={handleMuteToggle} 
                        className="absolute bottom-[12.5rem] right-2 bg-gray-800 text-white p-2 rounded"
                    >
                        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>
            )}
            <div className={`absolute bottom-16 left-2 right-2 max-w-sm p-2 rounded shadow-lg overflow-x-auto flex ${mediaContent.products.length === 1 ? 'justify-center' : 'space-x-4'}`}>
                {mediaContent.products.map(product => (
                    <ProductInfo key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default MediaRenderer;