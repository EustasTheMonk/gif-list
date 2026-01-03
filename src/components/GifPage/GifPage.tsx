import {getGifById} from "@/api/requests/getGifById";
import type {GiphyGif} from "@/api/requests/types/giphyTypes";
import {routesParams} from "@/Enums/routesParams";
import {copyToClipboard} from "@/utils/CopyToClipBoard";
import {downloadByUrl} from "@/utils/downloadGifByUrl";
import {callToast} from "@/utils/toastHandler";
import {
  Box,
  Button,
  Center,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {FaDownload} from "react-icons/fa";
import {useParams} from "react-router";

export const GifPage = () => {
  const params = useParams();
  const [gifInfo, setGifInfo] = useState<GiphyGif | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const paramId = params[routesParams.id];

  useEffect(() => {
    if (!paramId) return;

    let isCancelled = false;

    const fetchGif = async () => {
      setIsLoading(true);
      try {
        const res = await getGifById(paramId);
        if (!isCancelled) {
          setGifInfo(res.data.data);
        }
      } catch {
        if (!isCancelled) {
          callToast('error', 'Something went wrong. Try again later');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchGif();

    return () => {
      isCancelled = true;
    };
  }, [paramId]);


  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!gifInfo && !isLoading) {
    return (
      <Center mt={5}>
        <Text fontSize="2xl" fontWeight="bold">
          Gif not found
        </Text>
      </Center>
    )
  }

  return (
    <>
      <Center mb={5}>
        {gifInfo?.title && (
          <Text fontWeight="bold" fontSize={"3xl"}>
            {gifInfo?.title}
          </Text>
        )}
      </Center>
      <Center alignItems="flex-start">
        <Box>
          <img src={gifInfo?.images.original?.webp} alt="" />
        </Box>
        <Box marginLeft={15}>
          <Box>
            <Button
              title="Copy gif url"
              disabled={!gifInfo?.images.original?.url}
              onClick={async () => {
                const ok = await copyToClipboard(
                  gifInfo?.images.original?.url
                );
                if (ok) {
                  callToast("success", "Successfully copied to clipboard");
                } else {
                  callToast("error", "Something went wrong. Try again");
                }
              }}
            >
              Copy gif url
            </Button>

            <IconButton
              title="Download gif"
              marginLeft={15}
              onClick={() => {
                if (gifInfo?.images.original?.url) {
                  void downloadByUrl(gifInfo?.images.original?.url, gifInfo?.title);
                }
              }}
            >
              <FaDownload color="white" />
            </IconButton>
          </Box>
          <Box mt={15} flexDir={"column"}>
            {gifInfo?.import_datetime && (
              <Box>Import date: {gifInfo?.import_datetime}</Box>
            )}
            {gifInfo?.username && <Box>Creator {gifInfo?.username}</Box>}
          </Box>
        </Box>
      </Center>
    </>
  );
};
