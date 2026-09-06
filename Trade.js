const crypto = require('crypto');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { symbol, amount } = req.body;

    const apiKey = process.env.MB_API_KEY;
    const apiSecret = process.env.MB_API_SECRET;
    
    if (!apiKey || !apiSecret) {
        return res.status(500).json({ error: 'Chaves de API não configuradas nas Variáveis de Ambiente da Vercel.' });
    }

    const tsi = Math.floor(Date.now() / 1000).toString();
    const endpoint = `/api/v4/order`;
    const method = 'POST';
    
    // Conforme a documentação oficial da MB v4, ajustando parâmetros de envio
    const bodyData = JSON.stringify({
        symbol: symbol,
        type: 'market',
        side: 'buy',
        quantity: amount
    });

    const signaturePayload = `${method}\n${endpoint}\n${tsi}\n${bodyData}`;
    const signature = crypto
        .createHmac('sha256', apiSecret)
        .update(signaturePayload)
        .digest('hex');

    try {
        const mbResponse = await fetch(`https://api.mercadobitcoin.net${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'TSI': tsi,
                'API-KEY': apiKey,
                'SIGNATURE': signature
            },
            body: bodyData
        });

        const result = await mbResponse.json();
        
        if (!mbResponse.ok) {
            // Devolve o erro detalhado que a MB retornou para aparecer no app do iPhone
            return res.status(400).json({ success: false, error: result });
        }

        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
