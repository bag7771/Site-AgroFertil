export function somenteNumeros(valor: string): string {
  return valor.replace(/\D+/g, "");
}

export function maskCpfCnpj(valor: string): string {
  const digits = somenteNumeros(valor).slice(0, 14);
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 9);
    const part4 = digits.slice(9, 11);
    let out = part1;
    if (part2) out += "." + part2;
    if (part3) out += "." + part3;
    if (part4) out += "-" + part4;
    return out;
  } else {
    // CNPJ: 00.000.000/0000-00
    const part1 = digits.slice(0, 2);
    const part2 = digits.slice(2, 5);
    const part3 = digits.slice(5, 8);
    const part4 = digits.slice(8, 12);
    const part5 = digits.slice(12, 14);
    let out = part1;
    if (part2) out += "." + part2;
    if (part3) out += "." + part3;
    if (part4) out += "/" + part4;
    if (part5) out += "-" + part5;
    return out;
  }
}

export function maskTelefoneBR(valor: string): string {
  const digits = somenteNumeros(valor).slice(0, 11);
  const ddd = digits.slice(0, 2);
  const parte1 = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
  const parte2 = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);
  let out = "";
  if (ddd) out += `(${ddd})`;
  if (parte1) out += (out ? " " : "") + parte1;
  if (parte2) out += "-" + parte2;
  return out;
}

export function maskCEP(valor: string): string {
  const digits = somenteNumeros(valor).slice(0, 8);
  const part1 = digits.slice(0, 5);
  const part2 = digits.slice(5, 8);
  return part2 ? `${part1}-${part2}` : part1;
}

export function validarCPF(cpf: string): boolean {
  const s = somenteNumeros(cpf);
  if (s.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(s)) return false;
  const nums = s.split("").map((n) => parseInt(n, 10));
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += nums[i] * (10 - i);
  let d1 = 11 - (sum % 11);
  if (d1 >= 10) d1 = 0;
  if (d1 !== nums[9]) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += nums[i] * (11 - i);
  let d2 = 11 - (sum % 11);
  if (d2 >= 10) d2 = 0;
  return d2 === nums[10];
}

export function validarCNPJ(cnpj: string): boolean {
  const s = somenteNumeros(cnpj);
  if (s.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(s)) return false;
  const nums = s.split("").map((n) => parseInt(n, 10));
  const calc = (base: number[]) => {
    let sum = 0;
    let pos = 5;
    for (let i = 0; i < 12; i++) {
      sum += base[i] * pos;
      pos--;
      if (pos < 2) pos = 9;
    }
    let d = sum % 11;
    return d < 2 ? 0 : 11 - d;
  };
  const base12 = nums.slice(0, 12);
  const d1 = calc(base12);
  if (d1 !== nums[12]) return false;
  const base13 = nums.slice(0, 13);
  let sum = 0;
  let pos = 6;
  for (let i = 0; i < 13; i++) {
    sum += base13[i] * pos;
    pos--;
    if (pos < 2) pos = 9;
  }
  let d2 = sum % 11;
  d2 = d2 < 2 ? 0 : 11 - d2;
  return d2 === nums[13];
}

export function validarDocumento(doc: string): boolean {
  const s = somenteNumeros(doc);
  if (s.length === 11) return validarCPF(s);
  if (s.length === 14) return validarCNPJ(s);
  return false;
}
