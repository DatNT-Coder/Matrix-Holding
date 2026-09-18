import { useEffect, useState, type ImgHTMLAttributes } from "react";

type ArticleImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
};

const fallbackImage = "/images/matrix-hero-villa.png";

/** Keeps article cards visually intact when an old remote upload is unavailable. */
export function ArticleImage({ src, alt = "", ...props }: ArticleImageProps) {
  const [imageSource, setImageSource] = useState(src || fallbackImage);

  useEffect(() => {
    setImageSource(src || fallbackImage);
  }, [src]);

  return (
    <img
      {...props}
      src={imageSource}
      alt={alt}
      onError={() => {
        if (imageSource !== fallbackImage) setImageSource(fallbackImage);
      }}
    />
  );
}
