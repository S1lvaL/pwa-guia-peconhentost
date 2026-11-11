export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      //BASE_URL é "/" por padrão; se o app for publicado numa subpasta, o Vite ajusta sozinho
      src={`${import.meta.env.BASE_URL}favicon.svg`}
      alt="Logo do aplicativo"
      width={72}
      height={72}
      className={`size-[72px] shrink-0 object-contain mb-5 mr-3 ${className}`}
    />
  );
}
