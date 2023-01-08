addEventListener("fetch", async (event) => {
  event.respondWith(handleRequest(event.request));
});

const home = "http://example.com"
const list = {
  "yuh":"http://example.com/yuh",
  "hub":"http://example.com/hub"
};

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);
  const path = pathname.substring(1);

  if (path === "") {
    return Response.redirect(home);
  }

  if (path in list) {
    return Response.redirect(list[path]);
  }

  return Response.redirect(home);
}
