
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

export default ProgressBar;