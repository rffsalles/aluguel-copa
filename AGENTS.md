# Regras Globais do Projeto — Aluguel Copacabana

> 🔴 **MANDATORY:** Este projeto é focado em apresentações visuais de altíssimo impacto para aluguel por temporada no Rio de Janeiro.

## Regras Arquiteturais e de Design System
- **Tema:** *Copacabana Coastal Luxury* (azul marinho `#0B192C`, dourado `#D4AF37`, areia e grafite elegante).
- **Sem Placeholders:** Todas as imagens devem vir da pasta `docs/imagens_kenya/` ou da captura automatizada do mapa em `docs/banner-copacabana/img/map-snapshot.png`.
- **Precisão de Endereço & Pontos Comerciais:**
  - Endereço: Av. Nossa Senhora de Copacabana, 1181 (Edifício Kenya) – Posto 6.
  - **Supermercado Zona Sul:** Diretamente em frente ao edifício.
  - **McDonald's:** Na esquina ao lado (50m / 1 min).
  - **Academias & Farmácias:** Smart Fit, Bodytech, Droga Raia e Pacheco na mesma quadra.
- **Exportação em HD:** Todo banner gerado deve ser testado via `npm run build` (`export-banner.js` com Playwright) garantindo integridade visual dos arquivos `banner-copacabana.png` e `banner-copacabana.pdf`.
