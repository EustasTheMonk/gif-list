export type GiphyResponse = {
  data: GiphyGif[];
  pagination?: GiphyPagination;
  meta?: GiphyMeta;
};

export type SingleGiphyResponse = {
  data: GiphyGif;
  pagination?: GiphyPagination;
  meta?: GiphyMeta;
};

export type GiphyPagination = {
  total_count?: number;
  count?: number;
  offset?: number;
};

export type GiphyMeta = {
  status?: number;
  msg?: string;
  response_id?: string;
};

export type GiphyGif = {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
  user?: GiphyUser;
  analytics_response_payload?: string;
  analytics?: GiphyAnalytics;
  alt_text?: string;
  is_low_contrast?: boolean;
};

export type GiphyImages = {
  original?: GiphyImageRendition;
  fixed_height?: GiphyImageRendition;
  fixed_height_downsampled?: GiphyImageRendition;
  fixed_height_small?: GiphyImageRendition;
  fixed_width?: GiphyImageRendition;
  fixed_width_downsampled?: GiphyImageRendition;
  fixed_width_small?: GiphyImageRendition;
  [key: string]: GiphyImageRendition | undefined;
};

export type GiphyImageRendition = {
  height?: string;
  width?: string;
  size?: string;
  url?: string;
  mp4_size?: string;
  mp4?: string;
  webp_size?: string;
  webp?: string;
  frames?: string;
  hash?: string;
};

export type GiphyUser = {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
};

export type GiphyAnalytics = {
  onload?: GiphyAnalyticsEvent;
  onclick?: GiphyAnalyticsEvent;
  onsent?: GiphyAnalyticsEvent;
};

export type GiphyAnalyticsEvent = {
  url: string;
};