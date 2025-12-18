import { useState } from 'react';
import { actions } from 'astro:actions';

interface SocialActionsProps {
    recipeId: string;
    initialLiked: boolean;
    initialBookmarked: boolean;
    likesCount: number;
}

export default function SocialActions({ recipeId, initialLiked, initialBookmarked, likesCount: initialCount }: SocialActionsProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [bookmarked, setBookmarked] = useState(initialBookmarked);
    const [count, setCount] = useState(initialCount);

    const handleLike = async () => {
        // Optimistic update
        const newLiked = !liked;
        setLiked(newLiked);
        setCount(prev => newLiked ? prev + 1 : prev - 1);

        const { error } = await actions.toggleLike({ recipeId });
        if (error) {
            // Revert on error
            setLiked(liked);
            setCount(count);
            alert("Please sign in to like recipes.");
        }
    };

    const handleBookmark = async () => {
        setBookmarked(!bookmarked);
        const { error } = await actions.toggleBookmark({ recipeId });
        if (error) {
            setBookmarked(bookmarked);
            alert("Please sign in to save recipes.");
        }
    };

    return (
        <div className="flex items-center gap-4 py-6 border-t border-gray-100 mt-12">
            <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${liked ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <span className="font-bold">{count}</span>
            </button>

            <button 
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${bookmarked ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                <span className="font-bold">{bookmarked ? 'Saved' : 'Save'}</span>
            </button>
        </div>
    );
}
