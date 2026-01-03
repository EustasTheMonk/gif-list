import { getGifsList } from "@/api/requests/getGifsList";
import { useEffect, useRef, useState } from "react";
import type { GiphyGif } from "@/api/requests/types/giphyTypes";
import styles from "./GifsGrid.module.css";
import { callToast } from "@/utils/toastHandler";
import {Link, useParams} from "react-router";
import {Box, Button, Center, Spinner} from "@chakra-ui/react";
import {routesParams} from "@/Enums/routesParams.ts";
import axios from "axios";

export const GifsGrid = () => {
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [nothingFounded, setNothingFounded] = useState(false);
  const params = useParams()
  const searchParam = params[routesParams.search] || ''

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadFirst = async () => {
    setIsLoading(true);
    try {
      const res = await getGifsList(params[routesParams.search], 0);
      setGifs(res.data.data);
      const total = res.data.pagination?.total_count ?? Infinity;
      const count = res.data.pagination?.count ?? res.data.data.length ?? 0;
      setNothingFounded(total === 0);
      setOffset(count);
      setHasMore(count < total);
    } catch {
      callToast("error", "Something went wrong! Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (isLoading || isMoreLoading || !hasMore) return;

    setIsMoreLoading(true);
    try {
      const res = await getGifsList(params[routesParams.search], offset);
      const next = res.data.data ?? [];
      setGifs((prev) => [...prev, ...next]);

      const total = res.data.pagination?.total_count ?? Infinity;
      const count = res.data.pagination?.count ?? next.length ?? 0;

      const newOffset = offset + count;
      setOffset(newOffset);
      setHasMore(newOffset < total && next.length > 0 && res.data.pagination !== undefined);
      if (res.data.pagination === undefined) {
        setHasMore(false);
      }
    } catch (e: unknown) {
      callToast("error", "Could not load more gifs. Try again.");
      if (axios.isAxiosError(e)) {
        setHasMore(e.response?.data?.pagination !== undefined);
      }
    } finally {
      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    setGifs([])
    setOffset(0)
    void loadFirst();
  }, [searchParam]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) void loadMore();
    }, {
      root: null,
      rootMargin: "600px 0px",
      threshold: 0,
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [offset, hasMore, isLoading, isMoreLoading]);

  return (
    <>
      <div className={styles.masonry}>
        {gifs.map((gif) => (
          <Link key={gif.id} to={`/${gif.id}`}>
            <img
              className={styles.masonry_item}
              src={gif.images?.fixed_width_downsampled?.mp4 || gif.images?.fixed_width?.url}
              alt={gif.title ?? "gif"}
              loading="lazy"
            />
          </Link>
        ))}
      </div>

      {isLoading && (
        <Center minH="200px">
          <Spinner size="xl" />
        </Center>
      )}

      {((gifs.length === 0 && !isLoading && !isMoreLoading) || nothingFounded) && (
        <Center flexDirection="column" gap={4}>
          <Box fontSize={'3xl'}>No results found</Box>
          <Button onClick={() => loadFirst()}>Try again</Button>
        </Center>
      )}

      {!isLoading && (
        <Center py={8}>
          {isMoreLoading ? <Spinner /> : null}
          <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />
        </Center>
      )}
    </>
  );
};
