// Set before use 'Workers - Settings - Variables - KV Namespace Bindings'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  const { searchParams, hostname, protocol } = new URL(request.url);
  const path = new URL(request.url).pathname;

  if (path.length > 1) {
    const key = path.slice(1);
    const url = await YuhURLs.get(key);

    if (url) {
      return Response.redirect(url, 301);
    } else {
      return new Response(JSON.stringify({
        status: 404,
        message: 'Key not exist'
      }), {
        status: 404,
        statusText: 'Not found',
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  if (searchParams.get('key')) {
    try {
      const newurl = new URL(searchParams.get('url'));
      const newkey = searchParams.get('key') || '';
      while (await YuhURLs.get(newkey)) {
        return new Response(JSON.stringify({
        status: 400,
        message: 'Key unavailable',
        newkey
      }), {
        status: 400,
        statusText: 'Bad Request',
        headers: { "Content-Type": "application/json" }
      });
      }
      await YuhURLs.put(newkey, newurl.toString());
      const urls = `${protocol}//${hostname}/${newkey}`;
      return new Response(JSON.stringify({
        status: 200,
        message: 'Success',
        urls
      }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({
        status: 400,
        message: e.message,
        urls: null
      }), {
        status: 400,
        statusText: 'Bad Request',
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  let html_content = "";
  let html_style = `body,html{width:100%;height:100%}
body{padding:0; margin:0 !important}
body{background:linear-gradient(to bottom, #111 30%, #222 90%)}
#container {display: flex;flex-direction:column;align-items: center;justify-content: center;height: 100%;color:white;font-family:sans-serif}
.link {color:#fff;font-family:monospace;padding-right:25px}
.codeblock {font-family:monospace;color:#000;background-color:#e2e2e2;padding:2px}`;

  html_content += `<h1>URL Shortener</h1>
<h2>Pre</h2>
<pre>Cloudflare account, familiar to Workers & KV</pre>
<h2>Install</h2>
<p>1. Create a namespace YuhURLs in 'Workers - KV'</br>
2. Set 'Workers - Settings - Variables - KV Namespace Bindings'</br>
3. Go to the "Workers" tab and click "Create a Worker"</br>
4. Paste the workers.yurl.js code into the editor</br>
5. Click "Save and deploy"</br>
6. Set Triggers - Custom Domains or Routers</br>
Tips: you can change YuhURLs as what you want, remember replace in code</p>
<h3>Usage</h3>
<p>1. <code class="codeblock">$ curl '${protocol}//${hostname}/?key=yuh&url=http://example.com'</code></br>
2. Open in Browser <a class="link" href="${protocol}//${hostname}/?key=yuh&url=http://example.com">${protocol}//${hostname}/?key=yuh&url=http://example.com</a></p>
<h4>Test</h4>
<pre>${protocol}//${hostname}/yuh</pre>`;
  let html = `<!DOCTYPE html>
<head>
<title>URL Shortener with Workers KV</title>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover">
</head>
<body>
<style>${html_style}</style>
<div id="container">
${html_content}
</div>
</body></html>`;
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}
