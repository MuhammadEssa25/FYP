export function Input({ type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input type={type} className="border p-2 rounded-lg w-full text-black" {...props} />;
  }
  