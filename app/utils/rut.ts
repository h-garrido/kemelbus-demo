/**
 * Helper de utilidades para el RUT Chileno
 * Proporciona funciones de limpieza, formato y validación matemática
 */

/**
 * Limpia el RUT de cualquier caracter que no sea número o la letra K
 */
export function cleanRUT(rut: string): string {
  if (typeof rut !== 'string') return '';
  return rut.replace(/[^0-9kK]/g, '').toUpperCase();
}

/**
 * Formatea un string de RUT al estándar nacional chileno: XX.XXX.XXX-X
 */
export function formatRUT(rut: string): string {
  const cleaned = cleanRUT(rut);
  if (cleaned.length < 2) return cleaned;
  
  const dv = cleaned.slice(-1);
  const r = cleaned.slice(0, -1);
  
  let formatted = '';
  let j = 0;
  for (let i = r.length - 1; i >= 0; i--) {
    formatted = r.charAt(i) + formatted;
    j++;
    if (j === 3 && i > 0) {
      formatted = '.' + formatted;
      j = 0;
    }
  }
  return `${formatted}-${dv}`;
}

/**
 * Valida un RUT chileno usando el algoritmo oficial de Módulo 11
 */
export function validateRUT(rut: string): boolean {
  const cleaned = cleanRUT(rut);
  if (cleaned.length < 8 || cleaned.length > 9) return false;
  
  const dv = cleaned.slice(-1);
  const r = parseInt(cleaned.slice(0, -1), 10);
  if (isNaN(r)) return false;

  let sum = 0;
  let mul = 2;
  let temp = r;

  while (temp > 0) {
    sum += (temp % 10) * mul;
    temp = Math.floor(temp / 10);
    mul = mul === 7 ? 2 : mul + 1;
  }

  const expectedDv = 11 - (sum % 11);
  let dvStr = '';
  if (expectedDv === 11) dvStr = '0';
  else if (expectedDv === 10) dvStr = 'K';
  else dvStr = expectedDv.toString();

  return dvStr === dv;
}
