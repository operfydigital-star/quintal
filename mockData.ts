import { Category, type CategoryData } from './types';

export const mockData: Record<Category, CategoryData> = {
    [Category.BAR]: {
        fichas: [
            { 
                id: 'ft1', 
                title: 'Caipirinha Clássica', 
                subcategory: 'Drinks Clássicos',
                imageUrl: '',
                ingredients: [
                    {id: 'ing1', name: 'Cachaça', quantity: 50, unit: 'ml'},
                    {id: 'ing2', name: 'Limão Taiti', quantity: 1, unit: 'unidade'},
                    {id: 'ing3', name: 'Açúcar', quantity: 15, unit: 'g'},
                    {id: 'ing4', name: 'Gelo', quantity: 200, unit: 'g'},
                ], 
                steps: ['Macerar o limão com o açúcar em um copo.', 'Completar o copo com gelo.', 'Adicionar a cachaça.', 'Mexer bem com uma colher de bar.'] 
            },
            {
                id: 'ft-bar-2',
                title: 'Moscow Mule',
                subcategory: 'Drinks',
                imageUrl: '',
                ingredients: [
                    {id: 'ing-bar-5', name: 'Vodka', quantity: 50, unit: 'ml'},
                    {id: 'ing-bar-6', name: 'Suco de Limão', quantity: 25, unit: 'ml'},
                    {id: 'ing-bar-7', name: 'Espuma de Gengibre', quantity: 50, unit: 'ml'},
                    {id: 'ing-bar-8', name: 'Gelo', quantity: 200, unit: 'g'},
                ],
                steps: ['Encher uma caneca de cobre com gelo.', 'Adicionar a vodka e o suco de limão.', 'Completar com a espuma de gengibre.', 'Mexer levemente e servir.']
            },
            {
                id: 'ft-bar-3',
                title: 'Marchetti Sour',
                subcategory: 'Drinks Autorais',
                imageUrl: '',
                ingredients: [
                    {id: 'ing-bar-9', name: 'Whiskey Bourbon', quantity: 60, unit: 'ml'},
                    {id: 'ing-bar-10', name: 'Suco de Limão Siciliano', quantity: 30, unit: 'ml'},
                    {id: 'ing-bar-11', name: 'Xarope de Açúcar', quantity: 15, unit: 'ml'},
                    {id: 'ing-bar-12', name: 'Clara de Ovo Pasteurizada', quantity: 1, unit: 'unidade'},
                ],
                steps: ['Bater todos os ingredientes em uma coqueteleira sem gelo (dry shake).', 'Adicionar gelo e bater novamente.', 'Coar para um copo baixo com gelo novo.', 'Decorar com uma fatia de laranja.']
            },
            {
                id: 'ft-bar-4',
                title: 'Negroni',
                subcategory: 'Coqueteis',
                imageUrl: '',
                ingredients: [
                    {id: 'ing-bar-13', name: 'Gin', quantity: 30, unit: 'ml'},
                    {id: 'ing-bar-14', name: 'Campari', quantity: 30, unit: 'ml'},
                    {id: 'ing-bar-15', name: 'Vermute Rosso', quantity: 30, unit: 'ml'},
                    {id: 'ing-bar-16', name: 'Fatia de Laranja', quantity: 1, unit: 'unidade'},
                ],
                steps: ['Montar o drink em um copo baixo com gelo.', 'Adicionar o Gin, Campari e Vermute.', 'Mexer gentilmente.', 'Decorar com uma fatia de laranja.']
            }
        ],
        shoppingList: [
            { id: 'sl1', name: 'Limão Taiti', quantity: '2 kg', acquired: false },
            { id: 'sl-bar-2', name: 'Cachaça de Qualidade', quantity: '3 Garrafas', acquired: false },
            { id: 'sl-bar-3', name: 'Vodka', quantity: '2 Garrafas', acquired: false },
            { id: 'sl-bar-4', name: 'Whiskey Bourbon', quantity: '1 Garrafa', acquired: false },
            { id: 'sl-bar-5', name: 'Gin', quantity: '1 Garrafa', acquired: false },
            { id: 'sl-bar-6', name: 'Campari', quantity: '1 Garrafa', acquired: false },
            { id: 'sl-bar-7', name: 'Vermute Rosso', quantity: '1 Garrafa', acquired: false },
        ],
        checklist: [],
    },
    [Category.PARRILHA]: {
        fichas: [
            { 
                id: 'ft2', 
                title: 'Pão de Alho da Casa', 
                subcategory: 'Entrada',
                imageUrl: '',
                ingredients: [
                    {id: 'ing5', name: 'Pão de Sal', quantity: 1, unit: 'unidade'},
                    {id: 'ing6', name: 'Alho', quantity: 2, unit: 'unidade'},
                    {id: 'ing7', name: 'Manteiga sem sal', quantity: 50, unit: 'g'},
                    {id: 'ing8', name: 'Salsinha picada', quantity: 1, unit: 'unidade'},
                ], 
                steps: ['Amassar o alho e misturar com a manteiga e a salsinha.', 'Fazer cortes no pão sem separar as fatias.', 'Rechear os cortes com a pasta de alho.', 'Levar à parrilla até dourar.'] 
            },
            { 
                id: 'ft-picanha', 
                title: 'Picanha na Grelha', 
                subcategory: 'Prato Principal',
                imageUrl: '',
                ingredients: [
                    {id: 'ing9', name: 'Peça de Picanha', quantity: 1.2, unit: 'kg'},
                    {id: 'ing10', name: 'Sal Grosso', quantity: 100, unit: 'g'},
                ], 
                steps: ['Cortar a picanha em bifes grossos.', 'Passar sal grosso nos dois lados.', 'Levar à grelha bem quente.', 'Servir ao ponto.'] 
            },
            { 
                id: 'ft-parrilha-3', 
                title: 'Abacaxi Grelhado com Canela', 
                subcategory: 'Sobremesa',
                imageUrl: '',
                ingredients: [
                    {id: 'ing11', name: 'Abacaxi', quantity: 1, unit: 'unidade'},
                    {id: 'ing12', name: 'Açúcar Mascavo', quantity: 50, unit: 'g'},
                    {id: 'ing13', name: 'Canela em Pó', quantity: 10, unit: 'g'},
                ], 
                steps: ['Cortar o abacaxi em fatias grossas.', 'Misturar o açúcar mascavo e a canela.', 'Passar as fatias de abacaxi na mistura.', 'Levar à grelha até caramelizar dos dois lados.', 'Servir quente, opcionalmente com sorvete de creme.'] 
            },
            {
                id: 'ft-parrilha-4',
                title: 'Molho Chimichurri',
                subcategory: 'Produção',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-par-14', name: 'Salsinha Fresca Picada', quantity: 100, unit: 'g'},
                    { id: 'ing-par-15', name: 'Orégano Seco', quantity: 20, unit: 'g'},
                    { id: 'ing-par-16', name: 'Alho Picado', quantity: 15, unit: 'g'},
                    { id: 'ing-par-17', name: 'Pimenta Calabresa', quantity: 5, unit: 'g'},
                    { id: 'ing-par-18', name: 'Vinagre de Vinho Tinto', quantity: 50, unit: 'ml'},
                    { id: 'ing-par-19', name: 'Azeite de Oliva Extra Virgem', quantity: 100, unit: 'ml'},
                ],
                steps: ['Em uma tigela, misture a salsinha, o orégano, o alho e a pimenta calabresa.', 'Adicione o vinagre e misture bem.', 'Incorpore o azeite de oliva lentamente, mexendo sempre.', 'Deixe descansar na geladeira por pelo menos 30 minutos antes de servir.']
            }
        ],
        shoppingList: [
            { id: 'sl2', name: 'Picanha', quantity: '5 kg', acquired: true },
            { id: 'sl3', name: 'Carvão', quantity: '10 sacos', acquired: false },
            { id: 'sl4', name: 'Sal Grosso', quantity: '2 kg', acquired: false },
            { id: 'sl5', name: 'Abacaxi', quantity: '2 unidades', acquired: false },
            { id: 'sl6', name: 'Salsinha Fresca', quantity: '1 maço', acquired: false },
            { id: 'sl7', name: 'Vinagre de Vinho Tinto', quantity: '1 garrafa', acquired: false },
        ],
        checklist: [
            { id: 'pcl1', text: 'Verificar temperatura da grelha', completed: false },
            { id: 'pcl2', text: 'Limpar a grelha antes de usar', completed: true },
        ],
    },
    [Category.COZINHA_MANHA]: { 
        fichas: [
            {
                id: 'ft-cm-3',
                title: 'Bruschetta de Tomate Fresco',
                subcategory: 'Entrada',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cm-9', name: 'Pão Italiano', quantity: 4, unit: 'unidade' },
                    { id: 'ing-cm-10', name: 'Tomate Débora', quantity: 200, unit: 'g' },
                    { id: 'ing-cm-11', name: 'Manjericão Fresco', quantity: 10, unit: 'g' },
                    { id: 'ing-cm-12', name: 'Azeite Extra Virgem', quantity: 30, unit: 'ml' },
                ],
                steps: ['Tostar as fatias de pão.', 'Picar o tomate em cubos pequenos.', 'Misturar o tomate com manjericão picado e azeite.', 'Montar a mistura sobre as fatias de pão tostado.']
            },
            {
                id: 'ft-cm-2',
                title: 'Ovos Mexidos Cremosos',
                subcategory: 'Prato Principal',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cm-5', name: 'Ovos', quantity: 3, unit: 'unidade' },
                    { id: 'ing-cm-6', name: 'Leite Integral', quantity: 30, unit: 'ml' },
                    { id: 'ing-cm-7', name: 'Manteiga', quantity: 15, unit: 'g' },
                    { id: 'ing-cm-8', name: 'Sal', quantity: 2, unit: 'g' },
                ],
                steps: ['Bater os ovos com o leite e o sal.', 'Derreter a manteiga em uma frigideira em fogo baixo.', 'Despejar os ovos e mexer constantemente com uma espátula.', 'Retirar do fogo quando ainda estiverem úmidos e cremosos.']
            },
            {
                id: 'ft-cm-5',
                title: 'Arroz Branco Soltinho',
                subcategory: 'Acompanhamentos',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cm-17', name: 'Arroz Agulhinha', quantity: 200, unit: 'g' },
                    { id: 'ing-cm-18', name: 'Alho', quantity: 10, unit: 'g' },
                    { id: 'ing-cm-19', name: 'Óleo', quantity: 15, unit: 'ml' },
                    { id: 'ing-cm-20', name: 'Sal', quantity: 5, unit: 'g' },
                ],
                steps: ['Refogar o alho picado no óleo.', 'Adicionar o arroz e fritar por um minuto.', 'Adicionar o dobro de água fervente e o sal.', 'Cozinhar em fogo baixo com a panela semi-tampada até a água secar.']
            },
            {
                id: 'ft-cm-4',
                title: 'Salada de Frutas da Estação',
                subcategory: 'Sobremesa',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cm-13', name: 'Mamão', quantity: 200, unit: 'g' },
                    { id: 'ing-cm-14', name: 'Manga', quantity: 200, unit: 'g' },
                    { id: 'ing-cm-15', name: 'Laranja (suco)', quantity: 100, unit: 'ml' },
                    { id: 'ing-cm-16', name: 'Hortelã Fresca', quantity: 5, unit: 'g' },
                ],
                steps: ['Picar todas as frutas em cubos uniformes.', 'Misturar as frutas delicadamente.', 'Regar com o suco de laranja.', 'Finalizar com folhas de hortelã.']
            },
            {
                id: 'ft-cm-1',
                title: 'Preparo do Molho de Tomate Base',
                subcategory: 'Produção',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cm-1', name: 'Tomate Pelado em Lata', quantity: 2, unit: 'kg' },
                    { id: 'ing-cm-2', name: 'Cebola', quantity: 200, unit: 'g' },
                    { id: 'ing-cm-3', name: 'Alho', quantity: 50, unit: 'g' },
                    { id: 'ing-cm-4', name: 'Manjericão Fresco', quantity: 1, unit: 'unidade' },
                ],
                steps: ['Refogar a cebola e o alho picados em azeite.', 'Adicionar o tomate pelado e amassar.', 'Cozinhar em fogo baixo por pelo menos 2 horas.', 'Finalizar com folhas de manjericão fresco.']
            }
        ], 
        shoppingList: [
            { id: 'sl-cm-1', name: 'Tomate Pelado (lata 2kg)', quantity: '5 latas', acquired: false },
            { id: 'sl-cm-2', name: 'Cebola', quantity: '2 kg', acquired: false },
            { id: 'sl-cm-3', name: 'Ovos (dúzia)', quantity: '3 dúzias', acquired: false },
            { id: 'sl-cm-4', name: 'Leite Integral', quantity: '2 L', acquired: false },
            { id: 'sl-cm-5', name: 'Pão Italiano', quantity: '2 unidades', acquired: false },
            { id: 'sl-cm-6', name: 'Mamão', quantity: '1 kg', acquired: false },
            { id: 'sl-cm-7', name: 'Manga', quantity: '1 kg', acquired: false },
            { id: 'sl-cm-8', name: 'Arroz Agulhinha', quantity: '5 kg', acquired: false },
        ], 
        checklist: [
            { id: 'ccl-cm-1', text: 'Ligar fornos e chapas', completed: false },
            { id: 'ccl-cm-2', text: 'Verificar validade de perecíveis na geladeira', completed: false },
            { id: 'ccl-cm-3', text: 'Organizar bancada de preparo (mise en place)', completed: false },
            { id: 'ccl-cm-4', text: 'Receber e conferir mercadorias dos fornecedores', completed: true },
        ]
    },
    [Category.COZINHA_NOITE]: {
        fichas: [
            {
                id: 'ft-cn-5',
                title: 'Dadinho de Tapioca com Geleia de Pimenta',
                subcategory: 'Entrada',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cn-20', name: 'Tapioca Granulada', quantity: 250, unit: 'g' },
                    { id: 'ing-cn-21', name: 'Queijo Coalho Ralado', quantity: 250, unit: 'g' },
                    { id: 'ing-cn-22', name: 'Leite Integral Fervente', quantity: 500, unit: 'ml' },
                    { id: 'ing-cn-23', name: 'Sal e Pimenta do Reino', quantity: 5, unit: 'g' },
                    { id: 'ing-cn-24', name: 'Geleia de Pimenta', quantity: 100, unit: 'g' },
                ],
                steps: [
                    'Em uma tigela, misture a tapioca e o queijo coalho.',
                    'Despeje o leite fervente sobre a mistura e mexa rapidamente até engrossar.',
                    'Tempere com sal e pimenta.',
                    'Espalhe a massa em uma assadeira forrada e refrigere por 2 horas.',
                    'Corte em cubos e frite em óleo quente até dourar.',
                    'Sirva com a geleia de pimenta.'
                ]
            },
            {
                id: 'ft-cn-1',
                title: 'Filé Mignon ao Molho Madeira',
                subcategory: 'Prato Principal',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cn-1', name: 'Medalhão de Filé Mignon', quantity: 200, unit: 'g' },
                    { id: 'ing-cn-2', name: 'Vinho Madeira', quantity: 100, unit: 'ml' },
                    { id: 'ing-cn-3', name: 'Champignon', quantity: 50, unit: 'g' },
                    { id: 'ing-cn-4', name: 'Caldo de Carne', quantity: 200, unit: 'ml' },
                ],
                steps: ['Grelhar o medalhão de filé mignon no ponto desejado.', 'Na mesma frigideira, deglaçar com o vinho madeira.', 'Adicionar o champignon e o caldo de carne, deixar reduzir.', 'Servir o molho sobre o filé.']
            },
            {
                id: 'ft-cn-2',
                title: 'Risoto de Parmesão',
                subcategory: 'Acompanhamento',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cn-5', name: 'Arroz Arbóreo', quantity: 100, unit: 'g' },
                    { id: 'ing-cn-6', name: 'Vinho Branco Seco', quantity: 50, unit: 'ml' },
                    { id: 'ing-cn-7', name: 'Caldo de Legumes', quantity: 500, unit: 'ml' },
                    { id: 'ing-cn-8', name: 'Queijo Parmesão Ralado', quantity: 50, unit: 'g' },
                    { id: 'ing-cn-9', name: 'Manteiga', quantity: 20, unit: 'g' },
                ],
                steps: ['Refogar o arroz em um pouco de manteiga.', 'Adicionar o vinho e deixar evaporar.', 'Ir adicionando o caldo de legumes quente, aos poucos, mexendo sempre.', 'Quando o arroz estiver al dente, finalizar com o queijo parmesão e a manteiga.']
            },
            {
                id: 'ft-cn-3',
                title: 'Petit Gâteau com Sorvete',
                subcategory: 'Sobremesa',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cn-10', name: 'Chocolate Meio Amargo', quantity: 100, unit: 'g' },
                    { id: 'ing-cn-11', name: 'Manteiga', quantity: 100, unit: 'g' },
                    { id: 'ing-cn-12', name: 'Ovo', quantity: 2, unit: 'unidade' },
                    { id: 'ing-cn-13', name: 'Açúcar', quantity: 50, unit: 'g' },
                    { id: 'ing-cn-14', name: 'Farinha de Trigo', quantity: 30, unit: 'g' },
                ],
                steps: ['Derreter o chocolate com a manteiga.', 'Bater os ovos com o açúcar.', 'Incorporar a mistura de chocolate e, por último, a farinha.', 'Assar em forno pré-aquecido a 200°C por cerca de 8 minutos.', 'Servir imediatamente com uma bola de sorvete de creme.']
            },
            {
                id: 'ft-cn-4',
                title: 'Caldo de Carne Caseiro',
                subcategory: 'Produção',
                imageUrl: '',
                ingredients: [
                    { id: 'ing-cn-15', name: 'Ossos de boi', quantity: 1, unit: 'kg' },
                    { id: 'ing-cn-16', name: 'Cenoura', quantity: 200, unit: 'g' },
                    { id: 'ing-cn-17', name: 'Cebola', quantity: 200, unit: 'g' },
                    { id: 'ing-cn-18', name: 'Salsão', quantity: 100, unit: 'g' },
                    { id: 'ing-cn-19', name: 'Água', quantity: 4, unit: 'L' },
                ],
                steps: [
                    'Dourar os ossos no forno a 200°C por 30 minutos.',
                    'Em uma panela grande, colocar os ossos dourados e os vegetais grosseiramente picados.',
                    'Cobrir com a água e levar à fervura.',
                    'Reduzir o fogo e cozinhar lentamente por 4 a 6 horas, removendo a espuma da superfície.',
                    'Coar o caldo e resfriar.',
                ]
            }
        ],
        shoppingList: [
            { id: 'sl-cn-1', name: 'Filé Mignon', quantity: '3 kg', acquired: false },
            { id: 'sl-cn-2', name: 'Vinho Madeira', quantity: '1 garrafa', acquired: false },
            { id: 'sl-cn-3', name: 'Arroz Arbóreo', quantity: '2 kg', acquired: false },
            { id: 'sl-cn-4', name: 'Chocolate Meio Amargo', quantity: '1 kg', acquired: false },
            { id: 'sl-cn-5', name: 'Tapioca Granulada', quantity: '1 kg', acquired: false },
            { id: 'sl-cn-6', name: 'Queijo Coalho', quantity: '1 kg', acquired: false },
        ],
        checklist: [
            { id: 'ccl-cn-1', text: 'Verificar aquecimento dos pratos de serviço', completed: false },
            { id: 'ccl-cn-2', text: 'Revisar mise en place para o serviço noturno', completed: true },
            { id: 'ccl-cn-3', text: 'Iniciar limpeza final da cozinha (chão e bancadas)', completed: false },
            { id: 'ccl-cn-4', text: 'Desligar equipamentos (chapa, fritadeira, fornos) ao final do expediente', completed: false },
        ]
    },
    [Category.ATENDIMENTO]: { 
        fichas: [], 
        shoppingList: [
            { id: 'sl-at-1', name: 'Guardanapos de tecido', quantity: '50 unidades', acquired: false },
            { id: 'sl-at-2', name: 'Canetas', quantity: '1 caixa', acquired: false },
            { id: 'sl-at-3', name: 'Blocos de comanda', quantity: '10 blocos', acquired: true },
            { id: 'sl-at-4', name: 'Velas para mesa', quantity: '20 unidades', acquired: false },
            { id: 'sl-at-5', name: 'Azeite para mesa', quantity: '2 garrafas', acquired: false },
        ], 
        checklist: [
            { id: 'ccl-at-1', text: 'Verificar e confirmar reservas do dia', completed: false },
            { id: 'ccl-at-2', text: 'Montar as mesas (pratos, talheres, copos)', completed: true },
            { id: 'ccl-at-3', text: 'Polir talheres e copos', completed: false },
            { id: 'ccl-at-4', text: 'Verificar limpeza do salão e banheiros', completed: false },
            { id: 'ccl-at-5', text: 'Estudar o cardápio e especiais do dia', completed: false },
            { id: 'ccl-at-6', text: 'Conferir uniformes da equipe', completed: false },
        ] 
    },
    [Category.LIMPEZA]: { fichas: [], shoppingList: [], checklist: [] },
    [Category.CAIXA]: {
        fichas: [],
        shoppingList: [
            { id: 'sl-cx-1', name: 'Bobinas para impressora fiscal', quantity: '1 caixa', acquired: false },
            { id: 'sl-cx-2', name: 'Bobinas para máquina de cartão', quantity: '1 caixa', acquired: false },
            { id: 'sl-cx-3', name: 'Envelopes para depósito', quantity: '50 unidades', acquired: false },
            { id: 'sl-cx-4', name: 'Clipes de papel', quantity: '1 caixa', acquired: false },
        ],
        checklist: [
            { id: 'ccl-cx-1', text: 'Verificar fundo de troco inicial', completed: false },
            { id: 'ccl-cx-2', text: 'Logar no sistema de vendas (PDV)', completed: false },
            { id: 'ccl-cx-3', text: 'Testar máquinas de cartão', completed: true },
            { id: 'ccl-cx-4', text: 'Organizar balcão e materiais', completed: false },
            { id: 'ccl-cx-5', text: 'Imprimir relatório X (leitura X)', completed: false },
            { id: 'ccl-cx-6', text: 'Conferir e sangrar valores do caixa', completed: false },
            { id: 'ccl-cx-7', text: 'Imprimir relatório Z (fechamento cego)', completed: false },
        ]
    },
    [Category.GERENTE]: {
        fichas: [],
        shoppingList: [
            { id: 'sl-ge-1', name: 'Bobinas para máquina de cartão', quantity: '1 caixa', acquired: false },
            { id: 'sl-ge-2', name: 'Material de escritório (canetas, papel A4)', quantity: '1 kit', acquired: false },
            { id: 'sl-ge-3', name: 'Produtos de limpeza para banheiros (estoque)', quantity: '1 caixa', acquired: false },
        ],
        checklist: [
            { id: 'ccl-ge-1', text: 'Realizar fechamento do caixa do dia anterior', completed: false },
            { id: 'ccl-ge-2', text: 'Verificar escala de funcionários para a semana', completed: false },
            { id: 'ccl-ge-3', text: 'Analisar relatório de vendas', completed: true },
            { id: 'ccl-ge-4', text: 'Conferir estoque de bebidas de alto giro', completed: false },
            { id: 'ccl-ge-5', text: 'Realizar reunião diária com a equipe (briefing)', completed: false },
            { id: 'ccl-ge-6', text: 'Verificar feedback de clientes (redes sociais, avaliações)', completed: false },
        ]
    },
};