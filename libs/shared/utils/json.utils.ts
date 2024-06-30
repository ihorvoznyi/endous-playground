export function safeJSONParse<T = unknown, K = null>(
  text: string,
  fallback: K = null as K,
) {
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    console.error(`Failed to parse JSON. \nError:`, error);
    return fallback;
  }
}
