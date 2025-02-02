import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ProductInfo from './ProductInfo';

const MediaRenderer = ({ mediaContent, onDurationChange, onTimeUpdate, isActive, visibleProductIndex, onProductButtonClick }) => {
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);
    const productContainerRef = useRef(null);

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

    useEffect(() => {
        if (visibleProductIndex !== null && productContainerRef.current) {
            const productElement = productContainerRef.current.querySelector(`#product-${visibleProductIndex}`);
            if (productElement) {
                const container = productContainerRef.current;
                const containerWidth = container.offsetWidth;
                const productWidth = productElement.offsetWidth;
                const scrollPosition = productElement.offsetLeft - (containerWidth / 2) + (productWidth / 2);
                container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        }
    }, [visibleProductIndex]);

    return (
        <div className="h-full w-full relative">
            {type === "image" ? (
                <>
                    <img 
                        src={`${url}.jpg`} 
                        alt="Story Media" 
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-2 right-2 flex justify-center space-x-2">
                        {mediaContent.products.map((_, index) => (
                            <button 
                                key={index}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    onProductButtonClick(index)
                                }}
                                className={`bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors
                                    ${visibleProductIndex === index ? 'bg-blue-700' : ''}`}
                            >
                                Product {index + 1}
                            </button>
                        ))}
                    </div>
                    {visibleProductIndex !== null && (
                        <div ref={productContainerRef} className="absolute bottom-16 left-2 right-2 max-w-sm p-2 rounded shadow-lg overflow-x-auto flex space-x-4">
                            {mediaContent.products.map((product, index) => (
                                <div id={`product-${index}`} key={product.id}>
                                    <ProductInfo product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
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
                    <div className={`absolute bottom-16 left-2 right-2 max-w-sm p-2 rounded shadow-lg overflow-x-auto flex ${mediaContent.products.length === 1 ? 'justify-center' : 'space-x-4'}`}>
                        {mediaContent.products.map(product => (
                            <ProductInfo key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default MediaRenderer;