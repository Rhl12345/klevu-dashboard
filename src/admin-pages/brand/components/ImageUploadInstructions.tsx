import React from "react";
import Link from "next/link";

const ImageInstructionsComponent = React.memo<{ imageSize: string }>(
  ({ imageSize }) => (
    <div className="text-sm mt-2 text-quaternary-dark dark:text-quaternary-light">
      Recommended size for brand logo {imageSize} pixel and it's mandatory to
      compress logo via
      <Link
        href="https://tinypng.com/"
        rel="noreferrer"
        className="text-indigo-500 mx-1"
        target="_blank"
      >
        www.tinypng.com
      </Link>
      and then upload.
    </div>
  )
);

export default ImageInstructionsComponent;
