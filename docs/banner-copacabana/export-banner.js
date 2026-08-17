const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generateBannerOutputs() {
    console.log('🚀 Iniciando renderização do Banner em Alta Resolução...');

    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: 1300, height: 1600 },
        deviceScaleFactor: 2 // Alta resolução Retinal HD
    });

    const htmlPath = path.join(__dirname, 'banner-digital.html');
    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

    console.log(`🌐 Carregando template: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle' });

    // Capturar elemento #poster em PNG HD
    const posterElement = await page.$('#poster');
    const pngPath = path.join(__dirname, 'banner-copacabana.png');
    
    if (posterElement) {
        await posterElement.screenshot({
            path: pngPath,
            type: 'png'
        });
        console.log(`✅ Banner PNG gerado com sucesso: ${pngPath}`);
    }

    // Exportar PDF em formato A4/Custom
    const pdfPath = path.join(__dirname, 'banner-copacabana.pdf');
    await page.pdf({
        path: pdfPath,
        printBackground: true,
        width: '1250px',
        height: '1650px',
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    console.log(`✅ Banner PDF gerado com sucesso: ${pdfPath}`);

    await browser.close();
    console.log('🎉 Renderização concluída com sucesso!');
}

generateBannerOutputs().catch(err => {
    console.error('❌ Erro na renderização do banner:', err);
    process.exit(1);
});
