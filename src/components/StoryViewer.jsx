import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel, FreeMode, Autoplay, Scrollbar } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';  
import { stories} from "../data/storyData";
import { useState } from "react";
import MediaContainer from "./MediaContainer";

const ProgressBar = ({ index, active, completed }) => {
    return (
        <div className="h-1 bg-gray-300 flex-1 mx-0.5">
            <div
                className={`h-full transition-all ${completed ? 'w-full' : active ? 'animate-progress' : 'w-0'}`}
                style={{
                    backgroundColor: 'white',
                    animation: active ? 'progress 3s linear forwards' : 'none'
                }}
            />
        </div>
    );
};

const MultiProgressBar = ({ total, current }) => {
    return (
        <div className="flex w-full gap-1 px-2 py-2 absolute top-0 z-10">
            {[...Array(total)].map((_, index) => (
                <ProgressBar
                    key={index}
                    index={index}
                    active={index === current}
                    completed={index < current}
                />
            ))}
        </div>
    );
};

const StoryViewer = () => {
    const [activeStoryIndex, setActiveStoryIndex] = useState(0); 
    const [activeMediaIndex, setActiveMediaIndex] = useState(0); 

    return (
        <div className="story-viewer-container w-full max-w-md mx-auto h-screen">
            <style>
                {`
                @keyframes progress {
                    from { width: 0; }
                    to { width: 100%; }
                }
                .animate-progress {
                    width: 0;
                }
                `}
            </style>
            <Swiper
                slidesPerView={1}
                direction="vertical"
                onSlideChange={(swiper) => {
                    setActiveStoryIndex(swiper.activeIndex); 
                    setActiveMediaIndex(0); 
                }}
                modules={[Scrollbar]}
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