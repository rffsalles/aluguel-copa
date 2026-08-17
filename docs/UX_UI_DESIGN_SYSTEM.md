# 🎨 Copacabana Luxury — Design System & Visual Guidelines

Este documento centraliza as diretrizes de design, paleta de cores, tipografia e padrões visuais do projeto **Aluguel Copacabana**.

---

## 1. Identidade Visual (Theming)

O design system adota o conceito **"Copacabana Coastal Luxury"**, combinando tons náuticos sofisticados, dourado nobre e areia tropical.

### 1.1 Paleta de Cores (Tokens CSS)

```css
:root {
    --primary: #0B192C;            /* Azul Marinho Midnight (Fundo & Headers) */
    --primary-light: #1E3E62;      /* Azul Secundário */
    --accent-gold: #D4AF37;        /* Dourado Nobre (Destaques & CTAs) */
    --accent-sand: #F7F4EB;        /* Areia Tropical (Cards & Fundo Suave) */
    --whatsapp-green: #25D366;     /* Verde WhatsApp */
    --text-main: #1E293B;          /* Texto Escuro de Alta Legibilidade */
    --text-muted: #64748B;         /* Texto Secundário Muted */
    --bg-light: #F8FAFC;           /* Fundo da Página */
    --bg-card: #FFFFFF;            /* Fundo de Cards */
    --border-color: #E2E8F0;       /* Borda Suave */
}
```

---

## 2. Tipografia

- **Títulos e Destaques:** *Outfit* (Google Fonts) — Pesos: 700 (Bold) e 800 (ExtraBold).
- **Texto de Corpo e Tabelas:** *Plus Jakarta Sans* (Google Fonts) — Pesos: 400 (Regular), 500 (Medium) e 600 (SemiBold).

---

## 3. Padrões de Layout

- **Landing Page (`index.html`):** Hero Banner com foto de capa + especificações rápidas, seção de localização com mapa Leaflet e lista de comércios próximos (Zona Sul em frente, McDonald's ao lado, academias e farmácias na quadra), galeria Lightbox em tela cheia, tabela de preços por temporada e botão flutuante de reserva no WhatsApp.
- **Banner Digital Infográfico (`banner-digital.html`):** Diagramação em coluna dupla de 1200px para exportação em alta resolução (PNG / PDF via Playwright), integrando o snapshot visual do mapa e collage de fotos do imóvel.
