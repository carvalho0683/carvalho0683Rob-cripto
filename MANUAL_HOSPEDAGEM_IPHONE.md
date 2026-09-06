# Manual de Hospedagem e Instalação no iPhone

## 1. Publicar
Use uma hospedagem estática com HTTPS. Envie todos os arquivos mantendo-os juntos na raiz do projeto:
- index.html
- manifest.json
- service-worker.js
- config.json

Depois da publicação, abra a URL HTTPS no Safari do iPhone.

## 2. Instalar na Tela de Início
No Safari:
1. Abra o endereço do Robô Cripto.
2. Toque em Compartilhar.
3. Escolha “Adicionar à Tela de Início”.
4. Confirme o nome “Robô Cripto”.

## 3. Uso
Abra o ícone criado na Tela de Início.
Os dados da simulação ficam no armazenamento local do navegador.

## 4. Atualizações
Para atualizar o projeto, substitua os arquivos na hospedagem. Se o navegador mantiver versão antiga, feche o web app e abra novamente; se necessário, limpe os dados do site.

## 5. Segurança
Não inserir chaves privadas, API secret ou senhas nos arquivos públicos.
