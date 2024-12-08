import ProgressBar from "./ProgressBar";

const MultiProgressBar = ({ total, current, duration }) => {
    return (
        <div className="flex w-full gap-1 px-2 py-2 absolute top-0 z-10">
            {[...Array(total)].map((_, index) => (
                <ProgressBar
                    key={index}
                    index={index}
                    active={index === current}
                    completed={index < current}
                    duration={duration}
                />
            ))}
        </div>
    );
};

export default MultiProgressBar;