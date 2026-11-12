export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      // BASE_URL permite publicação em subpastas
      src={`${import.meta.env.BASE_URL}favicon.svg`}
      alt="Logo do aplicativo"
      width={120}
      height={120}
      className={`w-[clamp(75px,16vw,120px)] h-auto shrink-0 object-contain mb-5 mr-3 ${className}`}
    />
  );
}

