export default function DemoControls({ isOwner, setIsOwner }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="text-xs font-semibold text-gray-700 mb-2">Demo Controls</div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isOwner}
          onChange={(e) => setIsOwner(e.target.checked)}
        />
        Owner View
      </label>
    </div>
  );
}
