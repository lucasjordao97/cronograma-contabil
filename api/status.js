import { kv } from '@vercel/kv';

const DEFAULT = [
  {name:"Folha de Pagamento",resp:"Gente e Gestão",prazo:"03/08",status:"pendente",obs:""},
  {name:"Rateios Operações",resp:"DISMAT",prazo:"04/08",status:"pendente",obs:""},
  {name:"Envio da mobilização/desmobilização",resp:"Gente e Gestão",prazo:"04/08",status:"pendente",obs:""},
  {name:"Fechamento – Faturamento",resp:"Controladoria – Faturamento",prazo:"04/08",status:"pendente",obs:""},
  {name:"Fechamento - Notas fiscais de entrada",resp:"Controladoria – Fiscal",prazo:"04/08",status:"pendente",obs:""},
  {name:"Reclassificação - área de apoio estratégico",resp:"Gestores das áreas de apoio estratégico",prazo:"06/08",status:"pendente",obs:""},
  {name:"Reclassificação - centro de custo e obra",resp:"Gestores das filiais e coligadas",prazo:"06/08",status:"pendente",obs:""},
  {name:"Fechamento – Financeiro",resp:"Financeiro – CAP e Tesouraria",prazo:"07/08",status:"pendente",obs:""},
  {name:"Fechamento – Contas a receber",resp:"Financeiro - CAR",prazo:"07/08",status:"pendente",obs:""},
  {name:"Contabilidade – Finalização dos lançamentos de custo",resp:"Controladoria - Contabilidade",prazo:"07/08",status:"pendente",obs:""},
  {name:"Rateio das despesas administrativas",resp:"Controladoria - Contabilidade",prazo:"07/08",status:"pendente",obs:""},
  {name:"Reunião de análise de resultado com gestores das UNs",resp:"Planejamento e Orçamento",prazo:"10-11/08",status:"pendente",obs:""},
  {name:"Ajustes finais e reclassificações",resp:"Gente e Gestão / Gestores estratégico / Filiais",prazo:"12/08",status:"pendente",obs:""},
  {name:"Apuração dos impostos e consolidação – Controladas",resp:"Controladoria - Contabilidade",prazo:"13/08",status:"pendente",obs:""},
  {name:"Apuração impostos, consolidação e envio do fechamento final",resp:"Controladoria – Contabilidade",prazo:"17/08",status:"pendente",obs:""},
  {name:"Divulgação do CAPEX - Consolidado",resp:"Controladoria - Contabilidade",prazo:"18/08",status:"pendente",obs:""},
  {name:"Divulgação do resultado - Consolidado",resp:"Planejamento e Orçamento",prazo:"18/08",status:"pendente",obs:""},
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const data = await kv.get('fechamento_ago_2026');
    return res.json(data || DEFAULT);
  }

  if (req.method === 'POST') {
    const { index, field, value } = req.body;
    let data = await kv.get('fechamento_ago_2026') || JSON.parse(JSON.stringify(DEFAULT));
    if (index >= 0 && index < data.length && field) {
      data[index][field] = value;
    }
    await kv.set('fechamento_ago_2026', data);
    return res.json({ ok: true, data });
  }

  res.status(405).end();
}
