import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 font-extrabold tracking-tight text-xl"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span>AgroFertil</span>
        </a>
        <nav className="text-sm text-muted-foreground">
          Atendimento exclusivo para clientes
        </nav>
      </div>
    </header>
  );
}
