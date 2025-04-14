export function Button({ children, className, onClick, type = "button" }: { children: React.ReactNode; className?: string; onClick?: () => void; type?: "button" | "submit" | "reset" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-blue-500 hover:bg-blue-700 transition text-white py-2 px-4 rounded-lg ${className || ""}`}
      >
        {children}
      </button>
    );
  }