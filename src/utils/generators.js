export function generateClientCode(legal_name, existing_codes = []) {
  const words = legal_name.match(/\b[A-Za-z]+\b/g) || [];
  if (words.length === 0) return null;

  // Step 1: Start with initials
  let code = words.map((w) => w[0].toUpperCase()).join('');
  if (!existing_codes.includes(code)) return code;

  // Step 2: Try adding more letters from each word
  const maxDepth = Math.max(...words.map((w) => w.length));
  for (let i = 1; i < maxDepth; i++) {
    code = words.map((w) => w.slice(0, i + 1).toUpperCase()).join('');
    if (!existing_codes.includes(code)) return code;
  }

  // Step 3: Fallback — append Xs until it's unique
  const base = words.map((w) => w[0].toUpperCase()).join('');
  let suffix = 'X';
  while (existing_codes.includes(base + suffix)) {
    suffix += 'X';
  }
  return base + suffix;
}

export function generateCaseNumber(client_code, existing_case_numbers = []) {
  const matches = existing_case_numbers.filter((num) =>
    num.startsWith(`${client_code}-CASE-`)
  );
  const numbers = matches
    .map((num) => parseInt(num.split('-').pop()))
    .filter((n) => !isNaN(n));

  const next = numbers.length ? Math.max(...numbers) + 1 : 1;
  return `${client_code}-CASE-${String(next).padStart(4, '0')}`;
}
