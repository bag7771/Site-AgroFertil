import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: rota inexistente acessada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Página não encontrada
        </p>
        <a href="/" className="text-primary underline underline-offset-4">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
