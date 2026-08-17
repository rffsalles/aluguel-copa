# 🏖️ Aluguel de Temporada em Copacabana (Edifício Kenya)

Este repositório centraliza os materiais de apresentação, a **Landing Page Web Interativa** e o **Banner Digital Infográfico em Alta Resolução (PNG / PDF)** do apartamento de temporada localizado na **Av. Nossa Senhora de Copacabana, 1181 (Edifício Kenya - Posto 6)**, Rio de Janeiro/RJ.

---

## 📌 Estrutura do Projeto

```
aluguel-copa/
├── docs/
│   ├── PRD.md                     # Documento de Requisitos e Especificações do Imóvel
│   ├── UX_UI_DESIGN_SYSTEM.md     # Design System "Copacabana Luxury" & Padrões Visuais
│   ├── imagens_kenya/             # 13 Imagens originais da rua e do imóvel
│   └── banner-copacabana/         # Projeto da Landing Page e Banner Digital
│       ├── index.html             # Landing Page Web Interativa (com mapa Leaflet e Lightbox)
│       ├── banner-digital.html    # Template HTML do Banner Infográfico HD
│       ├── banner-copacabana.png  # Banner PNG em alta definição (pronto para envio)
│       ├── banner-copacabana.pdf  # Documento PDF pronto para envio
│       ├── export-banner.js       # Script automatizado de exportação PNG/PDF (Playwright)
│       ├── generate-map-snapshot.js # Script para capturar o snapshot do mapa com pins
│       ├── css/                   # Estilos (style.css e banner.css)
│       ├── js/                    # Scripts (map.js e app.js)
│       └── img/                   # Imagens otimizadas e snapshot do mapa
├── .agent/                        # Regras e convenções do agente de IA
├── package.json                   # Dependências e scripts de build
└── README.md                      # Instruções do projeto
```

---

## 🚀 Como Executar Localmente

### 1. Abrir a Landing Page no Navegador
Para visualizar a Landing Page Web interativa (com mapa de localização e galeria de fotos):
- Dê dois cliques em `docs/banner-copacabana/index.html` ou abra no seu navegador favorito.

### 2. Exportar o Banner em PNG e PDF
Caso altere alguma informação de preço ou descrição no template HTML e deseje regerar os arquivos de imagem e PDF em alta resolução:

```bash
# Instalar dependências (Playwright)
npm install

# Gerar snapshot do mapa + exportar PNG e PDF
npm run build
```

---

## 📍 Principais Destaques da Localização
- 🛒 **Supermercado Zona Sul:** Diretamente em frente ao edifício.
- 🍔 **McDonald's:** Na esquina ao lado (1 min a pé / 50m).
- 🏋️ **Academias:** Smart Fit e Bodytech na mesma quadra.
- 💊 **Farmácias & Gastronomia:** Droga Raia, Pacheco, Belmonte e Carretão a poucos passos.
- 🏖️ **Praia de Copacabana (Posto 6):** 2 quadras (3 min a pé).
- 🚇 **Metrô Estação General Osório:** 6 min a pé (450m).
- 🏛️ **Forte de Copacabana & Confeitaria Colombo:** 8 min a pé (600m).
