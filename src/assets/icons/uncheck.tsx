interface Props {
  className?: string
}

export function UnCheckIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 .375C5.578.375.375 5.578.375 12S5.578 23.625 12 23.625 23.625 18.422 23.625 12 18.422.375 12 .375zm0 21A9.343 9.343 0 012.625 12c0-5.156 4.172-9.375 9.375-9.375 5.156 0 9.375 4.219 9.375 9.375 0 5.203-4.219 9.375-9.375 9.375z"
        fill="currentColor"
      />
    </svg>
  )
}
