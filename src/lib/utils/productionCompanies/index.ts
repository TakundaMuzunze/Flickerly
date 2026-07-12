type ProductionCompany = {
	name: string;
};

export function getProductionCompany(companies: ProductionCompany[] | undefined) {
	if (!companies || companies.length === 0) {
		return 'N/A';
	}

	return companies.map((company) => company.name).join(', ');
}
