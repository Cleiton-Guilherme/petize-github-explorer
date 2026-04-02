# 🔍 GitHub Explorer – Petize Challenge

> Aplicação React para busca de perfis de desenvolvedores no GitHub com scroll infinito nos repositórios.

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9+ (já vem com o Node)

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/SEU_USUARIO/petize-github-explorer.git
cd petize-github-explorer
```

**2. Instale as dependências**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

**4. Abra no navegador**

```
http://localhost:5173
```

---

## 🏗️ Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `/dist` — pronto para deploy.

---

## ☁️ Deploy

### Vercel (recomendado)

1. Suba o projeto no GitHub (público)
2. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
3. Clique em **"Add New Project"** → importe o repositório
4. Deixe todas as configurações padrão (Vite é detectado automaticamente)
5. Clique em **"Deploy"** — URL pública gerada em ~1 minuto ✅

### GitHub Pages

1. Edite o `vite.config.js`, adicionando a propriedade `base`:

```js
export default defineConfig({
  base: '/petize-github-explorer/',
  plugins: [react()],
})
```

2. Instale o plugin de deploy:

```bash
npm install --save-dev gh-pages
```

3. Adicione ao `package.json` dentro de `"scripts"`:

```json
"deploy": "gh-pages -d dist"
```

4. Faça o deploy:

```bash
npm run build
npm run deploy
```

> ⚠️ Para o React Router funcionar no GitHub Pages, crie um arquivo `public/404.html` com o mesmo conteúdo do `index.html`.

---

## 🧰 Tech Stack

| Tecnologia | Uso |
|-----------|-----|
| [React 18](https://react.dev/) | Framework principal |
| [Vite](https://vitejs.dev/) | Build tool / dev server |
| [ChakraUI v2](https://v2.chakra-ui.com/) | Biblioteca de componentes |
| [React Router v7](https://reactrouter.com/) | Roteamento SPA |
| [i18next](https://www.i18next.com/) | Internacionalização (PT/EN) |
| [Zod](https://zod.dev/) | Validação de schemas |
| IntersectionObserver API | Scroll infinito (nativo, sem lib extra) |

---

## 📁 Estrutura do projeto

```
petize-github-explorer/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                    # Entrada da aplicação
    ├── App.jsx                     # Rotas principais
    ├── theme.js                    # Tema customizado Chakra UI
    ├── components/
    │   ├── LanguageSwitcher.jsx    # Alternador PT / EN
    │   ├── RepoCard.jsx            # Card de repositório
    │   └── RepoSortControls.jsx    # Controles de ordenação
    ├── hooks/
    │   └── useInfiniteRepos.js     # Hook de scroll infinito
    ├── i18n/
    │   ├── index.js                # Configuração do i18next
    │   └── locales/
    │       ├── en.json             # Textos em inglês
    │       └── pt.json             # Textos em português
    ├── pages/
    │   ├── HomePage.jsx            # Página de busca
    │   └── ProfilePage.jsx         # Página de perfil
    ├── schemas/
    │   └── github.js               # Schemas Zod (User + Repo)
    └── services/
        └── github.js               # Chamadas à API do GitHub
```

---

## ✅ Funcionalidades implementadas

- [x] Busca de usuário por username
- [x] Mensagem de erro quando usuário não existe
- [x] Página de perfil com avatar, bio, estatísticas
- [x] Botão de site pessoal (exibido apenas se disponível no perfil)
- [x] Botão do Twitter (exibido apenas se disponível no perfil)
- [x] Listagem de repositórios com **scroll infinito** (10 por página)
- [x] Controles de ordenação: `sort`, `direction` e `type` (todas as opções da API)
- [x] Nomes dos repositórios como links para o GitHub original
- [x] Rota `/profile/:username` compartilhável como link direto
- [x] Internacionalização completa em **Português** e **Inglês**
- [x] Layout totalmente **responsivo** (mobile + desktop)
- [x] Validação de entidades com **Zod**

---

## 🌐 Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com campo de busca |
| `/profile/:username` | Perfil do usuário + repositórios |

Exemplo de link direto: `https://seudominio.com/profile/torvalds`

---

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico para vaga de Estágio React na **[Petize](https://petize.com.br)**.
