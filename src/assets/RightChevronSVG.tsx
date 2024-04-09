import { SVGProps } from '@/types/types';

export default function RightChevronSVG({ width, height, color }: SVGProps) {
  return (
    <svg
      height={height || 24}
      width={width || 24}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 185.343 185.343"
    >
      <g>
        <g>
          <path
            className="fill-black dark:fill-base-200"
            fill={color}
            d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175 l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934 c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"
          />
        </g>
      </g>
    </svg>
  );
}
