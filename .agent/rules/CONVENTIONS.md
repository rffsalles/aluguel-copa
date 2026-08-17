# Convenções de Código e Design — Aluguel Copacabana

## Componentes Visuais & Estilos
- Estilos encapsulados em Vanilla CSS (`css/style.css` e `css/banner.css`).
- Tipografia: Google Fonts (*Outfit* para títulos e *Plus Jakarta Sans* para texto de corpo).
- Layout responsivo: Mobile-first com suporte a telas grandes de desktop e celulares de todas as resoluções.
- Mapa Interativo: Leaflet.js com tiles OpenStreetMap e pins estilizados por emoji/ícones.

## Convenções de Exportação
- Resolução do Banner PNG: Renderizado em `deviceScaleFactor: 2` (Retina HD / 1200px+).
- Formato PDF: A4/Custom sem margens com plano de fundo ativado (`printBackground: true`).
