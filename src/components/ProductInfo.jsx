const ProductInfo = ({ product }) => {
    return (
        <div className="min-w-[300px] text-center bg-white p-4 rounded-lg shadow-lg flex-shrink-0 transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
            <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors">
                Shop
            </button>
        </div>
    );
};

export default ProductInfo;