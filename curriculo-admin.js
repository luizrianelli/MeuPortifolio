document.querySelector('#upload').addEventListener('submit',async event=>{
  event.preventDefault(); const status=document.querySelector('#status');
  const file=document.querySelector('#pdf').files[0];
  if(!file)return;
  if(file.size>10*1024*1024){status.textContent='O PDF deve ter até 10 MB.';return;}
  const button=event.target.querySelector('button');button.disabled=true;
  status.textContent='Salvando currículo…';
  try {const result=await fetch('/api/curriculo',{method:'POST',headers:{'Content-Type':'application/pdf'},body:file});const message=await result.text();if(!result.ok)throw new Error(message);status.textContent='Currículo atualizado. O botão de download já usa este PDF na prévia local.';}
  catch(error){status.textContent=location.protocol==='file:'?'Abra esta página pelo servidor local para salvar o PDF.':error.message;}
  finally{button.disabled=false;}
});
