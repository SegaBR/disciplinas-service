--Table
create table disciplinas (
	id serial not null primary key, 
	nome varchar(50) not null,
	descricao varchar(1000),
	curso varchar(100) not null,
	cargahoraria numeric(10,2) not null,
	status varchar(1) not null	-- E eletiva R requisito
);

--Registros
insert into disciplinas (nome, descricao, curso, cargahoraria, status) 
			  values ('Serviços Web', 'Estudo das Arquiteturas de Serviços Web, Contextualização e Suas Aplicabilidades.
										Detalhamento das Arquiteturas de Serviços Web e Seus Protocolos. Compreensão das Formas de
										Registro e Busca de Serviços Web. Estudo e Experimentação das Tecnologias para
										Desenvolvimento. Uso e Aplicação de Serviços Web Através das Tecnologias de Programação
										Vigentes.', 
					  'Ciência da Computação', 135, 'R'),
			         ('Engenharia de Software', 'Introdução aos paradigmas da engenharia de software e características de software. Análise
													de estratégias e técnicas de teste de software. Estudo das aplicações do gerenciamento de software.
													Estudo de aplicações da gestão de projetos de software. Compreensão dos processos de gestão de
													qualidade. Definições de engenharia de software avançada.',
					  'Ciência da Computação', 260, 'R');