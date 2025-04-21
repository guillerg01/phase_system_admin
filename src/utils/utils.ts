export function getErrorMessage(name: string, errors: any) {
  const keys = name.split(/[\[\].]+/).filter((x) => x); // Divide el nombre en claves
  let error = errors;

  // Recorre las claves para acceder al error correspondiente
  for (const key of keys) {
    if (!error) break;
    error = error[key];
  }

  // Comprueba si 'error' es undefined antes de proceder
  if (typeof error === "undefined") {
    return ""; // O devuelve un mensaje de error genérico si prefieres
  }

  // Ahora puedes usar el operador 'in' seguro
  if ("value" in error) {
    // Si hay un error en 'value', usa ese mensaje
    return error.value.message;
  } else if ("label" in error) {
    // Si no hay un error en 'value', busca en 'label'
    return error.label.message;
  }

  // Devuelve el mensaje de error si existe
  return error?.message;
}

export function formatPhoneNumber(input: string) {
  const numberInput = input.replace(/[^\d]/g, "");
  if (!numberInput) return "";
  if (numberInput.length <= 3) return `(${numberInput}`;
  if (numberInput.length <= 6)
    return `(${numberInput.slice(0, 3)}) ${numberInput.slice(3)}`;
  return `(${numberInput.slice(0, 3)}) ${numberInput.slice(
    3,
    6
  )} ${numberInput.slice(6, 10)}`;
}
