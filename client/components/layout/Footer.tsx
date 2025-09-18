export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} AgroFertil. Todos os direitos
          reservados.
        </p>
        <p className="text-xs">
          Suporte via WhatsApp disponível em horário comercial.
        </p>
      </div>
    </footer>
  );
}
