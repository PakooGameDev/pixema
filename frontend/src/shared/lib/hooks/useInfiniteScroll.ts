import { useEffect } from 'react';

const useInfiniteScroll = (loadMoreRef: React.RefObject<HTMLDivElement>, loading: boolean, hasMore: boolean, setCurrentPage: React.Dispatch<React.SetStateAction<number>>) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && hasMore) {
                setCurrentPage((prev) => prev + 1);
            }
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [loading, hasMore, loadMoreRef, setCurrentPage]);
};

export default useInfiniteScroll;
