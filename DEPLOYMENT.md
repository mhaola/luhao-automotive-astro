# Deploy — DigitalOcean App Platform

O site é publicado como **Static Site** no DigitalOcean App Platform. Não há servidor Node permanente, Docker, banco de dados ou SSR — apenas HTML/CSS/JS estático gerado pelo `astro build`.

## Configuração no App Platform

Ao criar o app na interface do DigitalOcean, selecione:

| Campo | Valor |
| --- | --- |
| Provider | GitHub |
| Repository | `mhoala/luhao-automotive-astro` |
| Branch | `main` |
| Source Directory | `/` |
| Type | **Static Site** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Autodeploy | Enabled (deploy automático a cada push em `main`) |

Não é necessário definir um "Run Command" — sites estáticos no App Platform são servidos diretamente a partir do Output Directory.

## Node.js

O projeto define `"engines": { "node": "22.x" }` em `package.json`. O App Platform detecta essa versão automaticamente ao rodar o build; não é necessário configurar um buildpack customizado.

## Variáveis de ambiente

Se for habilitar o Google Tag Manager, defina no app (Settings → App-Level Environment Variables ou no componente do Static Site):

```text
PUBLIC_GTM_ID=GTM-XXXXXXX
```

Sem essa variável, nenhum script de GTM é carregado — o comportamento padrão é seguro.

## Domínio

Domínio de produção: `luhao-automotive.com.br` (configurado como `site` em `astro.config.mjs`, usado para canonical, sitemap e Open Graph).

Após o primeiro deploy:

1. Adicione o domínio `luhao-automotive.com.br` nas configurações de domínio do App Platform.
2. Aponte o DNS (registro CNAME/A conforme instruído pela própria interface do DigitalOcean) — isso é uma ação a ser feita fora deste repositório.
3. O domínio `www.luhao-automotive.com.br` pode ser configurado posteriormente como redirecionamento para a versão canônica sem `www`.

## Checklist antes do primeiro deploy

- [x] `npm run check` sem erros
- [x] `npm run build` gera `dist/` com sucesso
- [x] `dist/` fora do controle de versão (`.gitignore`)
- [ ] Push do branch `main` para `origin` (GitHub)
- [ ] App criado no DigitalOcean App Platform apontando para `mhoala/luhao-automotive-astro`
- [ ] Domínio `luhao-automotive.com.br` apontado via DNS
