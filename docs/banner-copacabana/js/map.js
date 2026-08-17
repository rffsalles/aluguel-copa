document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas centrais: Edifício Kenya - Av. N. Sra. de Copacabana, 1181
    const kenyaCoords = [-22.9812832, -43.1909276];

    // Inicialização do Mapa Leaflet
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const map = L.map('map', {
        center: kenyaCoords,
        zoom: 17,
        scrollWheelZoom: false
    });

    // Layer OpenStreetMap com tiles de alta resolução
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Ícone Customizado do Apartamento (Edifício Kenya)
    const mainIcon = L.divIcon({
        className: 'custom-pin custom-pin-main',
        html: '🏢',
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -42]
    });

    // Ícone Genérico dos Pontos Comerciais
    const createPoiIcon = (emoji, isHighlight = false) => L.divIcon({
        className: `custom-pin ${isHighlight ? 'custom-pin-highlight' : ''}`,
        html: emoji,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -34]
    });

    // Marcador Principal: Edifício Kenya
    const mainMarker = L.marker(kenyaCoords, { icon: mainIcon }).addTo(map);
    mainMarker.bindPopup(`
        <div style="font-family: sans-serif; text-align: center; padding: 4px;">
            <strong style="color: #0B192C; font-size: 1.05rem;">Edifício Kenya 🏢</strong><br>
            <span style="color: #D4AF37; font-weight: 700;">Seu Apartamento em Copacabana</span><br>
            <small style="color: #64748B;">Av. N. Sra. de Copacabana, 1181</small>
        </div>
    `).openPopup();

    // Lista Completa de Pontos Comercial & Turísticos
    const pois = [
        {
            name: "Supermercado Zona Sul",
            desc: "🛒 Diretamente em frente ao edifício",
            coords: [-22.9810, -43.1907],
            icon: "🛒",
            highlight: true
        },
        {
            name: "McDonald's",
            desc: "🍔 Na esquina ao lado (50m / 1 min a pé)",
            coords: [-22.9814, -43.1904],
            icon: "🍔",
            highlight: true
        },
        {
            name: "Academias (Smart Fit / Bodytech)",
            desc: "🏋️ A pouquíssimos passos na mesma quadra",
            coords: [-22.9806, -43.1915],
            icon: "🏋️",
            highlight: true
        },
        {
            name: "Farmácias (Droga Raia & Pacheco)",
            desc: "💊 Na mesma quadra (a poucos passos)",
            coords: [-22.9816, -43.1912],
            icon: "💊",
            highlight: true
        },
        {
            name: "Restaurantes & Bares (Belmonte, Carretão)",
            desc: "🍽️ Gastronomia variada na mesma rua",
            coords: [-22.9808, -43.1900],
            icon: "🍽️"
        },
        {
            name: "Praia de Copacabana (Posto 6)",
            desc: "🏖️ Apenas 2 quadras (3 min a pé / 250m)",
            coords: [-22.9825, -43.1888],
            icon: "🏖️",
            highlight: true
        },
        {
            name: "Estação Metrô General Osório",
            desc: "🚇 6 min a pé (450m)",
            coords: [-22.9845, -43.1960],
            icon: "🚇"
        },
        {
            name: "Forte de Copacabana & Confeitaria Colombo",
            desc: "🏛️ 8 min a pé (600m)",
            coords: [-22.9860, -43.1870],
            icon: "🏛️"
        },
        {
            name: "Feira Hippie de Ipanema (Praça Gen. Osório)",
            desc: "🎨 6 min a pé (450m)",
            coords: [-22.9848, -43.1972],
            icon: "🎨"
        },
        {
            name: "Pedra do Arpoador (Pôr do Sol)",
            desc: "🌅 12 min a pé (900m)",
            coords: [-22.9885, -43.1915],
            icon: "🌅"
        },
        {
            name: "Praia de Ipanema (Posto 8)",
            desc: "🌊 15 min a pé (1,1 km)",
            coords: [-22.9865, -43.1975],
            icon: "🌊"
        }
    ];

    // Adicionar marcadores no mapa
    pois.forEach(poi => {
        L.marker(poi.coords, { icon: createPoiIcon(poi.icon, poi.highlight) })
            .addTo(map)
            .bindPopup(`
                <div style="font-family: sans-serif;">
                    <strong style="color: #0B192C;">${poi.name}</strong><br>
                    <span style="color: #64748B; font-size: 0.85rem;">${poi.desc}</span>
                </div>
            `);
    });
});
