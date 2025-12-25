const GrowthChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <p className="text-gray-500">Your growth story starts with your first test</p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Take Your First Test
        </button>
      </div>
    );
  }

  const maxScore = Math.max(...data.map(d => d.avgScore));
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">Your Growth Journey</h3>
      <p className="text-sm text-gray-500 mb-6">Performance trend across all skill tests</p>
      
      <div className="relative h-64">
        <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          <polyline
            fill="url(#gradient)"
            stroke="none"
            points={data.map((d, i) => {
              const x = (i / (data.length - 1)) * 600;
              const y = 200 - (d.avgScore / 100) * 200;
              return `${x},${y}`;
            }).join(' ') + ` 600,200 0,200`}
          />
          
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            points={data.map((d, i) => {
              const x = (i / (data.length - 1)) * 600;
              const y = 200 - (d.avgScore / 100) * 200;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 600;
            const y = 200 - (d.avgScore / 100) * 200;
            return (
              <circle key={i} cx={x} cy={y} r="5" fill="#10B981" />
            );
          })}
        </svg>
        
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          {data.map((d, i) => (
            <span key={i}>{d.date}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;