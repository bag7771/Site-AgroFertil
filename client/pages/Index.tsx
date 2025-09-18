import ClientRegistrationForm from "@/components/ClientRegistrationForm";

export default function Index() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-emerald-50 via-lime-50 to-white dark:from-background dark:via-background dark:to-background">
      <section className="container py-8 grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Bem-vindo à AgroFertil
          </h1>
          <p className="text-base text-muted-foreground max-w-prose">
            Acesse o formulário abaixo para concluir seu cadastro e liberar o
            acesso ao aplicativo. Seus dados não serão armazenados neste site
          </p>
        </div>
        <div className="flex justify-center mt-2">
          <ClientRegistrationForm />
        </div>
      </section>
    </main>
  );
}
