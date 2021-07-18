import { SiteClient, siteClient } from 'datocms-client';

export default async function recebeRequest (request, response) {
    
    if(request.method === 'POST') {
        const TOKEN = '7e7266756dfbf372059943a8ef2736';
        const client = new SiteClient(TOKEN);
    
        const regristoCriado = await client.items.create({
            itemType: "974546",
            ...request.body,
        })
    
        response.json({
            dados: 'Algum dado',
            regristoCriado: regristoCriado,
        })
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}