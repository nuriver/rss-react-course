export default function getCookie(
  name: string,
  cookieHeader: string | null
): string | undefined {
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader
    .split('; ')
    .reduce((acc: Record<string, string>, cookie: string) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});
  return cookies[name];
}
