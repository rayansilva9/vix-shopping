function replaceProtocol(link: string) {
  return link.replace(/^\/\//, 'https://')
}
export function processLink(link: string) {
  if (link !== null) {
    if (link.startsWith('//')) {
      return replaceProtocol(link)
    } else {
      return link // Não começa com //, não precisa substituir
    }
  }
}
