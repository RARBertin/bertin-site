// www.bertin.com.br responde o mesmo site; leva para o endereço principal
// (bertin.com.br) para o Google não ver duas cópias da página.
export async function onRequest({ request, next }) {
  const url = new URL(request.url)
  if (url.hostname === 'www.bertin.com.br') {
    url.hostname = 'bertin.com.br'
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }
  return next()
}
