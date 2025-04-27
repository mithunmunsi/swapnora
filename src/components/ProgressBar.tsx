const ProgressBar = () => {
  return (
    <div className="space-y-4">
      {/* Video or Image Preview */}
      <div className="relative w-full overflow-hidden rounded-lg shadow-md">
        <img
          src="https://economictimes.indiatimes.com/thumb/msid-78716158,width-1200,height-900,resizemode-4,imgsize-539699/charity-getty.jpg?from=mdr" // Replace with your image URL or public folder image
          alt="Fundraiser preview"
          className="w-full object-cover"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition">
            ▶️
          </button>
        </div>
      </div>

      {/* Amounts */}
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-gray-700">$16,320 raised</span>
        <span className="text-gray-500">$30,000 goal</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-pink-500 h-3 rounded-full"
          style={{ width: "54%" }} // 16320/30000 ≈ 54%
        />
      </div>
    </div>
  );
};

export default ProgressBar;
