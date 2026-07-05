// testing
import * as argon2 from 'argon2';
import { uuidv7 } from 'uuidv7';

const hash = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
      secret: Buffer.from(process.env.JWT_SECRET || ''),
    });
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao gerar hash');
  }
};

const teachers = [
  {
    id: '019eb9e9-c216-7128-9da1-3ca3c7b2b31f',
    name: 'Adriana de Fátima Valente Bastos',
    email: 'adfvb@gmail.com',
    password: 'Password123!',
    cpf: '89433321731',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Gestão e Inovação Tecnológica',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Tópicos Especiais em Logística',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão da Inovação',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Planejamento Estratégico',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Metodologia da Pesquisa II',
      },
    ],
  },
  {
    id: '019eb9e9-c219-73f0-b574-e3261d33f994',
    name: 'ALEXANDRE MAGNO ALVES DE OLIVEIRA',
    email: 'amado@gmail.com',
    password: 'Password123!',
    cpf: '21442240644',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Gestão Ambiental e Sustentabilidade',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Introdução à Logística',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Logística de Transporte e Distribuição',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Tecnologia e Sistemas de Informação Logística',
      },
    ],
  },
  {
    id: '019eb9e9-c21a-74e4-8e0b-58cb6df8d6ef',
    name: 'Alexandre Strapação Guedes Vianna',
    email: 'asgv@gmail.com',
    password: 'Password123!',
    cpf: '42128390087',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Desenvolvimento para Web I',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Desenvolvimento para Web II',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Desenvolvimento para Web I',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Desenvolvimento para Web II',
      },
    ],
  },
  {
    id: '019eb9e9-c21b-7746-9568-cc09d1952871',
    name: 'ALLAN DIEGO SILVA LIMA',
    email: 'adsl@gmail.com',
    password: 'Password123!',
    cpf: '18578057473',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Lógica de Programação e Estrutura de Dados',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Programação Imperativa',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Metodologia Científica',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Recuperação de Informação',
      },
    ],
  },
  {
    id: '019eb9e9-c21d-793a-9557-e97feb1a9cc5',
    name: 'Ana Carolina Marinho Ribeiro Lemos',
    email: 'acmrl@gmail.com',
    password: 'Password123!',
    cpf: '17309325338',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Segurança do Trabalho',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Higiene e Segurança do Trabalho',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Ergonomia, Higiene e Segurança do Trabalho',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Ética, Cidadania e Sustentabilidade',
      },
    ],
  },
  {
    id: '019eb9e9-c21e-72c8-b528-fe95e599e55b',
    name: 'ANA CAROLINA PEIXOTO MEDEIROS',
    email: 'acpm@gmail.com',
    password: 'Password123!',
    cpf: '43777572020',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Comportamento Organizacional',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Marketing I',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Gestão de Pessoas II',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Liderança',
      },
    ],
  },
  {
    id: '019eb9e9-c21f-7285-a541-8e292e3f497b',
    name: 'Andreza Silva Cordeiro',
    email: 'asc@gmail.com',
    password: 'Password123!',
    cpf: '73328426450',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Sociologia',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Metodologia Científica',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Metodologia de Pesquisa I',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Metodologia Científica',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Metodologia Científica',
      },
    ],
  },
  {
    id: '019eb9e9-c220-7a95-96bc-72497c76772f',
    name: 'BRUNO RIOS MONTEIRO',
    email: 'brm@gmail.com',
    password: 'Password123!',
    cpf: '44245617551',
    subjects: [
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Logística Reversa e Meio Ambiente',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão Ambiental',
      },
    ],
  },
  {
    id: '019eb9e9-c221-794d-ab1d-d8d2fc48dba8',
    name: 'Cícero Raimundo da Silva Júnior',
    email: 'crdsj@gmail.com',
    password: 'Password123!',
    cpf: '74779309441',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Matemática Aplicada à Administração',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Matemática Aplicada',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Cálculo para Computação',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Estatística e Probabilidade',
      },
    ],
  },
  {
    id: '019eb9e9-c222-7e99-995a-8c2af5d75322',
    name: 'Danniel Claudio de Araujo',
    email: 'dcda@gmail.com',
    password: 'Password123!',
    cpf: '94045949208',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Estatística Aplicada',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Pesquisa Operacional',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Estatística I',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Estatística II',
      },
    ],
  },
  {
    id: '019eb9e9-c223-74a6-8004-2c9efdb354d1',
    name: 'Djalma Araújo Rangel',
    email: 'dar@gmail.com',
    password: 'Password123!',
    cpf: '92153751470',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Contabilidade Gerencial e de Custos',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão da Produção',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Projeto Integrador II',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Controle Estatístico da Qualidade',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Custos de Produção',
      },
    ],
  },
  {
    id: '019eb9e9-c224-73c8-8780-5f2d0b87698e',
    name: 'Edilene Felix dos Santos',
    email: 'efds@gmail.com',
    password: 'Password123!',
    cpf: '36044350215',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Marketing II',
      },
      // {
      //   course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
      //   subject_name: 'Marketing Digital e E-commerce',
      // },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Introdução à Administração',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Fundamentos da Administração',
      },
    ],
  },
  {
    id: '019eb9e9-c226-7676-b33f-3859e71a0692',
    name: 'Emaur Florencio de Oliveira',
    email: 'efdo@gmail.com',
    password: 'Password123!',
    cpf: '74534960557',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Projeto e Prática I',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Engenharia de Software',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Informática',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Projeto e Desenvolvimento II',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Engenharia de Software',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Projeto e Desenvolvimento IV',
      },
    ],
  },
  {
    id: '019eb9e9-c227-77ff-b0c4-05f2611bb0fc',
    name: 'Érica Carvalho da Silva Costa',
    email: 'ecdsc@gmail.com',
    password: 'Password123!',
    cpf: '21194849881',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Português Instrumental',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Português Aplicado',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Língua Portuguesa Aplicada',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Metodologia da Pesquisa I',
      },
    ],
  },
  {
    id: '019eb9e9-c228-705a-9357-7333cde9330d',
    name: 'Flora Magna do Monte Vilar',
    email: 'fmdmv@gmail.com',
    password: 'Password123!',
    cpf: '43561065392',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Administração da Produção e Operações I',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Administração da Produção e Operações II',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão de Desenvolvimento do Produto',
      },
    ],
  },
  {
    id: '019eb9e9-c229-7176-a077-80fa8d27b8b5',
    name: 'Francisco Chaves Pinto',
    email: 'fcp@gmail.com',
    password: 'Password123!',
    cpf: '88425178959',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Organização, Sistema e Método',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Introdução à Gestão da Qualidade',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão do Processo',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Metrologia',
      },
    ],
  },
  {
    id: '019eb9e9-c22a-7859-8baa-aab4e8b19ed2',
    name: 'Gustavo Nóbrega Martins',
    email: 'gnm@gmail.com',
    password: 'Password123!',
    cpf: '81390136841',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Rede de Computadores',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Redes de Computadores',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Interconexão e Serviços de Redes',
      },
    ],
  },
  {
    id: '019eb9e9-c22b-79ea-9048-cc46aa8559d0',
    name: 'HUGO LEONARDO COUTINHO DANTAS',
    email: 'hlcd@gmail.com',
    password: 'Password123!',
    cpf: '31972327712',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Matemática Aplicada',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Estatística Básica',
      },
    ],
  },
  {
    id: '019eb9e9-c22c-74b7-b3c1-a948e582ed14',
    name: 'Inêz Manuele dos Santos',
    email: 'imds@gmail.com',
    password: 'Password123!',
    cpf: '79276101551',
    subjects: [
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão de Materiais e Logística',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Projeto Integrador I',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão da Produção',
      },
    ],
  },
  {
    id: '019eb9e9-c22d-7105-9e1c-a1c78f0ef07f',
    name: 'Ivo Felix Gualberto de Sá',
    email: 'ifgds@gmail.com',
    password: 'Password123!',
    cpf: '25696517293',
    subjects: [
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Inglês I',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Inglês II',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Inglês III',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Inglês IV',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Inglês V',
      },
    ],
  },
  {
    id: '019eb9e9-c22f-7e36-b9c6-3a563ebfa5c9',
    name: 'José Tarcísio Pereira Magalhães',
    email: 'jtpm@gmail.com',
    password: 'Password123!',
    cpf: '34858378063',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Logística Empresarial',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Comércio e Relações Internacionais',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Logística de Armazenagem',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Custos Logísticos',
      },
    ],
  },
  {
    id: '019eb9e9-c230-798a-a84b-023e9f3fb4f0',
    name: 'Josefa Renata Queiroz da Costa Gomes',
    email: 'jrqdcg@gmail.com',
    password: 'Password123!',
    cpf: '51325628174',
    subjects: [
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Gestão de Qualidade',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Administração Estratégica',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Simulações e Estratégias Empresariais',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Gestão da Qualidade',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Ferramentas da Qualidade',
      },
    ],
  },
  {
    id: '019eb9e9-c231-7e24-8322-284000db0df5',
    name: 'Liliane Alves do Nascimento Sales',
    email: 'ladns@gmail.com',
    password: 'Password123!',
    cpf: '20709840284',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Projeto e Prática II',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Fundamentos de Computação para Internet',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Projeto e Desenvolvimento I',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Projeto e Desenvolvimento III',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Testes e Qualidade de Software',
      },
      // {
      //   course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
      //   subject_name: 'Prática Profissional',
      // },
    ],
  },
  {
    id: '019eb9e9-c232-7421-b52a-19c677c533da',
    name: 'Lincoln Tavares dos Santos',
    email: 'ltds@gmail.com',
    password: 'Password123!',
    cpf: '89454587943',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Tecnologia da Informação',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Sistemas de Informação',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Fundamentos da Informática',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Tecnologia e Sistemas de Informação Aplicados',
      },
    ],
  },
  {
    id: '019eb9e9-c233-73e2-b8b7-1dc0b6ae14e9',
    name: 'Luiz Henrique de Oliveira Martins',
    email: 'lhdom@gmail.com',
    password: 'Password123!',
    cpf: '56077318710',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Empreendedorismo',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Empreendedorismo',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Empreendedorismo',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Empreendedorismo e Inovação',
      },
    ],
  },
  {
    id: '019eb9e9-c234-7f09-ab27-0c48102c56e6',
    name: 'Mari Tânia Sachet Soares',
    email: 'mtss@gmail.com',
    password: 'Password123!',
    cpf: '93064888820',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Comunicação Empresarial',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Inglês Instrumental',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Inglês Instrumental I',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Inglês Instrumental II',
      },
    ],
  },
  {
    id: '019eb9e9-c235-72f3-b62e-924cab44cf59',
    name: 'Mariane Bezerra Nóbrega',
    email: 'mbn@gmail.com',
    password: 'Password123!',
    cpf: '09444663205',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Introdução à Contabilidade',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Finanças I',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Finanças II',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Metodologia de Pesquisa II',
      },
    ],
  },
  {
    id: '019eb9e9-c236-703e-99ce-9f1a8bcbf2b0',
    name: 'Michelle Silva de Oliveira Cedraz',
    email: 'msdoc@gmail.com',
    password: 'Password123!',
    cpf: '88821730972',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Administração e Legislação Tributária',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Análise dos Demonstrativos Financeiros',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Gestão de Micro e Pequenas Empresas',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Orçamento e Finanças Públicas',
      },
    ],
  },
  {
    id: '019eb9e9-c238-757a-ac4e-aa26d7390c33',
    name: 'Milton Secundino de Souza Junior',
    email: 'msdsj@gmail.com',
    password: 'Password123!',
    cpf: '98932547955',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Banco de Dados',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Programação Orientada a Objeto',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Banco de Dados',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Programação Orientada a Objetos',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Algoritmos e Estruturas de Dados',
      },
    ],
  },
  {
    id: '019eb9e9-c239-7949-be0e-075ab7d7d62b',
    name: 'Ramon Mota de Souza Farias',
    email: 'rmdsf@gmail.com',
    password: 'Password123!',
    cpf: '69720376546',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Segurança de Sistemas para Internet',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Implantação e Administração de Serviços Web',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Segurança de Sistema para Internet',
      },
    ],
  },
  {
    id: '019eb9e9-c23a-7bb5-b767-12189becfe2b',
    name: 'Ranieri Valença de Carvalho',
    email: 'rvdc@gmail.com',
    password: 'Password123!',
    cpf: '54561133925',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Projeto e Prática II',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Sistemas Distribuídos',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Tópicos Avançados em Bancos de Dados',
      },
    ],
  },
  {
    id: '019eb9e9-c23b-77dd-bd2f-a60957326f26',
    name: 'RENATA VIEIRA MARQUES PETTY SANTANA',
    email: 'rvmps@gmail.com',
    password: 'Password123!',
    cpf: '43572090059',
    subjects: [
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Interação Humano-Computador',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Fundamentos do Design Digital',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Design de Interface',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Design de Interação',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Interação Humano-computador',
      },
    ],
  },
  {
    id: '019eb9e9-c23c-7009-9e86-c852a7a1b8fc',
    name: 'ROBERTO DIAS CAHU',
    email: 'rdc@gmail.com',
    password: 'Password123!',
    cpf: '05713939855',
    subjects: [
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Matemática Básica',
      },
    ],
  },
  {
    id: '019eb9e9-c23d-72cd-a760-055053e8b291',
    name: 'Simonelle Wivian do Nascimento',
    email: 'swdn@gmail.com',
    password: 'Password123!',
    cpf: '84089177227',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Introdução à Administração',
      },
      // {
      //   course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
      //   subject_name: 'Prática Profissional',
      // },
      // {
      //   course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
      //   subject_name: 'Tópicos Especiais em Administração',
      // },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão da Qualidade em Serviços',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Introdução à Administração',
      },
    ],
  },
  {
    id: '019eb9e9-c23e-7d6a-a897-c1fc99d00067',
    name: 'Willyans Garcia Coelho',
    email: 'wgc@gmail.com',
    password: 'Password123!',
    cpf: '23857995106',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Ética Profissional em Administração',
      },
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Introdução à Psicologia',
      },
      {
        course_id: '019e8fd2-f426-718e-847a-ea85f96f5c49',
        subject_name: 'Ética Profissional e Cidadania',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Ética profissional',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Ética, Cidadania e Sustentabilidade',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Processos Psicológicos e Interação Social',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Pesquisa e Análise de Comportamento',
      },
    ],
  },
  {
    id: '019eb9e9-c23f-7f61-9d5f-36d54789d657',
    name: 'Yuri Carlos Tietre de Araújo',
    email: 'yctda@gmail.com',
    password: 'Password123!',
    cpf: '58922624213',
    subjects: [
      {
        course_id: '019e8fd3-232c-792e-a887-fca366ef1737',
        subject_name: 'Gestão de Pessoas I',
      },
      {
        course_id: '019e8fd3-4823-79a3-89c1-ab37db0bf84d',
        subject_name: 'Gestão de Pessoas',
      },
      {
        course_id: '019e8fd3-6df7-7ee8-8586-1a5fa624012f',
        subject_name: 'Gestão de Pessoas',
      },
      {
        course_id: '019e8fd2-ce75-77f5-b9ea-18734dd12e5f',
        subject_name: 'Gestão de Pessoas',
      },
    ],
  },
];

