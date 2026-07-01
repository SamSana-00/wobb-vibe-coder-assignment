import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useShortlistStore } from "@/store/useShortlistStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return String(count);
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addToShortlist, isInShortlist } = useShortlistStore();
  const added = isInShortlist(profile.username);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToShortlist({
      username: profile.username,
      fullname: profile.fullname,
      followers: profile.followers,
      picture: profile.picture,
      platform: platform,
      is_verified: profile.is_verified,
    });
  };

  return (
    <div
      onClick={handleClick}
      data-search={searchQuery}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 cursor-pointer hover:shadow-md hover:border-violet-200 transition-all duration-200"
    >
      <img
        src={profile.picture}
        alt={profile.fullname}
        className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-bold text-gray-900 flex items-center gap-1">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-500 truncate">{profile.fullname}</div>
        <div className="text-xs text-violet-600 font-semibold mt-1">
          {formatFollowersLocal(profile.followers)} followers
        </div>
      </div>
      <button
        onClick={handleAddToList}
        className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          added
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-violet-600 text-white hover:bg-violet-700 shadow-sm"
        }`}
      >
        {added ? "Added!" : "+ Add"}
      </button>
    </div>
  );
}
