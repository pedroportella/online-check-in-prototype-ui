const DEFAULT_CHECK_IN_API = 'http://127.0.0.1:7003';
const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;

export const CHECK_IN_API_BASE =
  viteEnv?.VITE_CHECK_IN_API_BASE?.trim() || DEFAULT_CHECK_IN_API;

export const withCheckInApi = (path: string) => {
  const base = CHECK_IN_API_BASE.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}/${cleanPath}`;
};
