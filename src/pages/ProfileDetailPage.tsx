import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useShortlistStore } from "@/store/useShortlistStore";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { addToShortlist, isInShortlist } = useShortlistStore();

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-5xl mb-4">404</p>
          <p className="text-gray-500 mb-6">Could not load profile for @{username}</p>
          <Link to="/" className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition-colors">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const added = isInShortlist(user.username);

  const handleAddToList = () => {
    addToShortlist({
      username: user.username,
      fullname: user.fullname,
      followers: user.followers,
      picture: user.picture,
      platform: platform,
      is_verified: user.is_verified,
    });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-800 text-sm font-medium mb-6">
          Back to search
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 h-24" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-12 mb-4">
              <img src={user.picture} alt={user.fullname} className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" />
              <div className="mb-2">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-1">
                  @{user.username}
                  <VerifiedBadge verified={user.is_verified} />
                </h2>
                <p className="text-gray-500 text-sm">{user.fullname}</p>
                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full capitalize font-medium">{platform}</span>
              </div>
            </div>
            {user.description && (
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{user.description}</p>
            )}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-violet-50 rounded-xl p-3">
                <div className="text-xs text-violet-500 font-medium">Followers</div>
                <div className="text-lg font-bold text-violet-700">{formatFollowersDetail(user.followers)}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <div className="text-xs text-green-500 font-medium">Engagement Rate</div>
                <div className="text-lg font-bold text-green-700">{formatEngagementRate(user.engagement_rate)}</div>
              </div>
              {user.posts_count !== undefined && (
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="text-xs text-blue-500 font-medium">Posts</div>
                  <div className="text-lg font-bold text-blue-700">{user.posts_count}</div>
                </div>
              )}
              {user.avg_likes !== undefined && (
                <div className="bg-pink-50 rounded-xl p-3">
                  <div className="text-xs text-pink-500 font-medium">Avg Likes</div>
                  <div className="text-lg font-bold text-pink-700">{formatFollowersDetail(user.avg_likes)}</div>
                </div>
              )}
              {user.avg_comments !== undefined && (
                <div className="bg-orange-50 rounded-xl p-3">
                  <div className="text-xs text-orange-500 font-medium">Avg Comments</div>
                  <div className="text-lg font-bold text-orange-700">{user.avg_comments}</div>
                </div>
              )}
              {user.avg_views !== undefined && user.avg_views > 0 && (
                <div className="bg-teal-50 rounded-xl p-3">
                  <div className="text-xs text-teal-500 font-medium">Avg Views</div>
                  <div className="text-lg font-bold text-teal-700">{formatFollowersDetail(user.avg_views)}</div>
                </div>
              )}
              {user.engagements !== undefined && (
                <div className="bg-yellow-50 rounded-xl p-3">
                  <div className="text-xs text-yellow-600 font-medium">Engagements</div>
                  <div className="text-lg font-bold text-yellow-700">{formatFollowersDetail(user.engagements ?? 0)}</div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {user.url && (
                <a href={user.url} target="_blank" className="text-sm text-violet-600 hover:text-violet-800 font-medium">
                  View on platform
                </a>
              )}
              <button
                onClick={handleAddToList}
                disabled={added}
                className={`ml-auto px-6 py-2 rounded-full font-semibold text-sm transition-all ${added ? "bg-green-100 text-green-700 border border-green-300" : "bg-violet-600 text-white hover:bg-violet-700 shadow-sm"}`}
              >
                {added ? "Added to List!" : "+ Add to List"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
