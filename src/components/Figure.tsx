import clsx from "clsx";
import React from "react";

type FigureProp = { img_src: string; caption: React.ReactNode; isDark: boolean; idx: number; }

const Figure = ({ img_src, caption, isDark, idx }: FigureProp) => {
  const caption_clr = isDark ? 'text-gray-400' : 'text-gray-600';
  const img_style = isDark ? 'w-full h-auto rounded-md bg-neutral-400 p-2' : 'w-full h-auto rounded-md p-2';

  return (
    <figure className='flex flex-col items-center justify-center'>
      <img src={img_src} className={img_style} />
      <figcaption className={clsx(caption_clr, 'mt-2', 'font-light')}>Figure {idx}. {caption}</figcaption>
    </figure>
  );
}

export default Figure;

