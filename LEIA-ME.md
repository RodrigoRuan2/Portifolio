# 📁 Estrutura do Projeto

```
portfolio-cyberpunk/
├── index.html      ← HTML da página
├── style.css       ← Todo o CSS (cores, layout, animações)
├── script.js       ← JavaScript (scroll, animações)
├── LEIA-ME.md      ← Este arquivo
└── img/            ← Pasta para suas imagens (crie esta pasta!)
    ├── foto-perfil.jpg
    ├── projeto1.jpg
    ├── projeto2.jpg
    └── projeto3.jpg
```

---

## 🖼️ Como adicionar sua FOTO DE PERFIL

1. Crie a pasta `img/` na mesma pasta do `index.html`
2. Coloque sua foto lá: `img/foto-perfil.jpg`
3. No `index.html`, encontre este bloco e **apague** ele:

```html
<!-- REMOVA ESTE BLOCO quando adicionar sua foto -->
<div class="avatar-placeholder">
  <div class="avatar-icon">👤</div>
  <span class="avatar-hint">// coloque sua foto<br/>em img/foto-perfil.jpg</span>
</div>
```

4. No lugar, cole isto:

```html
<img class="avatar-foto" src="img/foto-perfil.jpg" alt="Seu Nome" />
```

✅ Pronto! O CSS já cuida do recorte, tamanho e efeitos automaticamente.

---

## 🖼️ Como adicionar IMAGEM em um projeto

1. Coloque o print do projeto em `img/projeto1.jpg`
2. No `index.html`, dentro do projeto desejado, encontre a linha com o emoji:

```html
<span class="project-thumb-emoji">🌐</span>
```

3. Apague essa linha e cole no lugar:

```html
<img class="project-img" src="img/projeto1.jpg" alt="Nome do projeto" />
```

✅ A imagem vai preencher o card automaticamente com zoom suave ao passar o mouse.

---

## ➕ Como adicionar um NOVO projeto

Copie este bloco inteiro e cole dentro de `.projects-grid` no `index.html`:

```html
<div class="project-card fade-up">
  <span class="project-num">04</span>
  <div class="project-thumb">
    <img class="project-img" src="img/projeto4.jpg" alt="Nome do Projeto 4" />
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

## 🎨 Como mudar as cores

Abra o `style.css` e edite as variáveis no topo:

```css
:root {
  --purple: #b44eff;   /* roxo principal */
  --cyan:   #00f5ff;   /* ciano neon */
  --pink:   #ff2d78;   /* rosa neon */
  --bg:     #080810;   /* cor de fundo */
}
```
