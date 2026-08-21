// Configuração central da LuHao Automotive.
// Todos os dados institucionais, de contato e de produtos vivem aqui
// para evitar duplicação espalhada pelos componentes e páginas.

export const site = {
	name: 'LuHao Automotive',
	shortName: 'LuHao',
	domain: 'luhao-automotive.com.br',
	url: 'https://luhao-automotive.com.br',
	locale: 'pt-BR',
	description:
		'A LuHao Automotive estrutura geração de demanda, qualificação e inteligência para concessionárias e empresas do setor automotivo — da assinatura de veículos ao 0 km, seminovos e pós-venda.',
	tagline: 'Marketing automotivo feito para gerar oportunidades comerciais.',
} as const;

export const contact = {
	whatsapp: {
		display: '+55 11 98819-0969',
		e164: '5511988190969',
	},
	email: 'contato@luhao.com.br',
} as const;

export function whatsappLink(message?: string): string {
	const base = `https://wa.me/${contact.whatsapp.e164}`;
	if (!message) return base;
	return `${base}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject?: string): string {
	const base = `mailto:${contact.email}`;
	if (!subject) return base;
	return `${base}?subject=${encodeURIComponent(subject)}`;
}

export const analytics = {
	/** Apollo Website Visitor Tracking — identifica empresas que visitam o site. */
	apolloAppId: '6a85e49ee3a4fd000cea9293',
} as const;

export const social = {
	instagram: '',
	linkedin: '',
} as const;

export type ProductSlug = 'drive' | 'demand' | 'service' | 'qualification' | 'intelligence';

export interface Product {
	slug: ProductSlug;
	name: string;
	shortLabel: string;
	tagline: string;
	description: string;
	cardDescription: string;
	cta: string;
	heroTitle: string;
	heroSubheadline: string;
	whatsappMessage: string;
}

export const products: Record<ProductSlug, Product> = {
	drive: {
		slug: 'drive',
		name: 'LuHao Drive',
		shortLabel: 'Drive',
		tagline: 'Leads para Assinatura de Veículos',
		description:
			'Geração de leads qualificados para assinatura de veículos, com jornadas distintas para Pessoa Física e Pessoa Jurídica.',
		cardDescription:
			'Campanhas, páginas e jornadas específicas para gerar leads qualificados para programas de assinatura.',
		cta: 'Quero gerar leads para assinatura',
		heroTitle: 'Geração de leads para Assinatura de Veículos',
		heroSubheadline:
			'Uma operação especializada para concessionárias e grupos automotivos que precisam gerar e qualificar demanda para programas de assinatura — PF e PJ.',
		whatsappMessage: 'Olá! Quero saber mais sobre o LuHao Drive, para geração de leads de assinatura de veículos.',
	},
	demand: {
		slug: 'demand',
		name: 'LuHao Demand',
		shortLabel: 'Demand',
		tagline: 'Demanda para vendas',
		description:
			'Geração de demanda e leads para aquisição de veículos 0 km, seminovos, usados, peças e acessórios.',
		cardDescription:
			'Geração de oportunidades para veículos 0 km, seminovos, usados, peças e acessórios.',
		cta: 'Quero gerar demanda para vendas',
		heroTitle: 'Geração de demanda para quem precisa vender veículos.',
		heroSubheadline:
			'Transforme estoque, ofertas e objetivos comerciais em demanda qualificada para 0 km, seminovos, usados, peças e acessórios.',
		whatsappMessage: 'Olá! Quero saber mais sobre o LuHao Demand, para geração de demanda de vendas.',
	},
	service: {
		slug: 'service',
		name: 'LuHao Service',
		shortLabel: 'Service',
		tagline: 'Demanda para pós-venda',
		description: 'Geração de demanda e agendamentos para serviços automotivos e pós-venda.',
		cardDescription:
			'Campanhas orientadas a novos agendamentos para manutenção, revisão, oficina e funilaria.',
		cta: 'Quero gerar mais agendamentos',
		heroTitle: 'Mais demanda para sua operação de serviços automotivos.',
		heroSubheadline:
			'Transforme capacidade de atendimento em novos agendamentos e oportunidades de pós-venda.',
		whatsappMessage: 'Olá! Quero saber mais sobre o LuHao Service, para geração de agendamentos de pós-venda.',
	},
	qualification: {
		slug: 'qualification',
		name: 'LuHao Qualification',
		shortLabel: 'Qualification',
		tagline: 'Qualificação de leads',
		description:
			'Qualificação automatizada de leads via WhatsApp e Instagram Direct, transversal a Drive, Demand e Service.',
		cardDescription:
			'Automação de atendimento inicial para transformar contatos em oportunidades mais preparadas para o comercial.',
		cta: 'Quero qualificar meus leads',
		heroTitle: 'Nem todo lead deve chegar igual ao vendedor.',
		heroSubheadline:
			'Automação de qualificação via WhatsApp e Instagram Direct para reduzir contatos sem contexto e entregar oportunidades mais preparadas ao comercial.',
		whatsappMessage: 'Olá! Quero saber mais sobre o LuHao Qualification, para qualificação automatizada de leads.',
	},
	intelligence: {
		slug: 'intelligence',
		name: 'LuHao Intelligence',
		shortLabel: 'Intelligence',
		tagline: 'Dados para decisões',
		description:
			'Inteligência de marketing e vendas que conecta investimento, campanha, lead, qualificação e resultado comercial.',
		cardDescription:
			'Acompanhamento da jornada entre investimento, leads, qualificação e resultado comercial.',
		cta: 'Quero entender meus resultados',
		heroTitle: 'Do investimento ao resultado comercial.',
		heroSubheadline:
			'Acompanhe origem, custo, qualidade e conversão das oportunidades geradas pela operação de marketing.',
		whatsappMessage: 'Olá! Quero saber mais sobre o LuHao Intelligence, para inteligência de marketing e vendas.',
	},
};

export const productList: Product[] = Object.values(products);

export const mainNav = [
	{ label: 'Produtos', href: '/produtos' },
	{ label: 'Cases', href: '/cases' },
	{ label: 'Insights', href: '/insights' },
	{ label: 'Sobre', href: '/sobre' },
];

export const primaryCta = { label: 'Fale com a LuHao', href: '/contato' };

export const savolCase = {
	slug: 'savol-sign-drive',
	title: 'Savol + VW Sign&Drive',
	client: 'Savol',
	program: 'VW Sign&Drive',
	location: 'Santo André, SP',
	period: '5 meses de operação',
	summary:
		'Programa de assinatura de veículos operado com o método LuHao Drive, especializado em geração e qualificação de demanda para assinatura.',
	metrics: [
		{ label: 'Leads gerados', value: '560' },
		{ label: 'CPL (custo por lead)', value: 'R$ 17,14' },
		{ label: 'Taxa de conversão', value: '18,1%' },
	],
	headline: 'Um método criado para assinatura. Validado na prática.',
};
