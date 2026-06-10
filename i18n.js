// ============================================================
//  i18n — traduções PT/EN
//
//  Como funciona:
//  1. Cada elemento traduzível no HTML tem um atributo
//     data-i18n="chave" (ex: data-i18n="nav.sobre").
//  2. O dicionário abaixo mapeia cada chave para o texto em
//     cada idioma.
//  3. apply() percorre todos os [data-i18n] e injeta o texto
//     do idioma ativo.
//  4. A escolha fica salva no localStorage, então o visitante
//     que escolheu EN continua em EN na próxima visita.
// ============================================================

const I18N = {
  lang: 'pt',

  dict: {
    pt: {
      'nav.sobre': 'sobre',
      'nav.projetos': 'projetos',
      'nav.contato': 'contato',
      'nav.cv': 'curriculo',

      'hero.tag': 'STATUS: DISPONÍVEL PARA OPORTUNIDADES',
      'hero.desc': 'Desenvolvedor web em formação, construindo interfaces e automações que funcionam de verdade. Dois anos de experiência em ambiente corporativo de alto volume. Sempre aprendendo.',
      'hero.ctaProjects': 'Ver projetos',
      'hero.ctaContact': 'Entre em contato',
      'hero.statYears': 'anos exp.',
      'hero.statProjects': 'projetos',

      'sobre.label': 'sobre mim',
      'sobre.h2': 'Dev.<br/><span>Solucionador.</span><br/>Curioso.',
      'sobre.p1': 'Tenho 21 anos, moro em Valparaíso de Goiás e estou cursando Análise e Desenvolvimento de Sistemas. Trabalhei quase dois anos na Amazon, onde aprendi a resolver problemas rápido e operar sob pressão real.',
      'sobre.p2': 'Hoje canalizo essa bagagem para o desenvolvimento web — construindo interfaces, automatizando processos e aprendendo uma tecnologia nova a cada projeto.',

      'skills.main': '// stack principal',
      'skills.exploring': '// explorando',
      'skills.tools': '// ferramentas &amp; idiomas',
      'skills.courses': '// cursos',
      'skills.office': 'Pacote Office',
      'skills.portuguese': 'Português (nativo)',
      'skills.english': 'Inglês (intermediário)',
      'curso.inprogress': '● em andamento',
      'curso.done': '✓ concluído',

      'proj.label': 'projetos',
      'proj.h2': 'O que eu construí',
      'trainer.title': 'Ver meu Trainer Card',
      'trainer.desc': 'Meu portfólio em formato de jogo de RPG — navegue pelo meu perfil, skills, projetos e experiência como se fosse um Trainer do Pokémon.',
      'trainer.open': 'Abrir Trainer Card',
      'featured.badge': '★ DESTAQUE',
      'featured.label': '// projeto principal',

      'proj0.desc': 'E-commerce full-stack com arquitetura cliente-servidor desacoplada. Implementa autenticação JWT, fluxo de aprovação de vendedores e rate-limiting no Express. Estado do carrinho persistido por usuário no Supabase + design system completo com tokens CSS e modo escuro.',
      'proj1.desc': 'Quiz SPA com gerenciamento de estado via React Hooks, lógica de pontuação progressiva e fluxo condicional entre telas. Build otimizado com Vite e deploy estático no GitHub Pages.',
      'proj2.desc': 'Consumo da PokeAPI com Fetch nativo, paginação on-demand e renderização de listas longas com foco em performance. Exercício prático de manipulação assíncrona de dados em JavaScript puro.',
      'proj3.desc': 'Catálogo de filmes/séries consumindo a API do TMDB. Implementa carrosséis por categoria, busca em tempo real e persistência de favoritos no Supabase com autenticação de usuário.',
      'proj4.desc': 'Aplicação desktop em Python integrando Tesseract OCR com API de tradução. Captura por seleção de área, hotkeys globais e interface moderna com customtkinter — funciona sobre jogos, PDFs e vídeos.',
      'proj5.desc': 'Tracker de animes integrando APIs públicas via Axios. Gerencia múltiplos status (assistindo / favoritos / concluído) com persistência local, grade semanal e filtros por temporada.',

      'contato.label': 'contato',
      'contato.h2': 'Vamos<br/><span>trabalhar juntos?</span>',
      'contato.sub': 'Aberto a estágio, freela e projetos colaborativos.',
      'form.name': 'nome',
      'form.email': 'e-mail',
      'form.msg': 'mensagem',
      'form.send': 'Enviar mensagem',
      'form.sending': '> enviando...',
      'form.ok': '> mensagem enviada. respondo em breve!',
      'form.err': '> falha no envio. use o e-mail ou whatsapp abaixo.',

      'footer.madeby': '// feito por',
    },

    en: {
      'nav.sobre': 'about',
      'nav.projetos': 'projects',
      'nav.contato': 'contact',
      'nav.cv': 'resume',

      'hero.tag': 'STATUS: OPEN TO OPPORTUNITIES',
      'hero.desc': 'Web developer in training, building interfaces and automations that actually work. Two years of experience in a high-volume corporate environment. Always learning.',
      'hero.ctaProjects': 'View projects',
      'hero.ctaContact': 'Get in touch',
      'hero.statYears': 'yrs exp.',
      'hero.statProjects': 'projects',

      'sobre.label': 'about me',
      'sobre.h2': 'Dev.<br/><span>Problem-solver.</span><br/>Curious.',
      'sobre.p1': "I'm 21, based in Valparaíso de Goiás (Brazil) and studying Systems Analysis and Development. I worked nearly two years at Amazon, where I learned to solve problems fast and operate under real pressure.",
      'sobre.p2': 'Today I channel that experience into web development — building interfaces, automating processes and learning a new technology with every project.',

      'skills.main': '// main stack',
      'skills.exploring': '// exploring',
      'skills.tools': '// tools &amp; languages',
      'skills.courses': '// courses',
      'skills.office': 'MS Office',
      'skills.portuguese': 'Portuguese (native)',
      'skills.english': 'English (intermediate)',
      'curso.inprogress': '● in progress',
      'curso.done': '✓ completed',

      'proj.label': 'projects',
      'proj.h2': "What I've built",
      'trainer.title': 'See my Trainer Card',
      'trainer.desc': 'My portfolio as an RPG game — browse my profile, skills, projects and experience like a Pokémon Trainer.',
      'trainer.open': 'Open Trainer Card',
      'featured.badge': '★ FEATURED',
      'featured.label': '// main project',

      'proj0.desc': 'Full-stack e-commerce with a decoupled client-server architecture. Implements JWT authentication, a seller-approval flow and rate limiting in Express. Per-user cart state persisted in Supabase + a complete design system with CSS tokens and dark mode.',
      'proj1.desc': 'SPA quiz with state management via React Hooks, progressive scoring logic and conditional screen flow. Optimized build with Vite and static deploy on GitHub Pages.',
      'proj2.desc': 'PokeAPI consumption with native Fetch, on-demand pagination and long-list rendering focused on performance. A hands-on exercise in asynchronous data handling with vanilla JavaScript.',
      'proj3.desc': 'Movie/TV catalog consuming the TMDB API. Implements category carousels, real-time search and favorites persisted in Supabase with user authentication.',
      'proj4.desc': 'Python desktop app integrating Tesseract OCR with a translation API. Area-selection capture, global hotkeys and a modern customtkinter UI — works over games, PDFs and videos.',
      'proj5.desc': 'Anime tracker integrating public APIs via Axios. Manages multiple statuses (watching / favorites / completed) with local persistence, weekly grid and season filters.',

      'contato.label': 'contact',
      'contato.h2': "Let's<br/><span>work together?</span>",
      'contato.sub': 'Open to internships, freelance and collaborative projects.',
      'form.name': 'name',
      'form.email': 'email',
      'form.msg': 'message',
      'form.send': 'Send message',
      'form.sending': '> sending...',
      'form.ok': "> message sent. I'll get back to you soon!",
      'form.err': '> sending failed. use the email or whatsapp below.',

      'footer.madeby': '// made by',
    },
  },

  // busca o texto da chave no idioma ativo (com fallback para PT)
  t(key) {
    return this.dict[this.lang][key] || this.dict.pt[key] || '';
  },

  // aplica o idioma ativo em todos os elementos marcados
  apply() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = this.t(el.dataset.i18n);
      if (text) el.innerHTML = text;
    });
    document.documentElement.lang = this.lang === 'pt' ? 'pt-BR' : 'en';
  },

  set(lang) {
    this.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) { /* modo privado */ }
    this.apply();
    updateLangToggle();
    // avisa o resto do site (script.js usa para reagir à troca, se precisar)
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  },
};

// destaca no botão qual idioma está ativo
const langToggle = document.getElementById('langToggle');

function updateLangToggle() {
  if (!langToggle) return;
  langToggle.innerHTML = I18N.lang === 'pt'
    ? '<span class="lang-on">PT</span>/EN'
    : 'PT/<span class="lang-on">EN</span>';
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    I18N.set(I18N.lang === 'pt' ? 'en' : 'pt');
  });
}

// restaura o idioma salvo da última visita
try {
  if (localStorage.getItem('lang') === 'en') I18N.set('en');
} catch (e) { /* modo privado */ }
