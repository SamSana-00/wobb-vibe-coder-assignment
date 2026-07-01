import { useShortlistStore } from "@/store/useShortlistStore";

function formatFollowers(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return String(count);
}

export function Shortlist() {
  const { shortlist, removeFromShortlist } = useShortlistStore();

  if (shortlist.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-4">
        <h2 className="font-bold text-white text-lg">
          My Shortlist ({shortlist.length})
        </h2>
        <p className="text-violet-200 text-xs mt-0.5">
          Selected influencers for your campaign
        </p>
      </div>
      <div className="divide-y divide-gray-50">
        {shortlist.map((profile) => (
          <div
            key={profile.username}
            className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            <img
              src={profile.picture}
              alt={profile.fullname}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">
                @{profile.username}
              </div>
              <div className="text-xs text-gray-400">{profile.fullname}</div>
            </div>
            <div className="text-xs text-gray-400 capitalize shrink-0">
              {profile.platform} · {formatFollowers(profile.followers)} followers
            </div>
            <button
              onClick={() => removeFromShortlist(profile.username)}
              className="ml-2 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors text-sm font-bold"
              title="Remove"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
