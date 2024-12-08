const MediaRenderer = ({ mediaContent }) => {
    if (!mediaContent) return null;
    
    const { type, url } = mediaContent;
    return (
        <div className="h-full w-full">
            {type === "image" ? (
                <img 
                    src={`${url}.jpg`} 
                    alt="Story Media" 
                    className="h-full w-full object-cover"
                />
            ) : (
                <video 
                    src={url}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                />
            )}
        </div>
    )
}

export default MediaRenderer;