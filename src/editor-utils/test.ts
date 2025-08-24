// @ts-nocheck
/**
 * Processes a URL based on its extension and whether to use CDN
 * @param url - The input URL to process
 * @param useCdn - Whether to use CDN for supported extensions (default: true)
 * @returns The processed URL with appropriate CDN or regular link format
 */
export function url(url: string, useCdn: boolean = true): string {
  const extension = get_url_extension(url);
  const template = (CDN_EXTENSIONS.indexOf(extension) !== -1 && useCdn ? LINKY_CDN : LINKY);
  return template.replace(/LINKY/, url);
}