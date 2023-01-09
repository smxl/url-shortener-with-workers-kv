# URL Shortener

##  URL Shortener with Workers KV
URL Shortener with Workers KV, Custom Key with searchParams

### Pre

Cloudflare account & familiarity with Cloudflare Workers and the Cloudflare Workers Key-Value store.

### Install

1. Create a namespace YuhURLs in 'Workers - KV'
2. Set 'Workers - Settings - Variables - KV Namespace Bindings'
3. Go to the "Workers" tab and click "Create a Worker"
4. Paste the workers.kv.js code into the editor
5. Click "Save and deploy"
6. Set Triggers - Custom Domains or Routers
Tips: you can change YuhURLs as what you want, remember replace in code

### Usage

1. ```$ curl '${protocol}//${hostname}/?key=yuh&url=http://example.com'```
2. Open in Browser [${protocol}//${hostname}/?key=yuh&url=http://example.com](${protocol}//${hostname}/?key=yuh&url=http://example.com)

Test

```${protocol}//${hostname}/yuh```

## URL Shortener Lite

Check workers.list.js and modify the list
