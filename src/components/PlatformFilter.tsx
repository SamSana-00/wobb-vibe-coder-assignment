import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-3 justify-center mb-4">
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            onClick={() => onChange(platform)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
              selected === platform
                ? "bg-violet-600 text-white shadow-violet-200 shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-violet-300 hover:text-violet-600"
            }`}
          >
            {getPlatformLabel(platform)}
          </button>
        ))}
      </div>
      <div className="relative max-w-xl mx-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          &#128269;
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name..."
          className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
