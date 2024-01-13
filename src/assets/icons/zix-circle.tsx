interface Props {
  className?: string
}

export function ZixCircleIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1150_2528)">
        <circle cx={48} cy={44} r={40} fill="currentColor" />
      </g>
      <path
        d="M43.34 54.84h13.6V58H39.02v-2.88l13.52-21.84H39.18v-3.16h17.68V33L43.34 54.84z"
        fill="#fff"
      />
      <defs>
        <filter
          id="filter0_d_1150_2528"
          x={0}
          y={0}
          width={96}
          height={96}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={4} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1150_2528"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1150_2528"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
