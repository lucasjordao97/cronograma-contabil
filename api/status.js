import { kv } from '@vercel/kv';

const DEFAULT = [
  {name:"Folha de Pagamento",resp:"Gente e Gestão",prazo:"03/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Rateios Operações",resp:"DISMAT",prazo:"04/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Envio da mobilização/desmobilização",resp:"Gente e Gestão",prazo:"04/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Fechamento – Faturamento",resp:"Controladoria – Faturamento",prazo:"04/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Fechamento - Notas fiscais de entrada",resp:"Controladoria – Fiscal",prazo:"04/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Reclassificação - área de apoio estratégico",resp:"Gestores das áreas de apoio estratégico",prazo:"06/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Reclassificação - centro de custo e obra",resp:"Gestores das filiais e coligadas",prazo:"06/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Fechamento – Financeiro",resp:"Financeiro – CAP e Tesouraria",prazo:"08/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Fechamento – Contas a receber",resp:"Financeiro - CAR",prazo:"08/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Contabilidade – Finalização dos lançamentos de custo",resp:"Controladoria - Contabilidade",prazo:"08/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Rateio das despesas administrativas",resp:"Controladoria - Contabilidade",prazo:"08/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Reunião de análise de resultado com gestores das UNs",resp:"Planejamento e Orçamento",prazo:"10-11/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Ajustes finais e reclassificações",resp:"Gente e Gestão / Gestores estratégico / Filiais",prazo:"12/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Apuração dos impostos e consolidação – Controladas",resp:"Controladoria - Contabilidade",prazo:"13/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Apuração impostos, consolidação e envio do fechamento final",resp:"Controladoria – Contabilidade",prazo:"17/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Divulgação do CAPEX - Consolidado",resp:"Controladoria - Contabilidade",prazo:"18/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
  {name:"Divulgação do resultado - Consolidado",resp:"Planejamento e Orçamento",prazo:"18/09",status:"pendente",obs:"",entregue_por:"",entregue_em:""},
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const data = await kv.get('fechamento_set_2026');
    return res.json(data || DEFAULT);
  }

  if (req.method === 'POST') {
    const { index, fields } = req.body;
    let data = await kv.get('fechamento_set_2026') || JSON.parse(JSON.stringify(DEFAULT));
    if (index >= 0 && index < data.length && fields) {
      Object.assign(data[index], fields);
    }
    await kv.set('fechamento_set_2026', data);
    return res.json({ ok: true, data });
  }

  res.status(405).end();
}
