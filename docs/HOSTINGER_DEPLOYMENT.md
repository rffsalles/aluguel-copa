# 🚀 Guia de Publicação no Hostinger — Aluguel Copacabana (Edifício Kenya)

Este guia fornece instruções detalhadas para publicar o projeto **Aluguel Copacabana** na **Hostinger** utilizando o servidor Node.js (`server.js`).

---

## 📋 Pré-requisitos
- Conta na **Hostinger** com plano que suporte **Node.js** (Hospedagem de Sites Business, Cloud Hosting ou VPS).
- Acesso ao **hPanel** da Hostinger ou acesso SSH (caso seja VPS).
- Domínio ou subdomínio apontado para a Hostinger.

---

## 🛠️ Método 1: Hospedagem via hPanel (Node.js Application Manager / Phusion Passenger)

Se você utiliza um plano compartilhado/cloud com **hPanel**:

### Passo 1: Enviar os arquivos para o servidor
1. Acesse o **hPanel** > **Gerenciador de Arquivos** (File Manager) ou conecte via **FTP/SFTP**.
2. Faça o upload de todos os arquivos do repositório para o diretório raiz da sua aplicação (ex: `public_html` ou uma subpasta dedicada como `aluguel-copacabana`).
   > **Nota:** Não é necessário enviar a pasta `node_modules`. Ela será gerada no servidor.

### Passo 2: Configurar o Aplicativo Node.js no hPanel
1. No menu do **hPanel**, procure por **Setup Node.js App** (Configurar aplicativo Node.js).
2. Clique em **Create Application** (Criar Aplicativo).
3. Preencha os campos conforme abaixo:
   - **Node.js Version:** Escolha `18.x` ou `20.x` (LTS recomendada).
   - **Application Mode:** `Production`.
   - **Application Root:** O caminho da sua pasta (ex: `public_html`).
   - **Application URL:** Selecione o seu domínio (ex: `https://seu-dominio.com`).
   - **Application Startup File:** `server.js`.
4. Clique em **Create** (Criar).

### Passo 3: Instalar as Dependências e Iniciar
1. Na página da aplicação recém-criada no hPanel, clique no botão **Run NPM Install** (ou execute no terminal via SSH dentro da pasta do projeto):
   ```bash
   npm install --only=production
   ```
2. Clique em **Restart Application** no hPanel para iniciar o `server.js`.
3. Teste o acesso ao site navegando até o seu domínio e verifique o endpoint de saúde em `https://seu-dominio.com/api/health`.

---

## 🖥️ Método 2: Hospedagem via Hostinger VPS (PM2 + Nginx)

Se você utiliza uma **VPS Hostinger** com acesso root SSH:

### Passo 1: Clonar o repositório e instalar dependências
```bash
# Acessar a VPS via SSH
ssh root@ip-da-sua-vps

# Clonar ou enviar o projeto
cd /var/www/
git clone <url-do-repositorio> aluguel-copa
cd aluguel-copa

# Instalar dependências
npm install --only=production
```

### Passo 2: Iniciar com PM2 (Process Manager)
```bash
# Instalar PM2 globalmente se ainda não tiver
npm install -g pm2

# Iniciar o servidor Node.js
pm2 start server.js --name "aluguel-copacabana"

# Salvar processo para reiniciar automaticamente em boot da máquina
pm2 save
pm2 startup
```

### Passo 3: Configurar Nginx como Reverse Proxy
No arquivo de configuração do Nginx (`/etc/nginx/sites-available/aluguel-copacabana`):
```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Ative o site e reinicie o Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/aluguel-copacabana /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## 🔍 Verificação de Funcionamento

Após publicar, verifique os seguintes pontos:
- **Landing Page Interativa:** `https://seu-dominio.com/`
- **Endpoint de Health Check:** `https://seu-dominio.com/api/health` (deve retornar `{"status":"ok", "app":"aluguel-copacabana"}`)
- **Visualização de PDFs e Banners:** `https://seu-dominio.com/banner-copacabana.pdf` e `https://seu-dominio.com/banner-copacabana.png`
