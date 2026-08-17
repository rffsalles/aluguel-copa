const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Diretorios estaticos da aplicacao
const staticPath = path.join(__dirname, 'docs', 'banner-copacabana');

// Servir arquivos estaticos (HTML, CSS, JS, imagens, PDF, PNG)
app.use(express.static(staticPath));

// Endpoint de Health Check para monitoramento e Hostinger
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        app: 'aluguel-copacabana',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
    });
});

// Rota de fallback para SPA ou navegacao direta
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Inicializacao do servidor
app.listen(PORT, HOST, () => {
    console.log(`==================================================`);
    console.log(`🏖️  Aluguel Copacabana (Edificio Kenya)`);
    console.log(`🚀 Servidor Node.js rodando em http://${HOST}:${PORT}`);
    console.log(`📂 Pasta estatica: ${staticPath}`);
    console.log(`==================================================`);
});
