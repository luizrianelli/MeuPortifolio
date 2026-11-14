# Portfólio de Luiz Fernando Rianelli — versão 2

Versão 2 preparada para publicação gratuita no GitHub Pages. Consulte `PUBLICACAO.md` para o endereço público e a configuração da hospedagem.

## Testar e comparar

Requer Node.js. Não precisa instalar dependências.

```powershell
cd 'C:\Users\luizf\OneDrive\Documents\ChatGPT\Gerenciador financeiro\portfolio-luiz'
node preview.mjs
```

- Novo: http://127.0.0.1:4173/
- Anterior preservado: http://127.0.0.1:4173/original/index.html
- Verificação: `node --check app.js` e `node --check preview.mjs`.
- Encerrar: Ctrl+C no terminal.

## O que mudou

| Antes | Nova proposta |
| --- | --- |
| Apresentação, skills, novidades e contatos em páginas separadas | Página única com navegação por seção e rack clicável |
| Destaque azul e cartões convencionais | Verde lima, tipografia editorial e metáfora de laboratório |
| Tecnologias em uma grade de logos | Stack agrupada por uso e foco em Java |
| Novidades em sequência | Projetos com imagens e links, Arduino como exploração |
| Formulário dependente de serviço externo | Contato direto por e-mail e LinkedIn, com cópia de endereço |
| Tema único | Temas claro e escuro, preferência salva localmente |

Conteúdo baseado no repositório original; sem empresas, métricas, experiência profissional ou certificações inventadas. A experiência visual inspira-se no rack de https://marujo.dev/, implementado aqui em CSS e HTML próprios, sem copiar código, imagens ou currículo do autor. Não foi identificado um repositório público do site entre os repositórios públicos de `lucasmarujo` consultados. Portanto, não houve auditoria do código-fonte completo nem de sua licença. O HTML público observado carrega Three.js, pós-processamento e GSAP; esta versão não necessita dessas bibliotecas.

## Domínio próprio — preparado, ainda não configurado

Este site é estático e usa caminhos relativos, compatíveis com GitHub Pages tanto em `/MeuPortifolio/` quanto na raiz de um domínio próprio. Não é necessário mudar de hospedagem. O domínio precisa ser escolhido e registrado pelo proprietário. Exemplos de nomes para avaliar: `luizrianelli.dev`, `luizrianelli.com.br`. Disponibilidade e preços não foram verificados.

Depois de aprovar a versão:

1. Confirmar textos, projetos e dados atuais. A formação e os idiomas refletem o conteúdo do portfólio original.
2. Remover a meta `robots` com `noindex,nofollow` de `index.html` para permitir indexação. Essa meta não torna uma publicação privada.
3. Adicionar URL canônica e metadados sociais com o domínio escolhido e uma imagem de compartilhamento absoluta.
4. Publicar somente a versão aprovada, preservando um histórico Git. A pasta `original/` serve para comparação local e pode ser excluída do pacote público.
5. Verificar a propriedade do domínio nas configurações da conta GitHub → Pages, usando o TXT fornecido pelo GitHub. Manter esse TXT.
6. No repositório → Settings → Pages, cadastrar o domínio. Na publicação por branch, isso cria o arquivo `CNAME`; em um workflow próprio de Actions, esse arquivo é ignorado.
7. Configurar os registros DNS no provedor do domínio. Para `www`, o CNAME aponta a `luizrianelli.github.io` (sem `/MeuPortifolio`). Para a raiz, usar os quatro registros A abaixo.
8. Confirmar o DNS e ativar Enforce HTTPS quando o certificado estiver disponível. Testar domínio raiz, www, imagens, navegação e links no celular. A propagação pode levar até 24 horas.

| Tipo | Nome | Destino |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | luizrianelli.github.io |

Não criar CNAME no site enquanto o hostname real não for definido. Não usar registros DNS curinga. Os passos devem ser conferidos no provedor do domínio quando forem executados.

Fontes oficiais consultadas:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

## Manutenção

Conteúdo: `index.html`. Aparência e breakpoints: `styles.css`. Interações: `app.js`. As fontes vêm do Google Fonts; se o serviço não carregar, o site usa fontes de sistema. Imagens do próprio repositório ficam em `imagens/`. Nenhum formulário envia dados e nenhuma API de métricas é consultada. O tema usa somente armazenamento local do navegador.

### Atualizar currículo

Com `node preview.mjs` em execução, abra http://127.0.0.1:4173/atualizar-curriculo.html e selecione um PDF de até 10 MB. A ferramenta substitui `assets/curriculo.pdf` nesta cópia local do projeto. O download no portfólio aparece quando esse arquivo existe. O currículo fornecido foi integrado em `assets/curriculo.pdf`; o botão de download está disponível também ao abrir o HTML diretamente. Outra opção é copiar manualmente o PDF para esse mesmo caminho.

