import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.kv2_KV_REST_API_URL,
  token: process.env.kv2_KV_REST_API_TOKEN,
});

const DEFAULTS = {
  priner_servicos: [
    {name:"Painel Intercompany",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Eliminações Intercompany (Template)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Memória de Calculo Intercompany (Emissão/Entrada)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Provisionamentos BM's",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Relatórios Faturamento vs Contabil",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cubo - Faturamento",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Lançamento Conta Transitória (Cancelamentos Pendentes)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Reversão Conta Transitória (Cancelamentos Efetivados)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cancelamentos e Devoluções",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Comunicado Cancelamentos",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Relatório de MIEL (mensal contabilidade)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Divulgação da Receita Bruta",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  ],
  priner_locacao: [
    {name:"Emissão de NFS-e (Rental vs Semep)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Provisionamentos BM's",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Relatórios Faturamento vs Contabil",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cubo - Faturamento",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cancelamentos e Devoluções",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  ],
  smartcoat: [
    {name:"Lançamento Conta Transitória (Cancelamentos Pendentes)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Reversão Conta Transitória (Cancelamentos Efetivados)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Provisionamentos BM's",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Relatórios Faturamento vs Contabil",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cubo - Faturamento",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cancelamentos e Devoluções",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  ],
  gmaia: [
    {name:"Emissão de NFS-e (Gmaia vs Semep)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Relatórios Faturamento vs Contabil",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Provisionamentos BM's",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cubo - Faturamento",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cancelamentos e Devoluções",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  ],
  welding: [
    {name:"Receita Diferida (repassamos, apropriação feita pela contabilidade)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Provisionamentos - BM's (PLA provisão e estorno)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Relatórios Faturamento vs Contabil",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cubo - Faturamento",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cancelamentos e Devoluções",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  ],
  real_estruturas: [
    {name:"Provisionamentos - BM's",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Relatórios Faturamento vs Contabil",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cubo - Faturamento",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Cancelamento e Devoluções",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  ],
  semep: [
    {name:"Provisionamentos - BM's",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Faturamento vs Contabil",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
    {name:"Template (Planejamento)",resp:"",prazo:"",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  ],
};

const VALID = Object.keys(DEFAULTS);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action || (req.body && req.body.action);

  // ── Receita Bruta ──────────────────────────────────────────────────────────
  if (action === 'receita') {
    if (req.method === 'GET') {
      const data = await redis.get('receita_bruta_out2026') || {};
      return res.json(data);
    }
    if (req.method === 'POST') {
      const { coligada, value } = req.body;
      if (!VALID.includes(coligada)) return res.status(400).json({ error: 'coligada inválida' });
      let data = await redis.get('receita_bruta_out2026') || {};
      data[coligada] = value;
      await redis.set('receita_bruta_out2026', data);
      return res.json({ ok: true });
    }
  }

  // ── Status das tarefas ─────────────────────────────────────────────────────
  const coligada = req.query.coligada || (req.body && req.body.coligada);
  if (!coligada || !VALID.includes(coligada)) {
    return res.status(400).json({ error: 'coligada inválida' });
  }

  const key = `fechamento_fat_${coligada}_out2026`;

  if (req.method === 'GET') {
    const data = await redis.get(key);
    return res.json(data || DEFAULTS[coligada]);
  }

  if (req.method === 'POST') {
    const { index, fields } = req.body;
    let data = await redis.get(key) || JSON.parse(JSON.stringify(DEFAULTS[coligada]));
    if (index >= 0 && index < data.length && fields) {
      Object.assign(data[index], fields);
    }
    await redis.set(key, data);
    return res.json({ ok: true, data });
  }

  res.status(405).end();
}
