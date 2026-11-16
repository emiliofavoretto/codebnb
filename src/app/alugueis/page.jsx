import { excluir, salvar } from '@actions/alugueis';
import Crud from '@components/Crud';
import { descriptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Data', dataIndex: 'data' },
    { title: 'Imóvel', dataIndex: 'imovel_nome' },
    { title: 'Endereço', dataIndex: 'imovel_endereco' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
    { title: 'CPF', dataIndex: 'cliente_cpf' },
];

export default async function Alugueis() {
    const [alugueis, imoveis] = await Promise.all([
        prisma.alugueis.findMany({
            orderBy: { data: 'asc' },
            include: { imoveis: { include: { clientes: true } } },
        }),
        prisma.imoveis.findMany({ 
            orderBy: { nome: 'asc' }, 
            include: { clientes: true } 
        }),
    ]);

    const registros = alugueis.map(({ id, data, imoveis_id, imoveis }) => ({
        id,
        imoveis_id,
        data: data.toISOString().slice(0, 10),
        imovel_nome: imoveis.nome,
        imovel_endereco: imoveis.endereco,
        cliente_nome: imoveis.clientes.nome,
        cliente_cpf: descriptografar(imoveis.clientes.cpf),
    }));

    const campos = [
        { name: 'data', label: 'Data', tipo: 'date' },
        {
            name: 'imoveis_id',
            label: 'Imóvel',
            opcoes: imoveis.map((i) => ({ 
                value: i.id, 
                label: `${i.nome} (${i.clientes.nome})` 
            })),
        },
    ];

    return <Crud titulo="Aluguéis" {...{ colunas, campos, registros, salvar, excluir }} />;
}
