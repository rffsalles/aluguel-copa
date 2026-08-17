const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureMapSnapshot() {
    console.log('🗺️ Capturando snapshot do Mapa em alta definição...');
    const mapPngPath = path.join(__dirname, 'img', 'map-snapshot.png');

    try {
        const browser = await chromium.launch();
        const page = await browser.newPage({
            viewport: { width: 1200, height: 900 },
            deviceScaleFactor: 2
        });

        const indexPath = path.join(__dirname, 'index.html');
        const fileUrl = `file:///${indexPath.replace(/\\/g, '/')}`;

        await page.goto(fileUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2500); // Aguarda carregamento total dos tiles do mapa e pins

        const mapElement = await page.$('#map');

        if (mapElement) {
            await mapElement.screenshot({ path: mapPngPath });
            console.log(`✅ Snapshot do mapa salvo com sucesso em: ${mapPngPath}`);
        } else {
            console.error('❌ Elemento #map não foi encontrado!');
        }

        await browser.close();
    } catch (err) {
        if (fs.existsSync(mapPngPath)) {
            console.warn('⚠️ Playwright não está disponível neste ambiente de build. Mantendo o snapshot do mapa pré-gerado em:', mapPngPath);
        } else {
            console.error('❌ Erro na captura do mapa:', err);
            process.exit(1);
        }
    }
}

captureMapSnapshot();
