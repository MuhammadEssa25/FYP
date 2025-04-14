export function Tabs({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-full ${className || ""}`}>{children}</div>;
  }
  
  export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`flex border-b mb-4 bg-gray-100 rounded-lg p-2  text-black ${className || ""}`}>{children}</div>;
  }
  
  export function TabsTrigger({
    value,
    children,
    onClick,
    isActive,
    className,
  }: {
    value: string;
    children: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
    className?: string;
  }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg transition ${
          isActive ? "bg-blue-600 text-white" : "bg-white text-black-700 hover:bg-gray-200"
        } ${className || ""}`}
      >
        {children}
      </button>
    );
  }
  
  export function TabsContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-4 text-black !text-black ${className || ""}`}>{children}</div>;
}

  