A ferramenta de upload funciona somente no servidor de desenvolvimento, vinculado ao loopback e com verificação de origem. Em GitHub Pages ela não salva arquivos. Para a publicação futura, inclua o PDF no pacote e deixe `atualizar-curriculo.html`, `curriculo-admin.js` e `preview.mjs` fora dos arquivos públicos. Atualizar o PDF local não atualiza automaticamente um site publicado.

### Idiomas e contato

O botão EN/PT traduz os textos de apresentação, navegação, descrições, contato e rótulos de acessibilidade; a preferência fica salva no navegador. O dicionário está em `language.js` e deve ser atualizado quando houver novos textos. Nomes próprios, instituições, marcas, linguagens e o exemplo de código mantêm sua identidade original. O currículo será baixado no idioma do PDF anexado: o botão de idioma não traduz o documento.

O cabeçalho acompanha a rolagem. O botão Falar comigo abre o aplicativo de e-mail com o endereço já usado no portfólio original. O rodapé usa o nome Luiz Rianelli e o ano 2026, conforme solicitado.

### Nome com efeito de digitação

Ao carregar a página, o nome é digitado uma vez, letra por letra, com o cursor passando da primeira linha para o sobrenome. Depois, o underline continua piscando. O título reserva o tamanho final para evitar deslocamentos no conteúdo e mantém o nome completo acessível a leitores de tela. Sem JavaScript ou com preferência por movimento reduzido, o nome aparece completo. A troca de idioma não reinicia nem altera a digitação.

Validação: observados o estado parcial e o nome completo no navegador, com a mesma altura do título antes e depois; cursor com animação ativa; troca PT/EN preserva o nome; layout móvel sem rolagem horizontal.

## Validação desta entrega

- Sintaxe de `app.js` e `preview.mjs` verificada com Node.js; `git diff --check` passou.
- Página carregada no navegador desktop e em viewport móvel de 390 × 844.
- Alternância de tema e menu móvel verificados; navegação do menu até projetos fecha o menu.
- Após corrigir o brilho do rack, largura do conteúdo móvel e viewport coincidem: 375 px úteis, sem rolagem horizontal.
- Nenhuma âncora interna inválida ou imagem quebrada encontrada no DOM.
- Links externos preservam os destinos do portfólio; não foram auditados individualmente. A cópia usa Clipboard API com mensagem alternativa se o navegador negar acesso.
- Captura da versão desktop inicial: `preview-desktop.png`. Ajustes de contato: `preview-contato.png` e `preview-contato-mobile.png`.
- Atualização adicional: PT/EN e retorno ao português conferidos no navegador; cabeçalho permanece em posição zero durante a rolagem. Menu com currículo funciona no celular, sem exceder a largura da tela.
- Cópia de e-mail confirmou sucesso no navegador; links de contato apontam ao endereço original.
- Upload local verificado com um PDF temporário: requisição sem origem autorizada e arquivo incorreto recusados; PDF salvo e baixado com bytes idênticos. Arquivo de teste removido ao finalizar.


O currículo fica agora junto à apresentação, em um botão compacto com borda. A antiga seção exclusiva foi removida; o menu leva à seção de contato, reservada ao e-mail e às redes sociais.

Trajetória revisada: graduação UVA com início em fevereiro de 2024 e conclusão prevista em dezembro de 2027; cursos e certificações em bloco separado por instituições, com os nomes já presentes no portfólio original. Removidos os blocos genéricos Aprendizado contínuo e Na prática e o destaque Arduino. Conferidos o destino mailto do botão de contato e a tradução das novas datas.

Ajustes adicionais: bootcamp Java com Inteligência Artificial (DIO/Itaú), em andamento desde setembro de 2026 conforme relato do proprietário; Spring Boot e APIs REST na stack; menu em IBM Plex Mono; QUEM SOU EU no rack; favicon SVG próprio nas cores do site. ToDo List substitui a autorreferência do portfólio, com link verificado para https://github.com/luizrianelli/todo-list e descrição baseada nos arquivos públicos. O cartão usa uma ilustração em HTML/CSS, não uma captura da aplicação. Conferidos tradução e largura móvel.

Contato atualizado: o título ganha digitação ao entrar na área visível, com cursor piscante e suporte PT/EN e movimento reduzido. Falar comigo agora usa a composição web do Gmail com destinatário preenchido; permanece disponível a alternativa mailto e a cópia do endereço. O Gmail pode exigir login. A animação foi observada em estado parcial e completo, sem mudança de altura; o destino foi conferido no DOM, mas a composição externa não foi validada nesta sessão.
