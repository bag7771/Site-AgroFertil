import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  maskCEP,
  maskCpfCnpj,
  maskTelefoneBR,
  somenteNumeros,
  validarDocumento,
} from "@/lib/br";

const schema = z.object({
  documento: z
    .string()
    .min(11, "Informe um CPF ou CNPJ válido")
    .refine((v) => validarDocumento(v), "Documento inválido (CPF/CNPJ)"),
  nome: z.string().trim().min(3, "Informe seu nome completo"),
  celular: z.string().refine(
    (v) => {
      const d = somenteNumeros(v);
      return d.length === 10 || d.length === 11;
    },
    { message: "Informe um celular válido" },
  ),
  cep: z.string().refine((v) => somenteNumeros(v).length === 8, {
    message: "CEP inválido",
  }),
  endereco: z.string().trim().min(5, "Informe seu endereço completo"),
});

export type FormData = z.infer<typeof schema>;

export default function ClientRegistrationForm() {
  const [finalizado, setFinalizado] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      documento: "",
      nome: "",
      celular: "",
      cep: "",
      endereco: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: FormData) => {
    // Não salva em banco. Apenas mostra a mensagem de sucesso conforme solicitado.
    setFinalizado(true);
  };

  const whatsUrl = useMemo(() => {
    // Número do vendedor fornecido pelo usuário: +55 65 99683-7318
    const telefone = "5565996837318";
    const texto = encodeURIComponent(
      "Olá, finalizei meu cadastro na AgroFertil.",
    );
    return `https://wa.me/${telefone}?text=${texto}`;
  }, []);

  if (finalizado) {
    return (
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Cadastro finalizado!</CardTitle>
          <CardDescription>
            Entre em contato com o vendedor pelo WhatsApp e avise que seu
            cadastro foi finalizado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <a
              href={whatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button size="lg" className="w-full">
                Abrir WhatsApp
              </Button>
            </a>
            <Button variant="ghost" onClick={() => setFinalizado(false)}>
              Voltar ao formulário
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-xl w-full"
      noValidate
    >
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Cliente</CardTitle>
          <CardDescription>
            Preencha seus dados para concluir o cadastro de acesso ao app.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="documento">CPF/CNPJ</Label>
            <Controller
              control={form.control}
              name="documento"
              render={({ field }) => (
                <Input
                  id="documento"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  value={maskCpfCnpj(field.value)}
                  onChange={(e) => field.onChange(maskCpfCnpj(e.target.value))}
                />
              )}
            />
            {form.formState.errors.documento && (
              <p className="text-sm text-destructive">
                {form.formState.errors.documento.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" {...form.register("nome")} />
            {form.formState.errors.nome && (
              <p className="text-sm text-destructive">
                {form.formState.errors.nome.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="celular">Celular</Label>
            <Controller
              control={form.control}
              name="celular"
              render={({ field }) => (
                <Input
                  id="celular"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  value={maskTelefoneBR(field.value)}
                  onChange={(e) =>
                    field.onChange(maskTelefoneBR(e.target.value))
                  }
                />
              )}
            />
            {form.formState.errors.celular && (
              <p className="text-sm text-destructive">
                {form.formState.errors.celular.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cep">CEP</Label>
              <Controller
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <Input
                    id="cep"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                    value={maskCEP(field.value)}
                    onChange={(e) => field.onChange(maskCEP(e.target.value))}
                  />
                )}
              />
              {form.formState.errors.cep && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.cep.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                placeholder="Rua, número, bairro, cidade/UF"
                autoComplete="street-address"
                {...form.register("endereco")}
              />
              {form.formState.errors.endereco && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.endereco.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-2">
            Cadastrar
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
