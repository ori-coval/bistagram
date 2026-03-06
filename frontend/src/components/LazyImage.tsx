import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "../constants";

const LazyImage = ({ postID, alt }: { postID: number; alt: string }) => {
  const [cookies] = useCookies(["access"]);
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(
        `${BACKEND_URL}/post/${postID}/image/0?size=thumbnail`,
        {
          headers: { Authorization: `Bearer ${cookies.access.token}` },
        },
      );

      setSrc(res.data);
    };

    load();
  }, [postID, cookies]);

  if (!src) return null;

  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      width="100%"
      height="100%"
      style={{
        display: "block",
        objectFit: "cover",
        borderRadius: "4px",
      }}
    />
  );
};

export default LazyImage;
