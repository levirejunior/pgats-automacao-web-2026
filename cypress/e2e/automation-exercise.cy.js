const cadastro = require('../modules/cadastro')
const home = require('../modules/home')
const carrinho = require('../modules/carrinho')
const produtos = require('../modules/produtos')
const produto = require('../modules/produto')
const login = require('../modules/login')
const logout = require('../modules/logout')

describe('Automation Exercise', () => {
     it('1 - Cadastrar um novo usuário com sucesso', () => {
        cy.visit('/')
        cadastro.iniciarCadastro('PGATS Aut',`pgats-aut-test${Date.now()}@mail.com`)
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    });

    it('2 - Efetuar login de Usuário com email e senha corretos', () => {
        cy.visit('/')
        login.preencherLogin('pgats-aut-test1795128153770@mail.com', '12345')
        login.verificarSeLoginEfetuadoComSucesso()
    });

    it('3 - Efetuar login de Usuário com email e senha incorretos', () => {
        cy.visit('/')
        login.preencherLogin('pgats-aut-test-1987@mail.com','123456')
        login.verificarSeMensagemDeErroFoiExibidaNoLogin()
    });

    it('4 - Efetuar logout', () => {
        cy.visit('/')
        login.preencherLogin('pgats-aut-test1795128153770@mail.com', '12345')
        logout.efetuarLogout()
        logout.verificarSeOUsuarioFoiDeslogado()
    });

    it('5 - Tentar cadastrar um usuário com um email já cadastrado', () => {
        cy.visit('/')
        cadastro.iniciarCadastro('PGATS Aut', 'pgats-aut-test1795128153770@mail.com')
        cadastro.verificarSeMensagemDeCasdastroExistenteFoiExibida()
    });

    it('8 - Verifique todos os produtos e a página de detalhes do produto', () => {
        cy.visit('/')
        home.verificarSeAcessouAHomePageComSucesso()   
        home.acessaPaginaDeProdutos()
        produtos.verificaSeExibiuAListaDeProdutos()        
        produtos.acessarPrimeiroProdutoDaLista()
        produto.verificaSeDadosDoProdutoEstaoVisiveis()
    });

    it('9 - Buscar produto', () => {
        cy.visit('/')
        home.verificarSeAcessouAHomePageComSucesso()
        home.acessaPaginaDeProdutos()
        produtos.verificaSeAcessouAPáginaDeProdutosComSucesso()
        produtos.buscarPorUmTermo('Tshirt')
        // Regex aceitando variações comuns (ex: "Tshirt", "T-Shirt", "T Shirt", "Shirt", "Top")
        const variacoesAceitas = /t-?\s?shirt|shirt|top/i;
        produtos.verificaSeOTextoSearchedProductsEstaVisivel()
        //Verica se todos os produtos relacionados ao termo buscado são exibidos e garante que existe pelo menos 1 produto retornado
        cy.get('.features_items .product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .each(($el) => {
            // Verifica se cada card de produto está visível na tela
            cy.wrap($el).should('be.visible');

            // Captura o nome do produto dentro do card e valida contra a Regex (case-insensitive)
            cy.wrap($el)
            .find('.productinfo p')
            .invoke('text')
            .then((nomeProduto) => {
                expect(nomeProduto.trim()).to.match(variacoesAceitas);
            })
        })
    });

    it('10 - Verificar assinatura de novidades na página inicial', () => {
        const emailTeste = `pgats-aut-test${Date.now()}@mail.com`
        cy.visit('/')
        home.verificarSeAcessouAHomePageComSucesso()
        home.scrollAteRodapeDaPagina()
        home.verificaSeSubscriptionEstaVisivel()
        home.realizarCadastroDeSubscription(emailTeste)
        home.verificaSeCadastroOcorreuComSucesso()

    });

    it('15 - Fazer pedido: Cadastre-se antes de finalizar a compra e excluir a conta', () => {
        const usuario = {
            nome: 'PGATS Aut',
            email: `pgats-aut-test${Date.now()}@mail.com`,
            senha: '12345',
            primeiroNome: 'PGATS',
            sobrenome: 'Aut',
            empresa: 'PGATS',
            endereco: 'Example Address',
            pais: 'United States',
            estado: 'California',
            cidade: 'Los Angeles',
            cep: '90001',
            celular: '11999999999'
        }
        cy.visit('/')
        home.verificarSeAcessouAHomePageComSucesso()
        cadastro.iniciarCadastro(usuario.nome,usuario.email)
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
        home.verificarSeNomeDoUsuarioExisteNoTopoDaHome(usuario.nome)
        home.adicionarPrimeiroProdutoDaHomeNoCarrinho()
        carrinho.acessarCarrinho()
        carrinho.verificaSeaAPaginaDoCarrinhoEstaVisivel()
        carrinho.avancarParaCheckout()
        carrinho.verificaDetalhesDoEnderecoERevisaoDoPedido(usuario.endereco)
        carrinho.adicionarDescricaoEAvancaParaPagamento('Por favor, entregar em horário comercial.')
        carrinho.adicionarCartaoDeCredito(usuario.nome,'4100000000000000','123','12','2029')
        carrinho.finalizarPedido()
        carrinho.verificaMensagemDeSucessoAoFinalizarPedido()
        home.acessarPaginaDeRemoverConta()
        home.removeEVerificaSeContaFoiRemovidaComSucesso()
    });

    it('16 - Fazer pedido: Deve fazer login, realizar um pedido e excluir a conta', () => {
        const usuario = {
            nome: 'PGATS Aut',
            email: `pgats-aut-test${Date.now()}@mail.com`,
            senha: '12345',
            endereco: 'Example Address'
        }
        cy.visit('/')
        cadastro.iniciarCadastro(usuario.nome, usuario.email)
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
        logout.efetuarLogout()
        login.preencherLoginAposLogout(usuario.email, usuario.senha)
        home.verificarSeNomeDoUsuarioExisteNoTopoDaHome(usuario.nome)
        home.adicionarPrimeiroProdutoDaHomeNoCarrinho()
        carrinho.acessarCarrinho()
        carrinho.verificaSeaAPaginaDoCarrinhoEstaVisivel()
        carrinho.avancarParaCheckout()
        carrinho.verificaDetalhesDoEnderecoERevisaoDoPedido(usuario.endereco)
        carrinho.adicionarDescricaoEAvancaParaPagamento('Pedido realizado após login.')
        carrinho.adicionarCartaoDeCredito(usuario.nome,'4100000000000000','123','12','2029')
        carrinho.finalizarPedido()
        carrinho.verificaMensagemDeSucessoAoFinalizarPedido()
        home.acessarPaginaDeRemoverConta()
        home.removeEVerificaSeContaFoiRemovidaComSucesso()
    })
});