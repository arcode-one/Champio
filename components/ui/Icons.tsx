type IconProps = { className?: string };

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function MushroomMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 42 42" aria-hidden="true">
      <path
        d="M7 21.2C7 12.8 13.3 6 21 6s14 6.8 14 15.2H7Z"
        fill="currentColor"
      />
      <path
        d="M17.2 20.7c0 7.8-2.6 10.5-4.4 13.3h16.4c-1.8-2.8-4.4-5.5-4.4-13.3"
        fill="currentColor"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
