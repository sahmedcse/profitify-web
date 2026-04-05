interface ProfitifyIconProps {
  size?: number;
  className?: string;
}

export function ProfitifyIcon({ size = 32, className }: ProfitifyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-52 -52 104 104"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="-52" y="-52" width="104" height="104" rx="22" fill="#059669" />
      <ellipse cx="0" cy="38" rx="20" ry="4.5" fill="#047857" opacity="0.4" />
      <circle cx="0" cy="16" r="19" fill="#fff" />
      <circle
        cx="0"
        cy="16"
        r="14.5"
        fill="none"
        stroke="#059669"
        strokeWidth="0.6"
        opacity="0.25"
      />
      <path
        d="M3.5,6.5 C3.5,6.5 -7,7 -7,11 C-7,15.5 7.5,16 7.5,20.5 C7.5,24 -1,25.5 -3.5,24.5"
        fill="none"
        stroke="#059669"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="4.5"
        x2="0"
        y2="27.5"
        stroke="#059669"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M0,-3 C0,-3 0,-14 0,-22"
        fill="none"
        stroke="#34D399"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M0,-22 C0,-22 -16,-36 -12,-42 C-8,-46 -2,-34 0,-22Z" fill="#34D399" />
      <path
        d="M0,-22 C-2,-26 -6,-32 -9,-36"
        fill="none"
        stroke="#059669"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path d="M-0.5,-14 C-0.5,-14 17,-24 14,-32 C11,-38 1,-24 -0.5,-14Z" fill="#6EE7B7" />
      <path
        d="M-0.5,-14 C2,-18 9,-24 11,-27"
        fill="none"
        stroke="#059669"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
