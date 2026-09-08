# LuHao Automotive — Site institucional

Site institucional/comercial da LuHao Automotive, a operação de marketing especializada da LuHao para o setor automotivo (concessionárias, grupos automotivos, operações de assinatura, seminovos, pós-venda e demais empresas do ecossistema automotivo).

Produção: [https://luhao-automotive.com.br](https://luhao-automotive.com.br)

## Stack

- [Astro](https://astro.build) 7 — geração 100% estática
- TypeScript em modo `strict`
- CSS próprio (sem framework de UI), com tokens em `src/styles/global.css`
- Astro Content Collections para o blog (Insights), com categorias, tags, paginação, busca e RSS
- `@astrojs/sitemap` para SEO técnico
- `@astrojs/rss` para o feed de Insights
- Sem React/Vue/Svelte — o mínimo de JavaScript no cliente (menu mobile, FAQ nativo via `<details>`, validação do formulário de contato)

## Instalação

Requer Node.js 22.x.

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:4321`.

## Build

```bash
npm run build
```

Gera o site estático em `dist/` (não versionado).

## Outros comandos

```bash
npm run preview   # serve o build de dist/ localmente
npm run check      # roda astro check (TypeScript + diagnósticos Astro)
```

## Estrutura do projeto

```text
src/
  components/       Componentes reutilizáveis (Header, Footer, ProductCard, LeadForm, FAQ, ...)
  config/site.ts     Configuração central: nome, contato (WhatsApp/e-mail), produtos, case Savol
  content/insights/  Artigos do blog (Markdown)
  content.config.ts  Schema da collection "insights"
  layouts/BaseLayout.astro  Layout base: head, metatags, JSON-LD Organization, header/footer
  pages/             Rotas do site (arquivos .astro definem as URLs)
  styles/global.css  Tokens de design (cores, espaçamento, tipografia) e classes utilitárias
public/               Assets estáticos (favicon, robots.txt, imagem OG)
```

### Sitemap

```text
/
├── produtos/{index,drive,demand,service,qualification,intelligence}.astro
├── cases/{index,savol-sign-drive}.astro
├── insights/
│   ├── [...page].astro        /insights, /insights/2, /insights/3... (9 posts por página)
│   ├── [slug].astro           /insights/meu-slug
│   ├── categoria/[category].astro   /insights/categoria/pos-venda
│   └── tag/[tag].astro              /insights/tag/whatsapp
├── rss.xml.ts                 /rss.xml — feed de todos os Insights publicados
├── sobre.astro
├── contato.astro
├── politica-de-privacidade.astro
└── 404.astro
```

## Editando os produtos

Todos os textos, CTAs e mensagens de WhatsApp de Drive, Demand, Service, Qualification e Intelligence ficam centralizados em [`src/config/site.ts`](src/config/site.ts) (objeto `products`). Ajustar ali reflete automaticamente no menu, nos cards da home/`/produtos` e nas páginas individuais.

O case Savol (métricas, período, headline) também está centralizado ali, no objeto `savolCase`.

## Criando um novo Insight

1. Crie um arquivo Markdown em `src/content/insights/meu-slug.md` (o nome do arquivo vira a URL `/insights/meu-slug`).
2. Preencha o frontmatter conforme o schema de [`src/content.config.ts`](src/content.config.ts): `title`, `description`, `pubDate`, `category`, `tags`, `author`, `draft` (e opcionalmente `updatedDate`, `featured`).
3. Escreva o conteúdo em Markdown abaixo do frontmatter.
4. Artigos com `draft: true` não aparecem na listagem nem são gerados como página.

`category` e cada item de `tags` viram páginas automaticamente — não é preciso cadastrar categorias/tags em nenhum outro lugar. O slug de URL é gerado a partir do texto (acentos e espaços removidos, ex.: "Pós-venda" → `pos-venda`) pela função `slugify` em [`src/lib/slug.ts`](src/lib/slug.ts); a lógica de agrupamento e de posts relacionados fica em [`src/lib/insights.ts`](src/lib/insights.ts).

## Recursos do blog (Insights)

- **Paginação** — `/insights` lista 9 posts por página (`src/pages/insights/[...page].astro`, usa `paginate()` do Astro); páginas seguintes ficam em `/insights/2`, `/insights/3`, etc. Enquanto houver 9 posts ou menos, só a página 1 é gerada.
- **Categorias** — cada valor de `category` gera uma página em `/insights/categoria/[slug]` com a lista de posts daquela categoria. As pílulas de filtro no topo de `/insights` linkam para essas páginas.
- **Tags** — cada tag gera uma página em `/insights/tag/[slug]`, linkada a partir das tags exibidas no rodapé de cada artigo.
- **Busca** — campo de busca em `/insights` (`src/components/InsightSearch.astro`) filtra por título, descrição, categoria e tags inteiramente no navegador (sem backend), usando os dados de todos os posts publicados embutidos na página.
- **Posts relacionados** — cada artigo mostra até 3 sugestões em "Continue lendo", priorizando a mesma categoria e depois tags em comum (`getRelatedInsights` em `src/lib/insights.ts`).
- **RSS** — feed completo em `/rss.xml`, linkado no `<head>` de todas as páginas.

## Variáveis de ambiente

Veja [`.env.example`](.env.example).

- `PUBLIC_GTM_ID` — ID do Google Tag Manager (opcional). Se vazio/ausente, nenhum script de GTM é carregado.

Nunca commitar um `.env` com valores reais.

## Dados de contato

WhatsApp e e-mail ficam centralizados em `src/config/site.ts` (`contact`). O formulário de `/contato` valida os campos no navegador e monta uma mensagem estruturada que abre o WhatsApp da LuHao já preenchido — não há backend nesta fase. O código está preparado para, futuramente, enviar os dados também para uma API/CRM.

## Deploy

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para as instruções de publicação no DigitalOcean App Platform.
