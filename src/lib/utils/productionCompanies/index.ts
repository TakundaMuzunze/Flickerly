export function getProductionCompany(companies: any[] | undefined) {
	if (!companies || companies.length === 0) {
		return 'N/A';
	}

	return companies.map((company) => company.name).join(', ');
}
