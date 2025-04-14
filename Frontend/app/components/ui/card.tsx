export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-white shadow-md rounded-lg p-4  ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`border-b pb-2 mb-2 font-semibold text-lg  ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
  }
  
  export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h2 className={`text-xl font-bold  text-black ${className}`}>{children}</h2>;
  }
  