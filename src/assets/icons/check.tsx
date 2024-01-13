interface Props {
  className?: string
}

export function CheckIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.625 12c0 6.422-5.25 11.625-11.625 11.625C5.578 23.625.375 18.422.375 12 .375 5.625 5.578.375 12 .375c6.375 0 11.625 5.25 11.625 11.625zm-12.984 6.188l8.625-8.625c.28-.282.28-.797 0-1.079l-1.078-1.03a.663.663 0 00-1.032 0l-7.031 7.03-3.328-3.28a.663.663 0 00-1.031 0l-1.079 1.03c-.28.282-.28.797 0 1.079l4.875 4.874c.282.282.797.282 1.079 0z"
        fill="#42BD97"
      />
    </svg>
  )
}
