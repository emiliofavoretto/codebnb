import bcrypt from 'bcryptjs';

try {
    process.loadEnvFile();
} catch {
    console.error('   ❌ parceria ... arquivo .env não encontrado');
    process.exit(1);
}

const { criptografar } = await import('../src/lib/cripto.js');
const { prisma } = await import('../src/lib/prisma.js');

// para ter mais linhas no banco, acrescente mais objetos em cada lista/tabela
const dados = {
    usuario: [
        { nome: 'admin', senha: bcrypt.hashSync('admin123', 10) },
        { nome: 'carlos.silva', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'mariana.costa', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'joao.oliveira', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'ana.santos', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'pedro.almeida', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'julia.lima', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'lucas.pereira', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'fernanda.rocha', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'rafael.souza', senha: bcrypt.hashSync('senha123', 10) },
    ],
    clientes: [
        { nome: 'Bagui', cpf: criptografar('123.456.789-01'), celular: '(11) 91111-1111' },
        { nome: 'Carlos Eduardo Silva', cpf: criptografar('234.567.890-12'), celular: '(19) 99222-2222' },
        { nome: 'Mariana Souza Costa', cpf: criptografar('345.678.901-23'), celular: '(11) 98333-3333' },
        { nome: 'João Pedro Oliveira', cpf: criptografar('456.789.012-34'), celular: '(21) 97444-4444' },
        { nome: 'Ana Beatriz Santos', cpf: criptografar('567.890.123-45'), celular: '(31) 99555-5555' },
        { nome: 'Pedro Henrique Almeida', cpf: criptografar('678.901.234-56'), celular: '(19) 98666-6666' },
        { nome: 'Júlia Fernandes Lima', cpf: criptografar('789.012.345-67'), celular: '(41) 99777-7777' },
        { nome: 'Lucas Gabriel Pereira', cpf: criptografar('890.123.456-78'), celular: '(11) 98888-8888' },
        { nome: 'Fernanda Martins Rocha', cpf: criptografar('901.234.567-89'), celular: '(51) 99999-9999' },
        { nome: 'Rafael Augusto Souza', cpf: criptografar('012.345.678-90'), celular: '(19) 97123-4567' },
    ],
    imoveis: [
        { nome: 'Brueguenaiti', clientes_id: 1, endereco: 'Rua das Flores, 142', descricao: 'O apartamento 34 fica no terceiro andar de um edifício residencial clássico, com fachada revestida em pastilhas bege e amplas varandas.' },
        { nome: 'Refúgio da Serra', clientes_id: 2, endereco: 'Avenida das Araucárias, 850', descricao: 'Chalé aconchegante em madeira nobre com lareira, deck panorâmico voltado para as montanhas e jardim privativo.' },
        { nome: 'Loft Urbano Central', clientes_id: 3, endereco: 'Rua Barão de Jaguara, 1120', descricao: 'Loft moderno com pé-direito duplo, decoração industrial, cozinha americana equipada e acesso rápido ao transporte público.' },
        { nome: 'Casa Brisa do Mar', clientes_id: 4, endereco: 'Avenida Atlântica, 410', descricao: 'Casa espaçosa a duas quadras da praia, com piscina aquecida, área gourmet com churrasqueira e quatro suítes climatizadas.' },
        { nome: 'Studio Jardim Botânico', clientes_id: 5, endereco: 'Rua dos Ipês, 78', descricao: 'Studio compacto e funcional ideal para viagens a trabalho, com internet de alta velocidade, estação de home office e varanda.' },
        { nome: 'Cobertura Vista Verde', clientes_id: 6, endereco: 'Alameda dos Flamboyants, 305', descricao: 'Cobertura duplex iluminada com terraço privativo, hidromassagem ao ar livre e vista livre para o parque da cidade.' },
        { nome: 'Sítio Recanto das Águas', clientes_id: 7, endereco: 'Estrada Municipal do Barreiro, km 4', descricao: 'Propriedade rural cercada por mata nativa, com lago para pesca, pomar, varanda com redes e fogão a lenha.' },
        { nome: 'Apartamento Vila Nova', clientes_id: 8, endereco: 'Rua Coronel Quirino, 915', descricao: 'Apartamento recém-reformado em bairro arborizado, próximo a cafeterias, padarias artesanais e mercados.' },
        { nome: 'Bangalô das Palmeiras', clientes_id: 9, endereco: 'Travessa do Sol, 55', descricao: 'Bangalô térreo cercado por coqueiros, ambiente silencioso com iluminação natural e cozinha completa.' },
        { nome: 'Residencial Bela Vista', clientes_id: 10, endereco: 'Rua Dona Maria Umbelina, 620', descricao: 'Apartamento familiar amplo no oitavo andar, sala de estar integrada, dois quartos e vaga de garagem coberta.' },
    ],
    alugueis: [
        { data: new Date('2026-11-10'), imoveis_id: 1 },
        { data: new Date('2026-11-12'), imoveis_id: 2 },
        { data: new Date('2026-11-15'), imoveis_id: 3 },
        { data: new Date('2026-11-18'), imoveis_id: 4 },
        { data: new Date('2026-11-20'), imoveis_id: 5 },
        { data: new Date('2026-11-22'), imoveis_id: 6 },
        { data: new Date('2026-11-25'), imoveis_id: 7 },
        { data: new Date('2026-11-28'), imoveis_id: 8 },
        { data: new Date('2026-12-02'), imoveis_id: 9 },
        { data: new Date('2026-12-05'), imoveis_id: 10 },
    ],
};

const tabelas = Object.keys(dados).reverse().join(', ');
await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tabelas} RESTART IDENTITY CASCADE`);
console.log('   🧹 registros anteriores apagados (ids reiniciados)');

for (const [tabela, data] of Object.entries(dados)) {
    const { count } = await prisma[tabela].createMany({ data });
    console.log(`   ✅ ${tabela}: ${count} registros`);
}

await prisma.$disconnect();
