# Estrutura do Projeto

```
Portifolio-main/
├── index.html          ← página principal
├── style.css           ← CSS (cores, layout, animações)
├── script.js           ← JS (navbar, animações, partículas, formulário)
├── i18n.js             ← dicionário de traduções PT/EN
├── img/                ← imagens usadas no portfólio (WebP otimizado)
└── trainer/            ← build do Trainer Card (React/Vite, estático)
    ├── index.html
    ├── assets/
    ├── avatar.png
    └── projetos/
```

---

## Personalizar cores

Abra `style.css` e edite as variáveis no topo:

```css
:root {
  --purple:     #b44eff;   /* roxo principal */
  --cyan:       #00f5ff;   /* ciano neon */
  --pink:       #ff2d78;   /* rosa neon */
  --bg:         #080810;   /* fundo */
}
```

---

## Adicionar um novo projeto

Cole este bloco dentro de `.projects-grid` no `index.html`:

```html
<div class="project-card fade-up">
  <span class="project-num">06</span>
  <div class="project-thumb">
    <img class="project-img" src="img/meu-projeto.png" alt="Nome do Projeto" width="1280" height="720" loading="lazy" />
  </div>
  <div class="project-body">
    <div class="project-tags">
      <span class="tag">React</span>
      <span class="tag">Node.js</span>
    </div>
    <div class="project-title">Nome do Projeto</div>
    <p class="project-desc">Descreva o projeto em 1-2 linhas.</p>
    <div class="project-links">
      <a href="LINK-DEMO" class="project-link primary">Demo ao vivo</a>
      <a href="LINK-GITHUB" class="project-link">GitHub</a>
    </div>
  </div>
</div>
```

---

## Atualizar o Trainer Card

O `trainer/` é um build estático gerado pelo projeto **portifolio Treiner-card**. Para atualizar:

```bash
# 1. No projeto Treiner-card:
npm run build

# 2. Copiar o build para cá:
# (apagar trainer/ antigo e colar o dist/ renomeado como trainer/)
```
