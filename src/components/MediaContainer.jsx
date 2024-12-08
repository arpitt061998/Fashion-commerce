import MediaRenderer from "./MediaRenderer";

const MediaContainer = ({ mediaContent, onDurationChange, onTimeUpdate, isActive }) => {
    if (!mediaContent) return null;
    
    return (
        <div className="h-screen w-full">
            <MediaRenderer 
                mediaContent={mediaContent} 
                onDurationChange={onDurationChange} 
                onTimeUpdate={onTimeUpdate}
                isActive={isActive}
            />
        </div>
    )
};

export default MediaContainer;