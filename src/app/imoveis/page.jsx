import { excluir, salvar } from '@actions/imoveis';
import Crud from '@components/Crud';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Modelo', dataIndex: 'modelo' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
];

export default async function Imoveis() {
    const [imoveis, clientes] = await Promise.all([
        prisma.imoveis.findMany({ orderBy: { endereco: 'asc' }, include: { clientes: true } }),
        prisma.clientes.findMany({ orderBy: { nome: 'asc' } }),
    ]);

    const registros = imoveis.map(({ cliente, ...imoveis }) => ({ ...imoveis, clientes_nome: clientes.nome }));

    const campos = [
        { name: 'modelo', label: 'Modelo' },
        { name: 'cliente_id', label: 'Clientes', opcoes: clientes.map((c) => ({ value: c.id, label: c.nome })) },
    ];

    return <Crud titulo="Imoveis" {...{ colunas, campos, registros, salvar, excluir }} />;
}