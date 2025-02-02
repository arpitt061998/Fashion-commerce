import MediaRenderer from "./MediaRenderer";

const MediaContainer = ({ mediaContent, onDurationChange, onTimeUpdate, isActive, visibleProductIndex, onProductButtonClick }) => {
    if (!mediaContent) return null;
    
    return (
        <div className="h-screen w-full">
            <MediaRenderer 
                mediaContent={mediaContent} 
                onDurationChange={onDurationChange} 
                onTimeUpdate={onTimeUpdate}
                isActive={isActive}
                visibleProductIndex={visibleProductIndex}
                onProductButtonClick={onProductButtonClick}
            />
        </div>
    );
};

export default MediaContainer;