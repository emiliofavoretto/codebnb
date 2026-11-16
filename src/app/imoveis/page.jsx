import { excluir, salvar } from '@actions/imoveis';
import Crud from '@components/Crud';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'Endereço', dataIndex: 'endereco' },
    { title: 'Descrição', dataIndex: 'descricao' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
];

export default async function Imoveis() {
    const [imoveis, clientes] = await Promise.all([
        prisma.imoveis.findMany({ 
            orderBy: { nome: 'asc' }, 
            include: { clientes: true } 
        }),
        prisma.clientes.findMany({ 
            orderBy: { nome: 'asc' } 
        }),
    ]);

    const registros = imoveis.map(({ clientes, ...imovel }) => ({ 
        ...imovel, 
        cliente_nome: clientes?.nome || 'Sem cliente' 
    }));

    const campos = [
        { name: 'nome', label: 'Nome do Imóvel' },
        { name: 'endereco', label: 'Endereço' },
        { name: 'descricao', label: 'Descrição' },
        { 
            name: 'clientes_id', 
            label: 'Cliente', 
            opcoes: clientes.map((c) => ({ value: c.id, label: c.nome })) 
        },
    ];

    return <Crud titulo="Imóveis" {...{ colunas, campos, registros, salvar, excluir }} />;
}
