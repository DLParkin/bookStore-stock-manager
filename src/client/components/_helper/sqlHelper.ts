export function sanitizeInput(text: string) {
  return text.replace("&", "and");
}

export function sanitizeInputDate(text: string) {
  return text
    .replace(/[a-zA-Z]/g, "")
    .replace(/,/g, "")
    .replace(/:/g, "")
    .replace("&", "and");
}

export default {
  sanitizeInput,
  sanitizeInputDate
};