const semester_id = '019eb9d9-877c-7a7c-9927-1eed91b01717';
const role_id = '019f3281-af68-77af-a4bb-314e5da659e0';
const organization_id = '019f3282-927a-7f57-82ed-d3eeea582849';

const user_roles = [];
for (const teacher of teachers) {
  user_roles.push({
    id: uuidv7(),
    user_id: teacher.id,
    role_id,
    organization_id,
    created_at: new Date(),
    updated_at: new Date(),
  });
}

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(
        'user',
        await Promise.all(
          teachers.map(async (teacher) => ({
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            password: await hash(teacher.password),
            cpf: teacher.cpf,
            created_at: new Date(),
            updated_at: new Date(),
          })),
        ),
        {
          transaction,
        },
      );

      await queryInterface.bulkInsert(
        'teacher',
        teachers.map((teacher) => ({
          user_id: teacher.id,
          workload: '40',
          created_at: new Date(),
          updated_at: new Date(),
        })),
        {
          transaction,
        },
      );

      await queryInterface.bulkInsert('user_role_organization', user_roles, {
        transaction,
      });

      for (const teacher of teachers) {
        for (const subject of teacher.subjects) {
          const subjectData = await queryInterface.sequelize.query(
            `SELECT id FROM subject WHERE course_id = :course_id AND name = :subject_name`,
            {
              replacements: {
                course_id: subject.course_id,
                subject_name: subject.subject_name,
              },
              transaction,
            },
          );

          if (!subjectData || !subjectData[0] || subjectData[0].length === 0) {
            console.warn(
              `Subject not found for teacher ${teacher.name} and course ${subject.course_id} and subject ${subject.subject_name}`,
            );
            throw 'erro testing';
          }

          await queryInterface.bulkInsert(
            'subject-teacher-semester',
            [
              {
                id: uuidv7(),
                teacher_id: teacher.id,
                subject_id: subjectData[0][0].id,
                semester_id,
                created_at: new Date(),
                updated_at: new Date(),
              },
            ],
            { transaction },
          );
        }
      }

      transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
