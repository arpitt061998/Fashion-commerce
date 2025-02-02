import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel, FreeMode, Autoplay, Scrollbar } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';  
import { stories } from "../data/storyData";
import { useState } from "react";
import MediaContainer from "./MediaContainer";
import MultiProgressBar from "./MultiProgressBar";

const StoryViewer = () => {
    const [activeStoryIndex, setActiveStoryIndex] = useState(0); 
    const [activeMediaIndex, setActiveMediaIndex] = useState(0); 
    const [mediaDuration, setMediaDuration] = useState(5); 
    const [currentTime, setCurrentTime] = useState(0);
    const [visibleProductIndex, setVisibleProductIndex] = useState(null);

    const handleDurationChange = (duration) => {
        setMediaDuration(duration);
    };

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    const handleProductButtonClick = (index) => {
        setVisibleProductIndex(prev => prev === index ? null : index);
    };

    return (
        <div className="story-viewer-container w-full max-w-md mx-auto h-screen">
            <Swiper
                slidesPerView={1}
                direction="vertical"
                onSlideChange={(swiper) => {
                    setActiveStoryIndex(swiper.activeIndex); 
                    setActiveMediaIndex(0); 
                    setMediaDuration(5); 
                    setVisibleProductIndex(null);
                }}
                touchEventsTarget="wrapper"
                touchRatio={1.5}
                modules={[Scrollbar, Navigation, Pagination]}
                className="swiper-container"
            >
                {stories.map((story, storyIndex) => (
                    <SwiperSlide key={story.id}>
                        <MultiProgressBar
                            total={story.mediaItems.length}
                            current={activeMediaIndex}
                            duration={mediaDuration}
                        />
                        <Swiper
                            slidesPerView={1}
                            direction="horizontal"
                            onSlideChange={(swiper) => {
                                setActiveMediaIndex(swiper.activeIndex); 
                                const currentMedia = story.mediaItems[swiper.activeIndex];
            
                                setMediaDuration(currentMedia.type === 'image' ? 5 : currentMedia.duration || 5); 
                                setVisibleProductIndex(null);
                            }}
                            initialSlide={activeMediaIndex}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: mediaDuration * 1000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Scrollbar, Navigation, Pagination]}
                            className="swiper-container"
                        >
                            {story.mediaItems.map((mediaItem, mediaIndex) => (
                                <SwiperSlide key={mediaItem.id}>
                                    <MediaContainer 
                                        mediaContent={mediaItem} 
                                        onDurationChange={handleDurationChange}
                                        onTimeUpdate={handleTimeUpdate}
                                        isActive={mediaIndex === activeMediaIndex}
                                        visibleProductIndex={visibleProductIndex}
                                        onProductButtonClick={handleProductButtonClick}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default StoryViewer;