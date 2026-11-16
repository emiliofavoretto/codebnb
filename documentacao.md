## Requisitos

### 1.1 Requisitos Funcionais do Sistema

| ID | Requisito | Descrição |
| --- | --- | --- |
| RF01 | Realizar Login | O sistema deve permitir que usuários (hóspedes e anfitriões) autentiquem-se utilizando e-mail e senha cadastrados. | 
| RF02 | Exibir Tela Principal | O sistema deve apresentar a página inicial com o catálogo de imóveis disponíveis em destaque e barra de busca rápida. | 
| RF03 | Cadastrar | O sistema deve permitir a criação de novas contas com dados básicos (nome, e-mail, telefone e senha) e escolha de perfil. | 
| RF04 | Consultar | O sistema deve permitir pesquisar e filtrar imóveis por localização, datas de disponibilidade, preço e capacidade de hóspedes. | 
| RF05 | Atualizar | O sistema deve permitir que o usuário edite suas informações pessoais, foto de perfil e senha de acesso. | 
| RF06 | Cadastrar Imóvel | O sistema deve permitir que anfitriões anunciem novas propriedades, informando endereço, descrição, valor da diária, fotos e comodidades. |
| RF07 | Atualizar Imóvel | O sistema deve permitir que o anfitrião edite as informações, preços e regras de seus imóveis já cadastrados. |
| RF08 | Realizar Reserva | O sistema deve permitir que o hóspede selecione datas de check-in e check-out em um imóvel disponível e confirme a reserva. |
| RF09 | Consultar Reservas | O sistema deve exibir o histórico e o status das reservas realizadas (para hóspedes) e das reservas recebidas (para anfitriões). |
| RF10 | Avaliar Estadia | O sistema deve permitir que o hóspede atribua uma nota e escreva um comentário sobre o imóvel após o término da reserva. |
| RF11 | Excluir | O sistema deve permitir que o anfitrião remova seus anúncios ou que qualquer usuário exclua seu próprio cadastro, desde que não haja reservas ativas. | 
| RF12 | Encerrar Login | O sistema deve permitir que o usuário encerre sua sessão de forma segura, invalidando o token de acesso ativo. |

### 1.2 Requisitos Não Funcionais

| ID | Requisito | Descrição |
| --- | --- | --- |
| RNF01 | Proteção de Dados | As senhas dos usuários devem ser armazenadas exclusivamente em formato criptografado (hash) utilizando a biblioteca bcryptjs, e dados sensíveis devem trafegar sob protocolo HTTPS. |
| RNF02 | Integridade dos Dados | O banco de dados PostgreSQL, gerenciado via Prisma ORM, deve garantir a consistência referencial entre usuários, imóveis e reservas, impedindo reservas sobrepostas nas mesmas datas (double booking). |
| RNF03 | Controle de Acesso | A autenticação e autorização das rotas devem ser controladas via tokens JWT (jsonwebtoken), garantindo que apenas o proprietário de um imóvel possa editá-lo ou excluí-lo. |

## 2 Requisitos de Infraestrutura

| Tecnologia | Versão / ambiente |
| --- | --- |
| JavaScript | Node.js 24 |
| Next.js | 16 |
| React e React DOM | 19 |
| bcryptjs | 3 |
| jsonwebtoken | 9 |
| node:crypto | Integrado ao Node.js |
| PostgreSQL | 18 |
| Prisma e Prisma Client | 6 |
| Ant Design | 6 |
