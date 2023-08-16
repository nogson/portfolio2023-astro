export type FrontmatterType = {
  layout: string;
  title: string;
  pubDate: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  tags: string[];
  draft: boolean;
};
