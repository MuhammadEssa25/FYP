export function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-16 h-16 rounded-full overflow-hidden border ${className || ""}`}>{children}</div>;
  }
  
  export function AvatarImage({ src, className }: { src: string; className?: string }) {
    return <img src={src} className={`w-full h-full object-cover  ${className || ""}`}  />;
  }
  
  export function AvatarFallback({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-full h-full flex items-center justify-center bg-black-300 ${className || ""}`}>{children}</div>;
  }