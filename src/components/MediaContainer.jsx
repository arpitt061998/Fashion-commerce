import MediaRenderer from "./MediaRenderer";

const MediaContainer = ({ mediaContent }) => {
    if (!mediaContent) return null;
    
    return (
        <div className="h-screen w-full">
            <MediaRenderer mediaContent={mediaContent} />
        </div>
    )
};

export default MediaContainer;