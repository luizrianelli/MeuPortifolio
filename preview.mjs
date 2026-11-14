import http from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (pathname === '/api/curriculo' && req.method === 'POST') {
      const origin = req.headers.origin;
      if (!['http://127.0.0.1:4173','http://localhost:4173'].includes(origin) || !['127.0.0.1:4173','localhost:4173'].includes(req.headers.host)) {res.writeHead(403).end('Origem não permitida');return;}
      let size = 0; const chunks = [];
      for await (const chunk of req) {size += chunk.length;if(size>10*1024*1024){res.writeHead(413).end('O PDF deve ter até 10 MB.');return;}chunks.push(chunk);}
      const pdf = Buffer.concat(chunks);
      if (pdf.subarray(0,5).toString() !== '%PDF-') {res.writeHead(400).end('Selecione um arquivo PDF válido.');return;}
      await mkdir(path.join(root,'assets'),{recursive:true});
      await writeFile(path.join(root,'assets','curriculo.pdf'),pdf);
      res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'}).end('Currículo atualizado no projeto.');return;
    }
    if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405).end();return;}
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) {res.writeHead(403).end();return;}
    const body = await readFile(file);
    res.writeHead(200,{'Content-Type':path.extname(file)==='.pdf'?'application/pdf':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}).end(req.method==='HEAD'?undefined:body);
  } catch {res.writeHead(404).end('Página não encontrada');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
