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

    return (
        <div className="story-viewer-container w-full max-w-md mx-auto h-screen">
            <Swiper
                slidesPerView={1}
                direction="vertical"
                onSlideChange={(swiper) => {
                    setActiveStoryIndex(swiper.activeIndex); 
                    setActiveMediaIndex(0); 
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
                        />
                        <Swiper
                            slidesPerView={1}
                            direction="horizontal"
                            onSlideChange={(swiper) => {
                                setActiveMediaIndex(swiper.activeIndex); 
                            }}
                            initialSlide={activeMediaIndex}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Scrollbar, Navigation, Pagination]}
                            className="swiper-container"
                        >
                            {story.mediaItems.map((mediaItem) => (
                                <SwiperSlide key={mediaItem.id}>
                                    <MediaContainer mediaContent={mediaItem} />
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