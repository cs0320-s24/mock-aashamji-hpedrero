export const realEstateListingsCsv = [
  ["ID", "Address", "Price", "Bedrooms", "Bathrooms", "SquareFeet"],
  ["1", "123 Maple Street", "350000", "3", "2", "2000"],
  ["2", "456 Oak Avenue", "450000", "4", "3", "2500"],
  ["3", "789 Pine Lane", "550000", "5", "4", "3000"],
];

export const realEstateAgentsCsv = [
  ["AgentID", "Name", "Email", "PhoneNumber"],
  ["1", "Alice Johnson", "alice@example.com", "555-0100"],
  ["2", "Bob Smith", "bob@example.com", "555-0101"],
  ["3", "Charlie Davis", "charlie@example.com", "555-0102"],
];

export const realEstateSalesCsv = [
  ["SaleID", "AgentID", "ListingID", "SalePrice", "SaleDate"],
  ["1", "1", "2", "440000", "2021-04-15"],
  ["2", "2", "3", "560000", "2021-05-20"],
  ["3", "3", "1", "340000", "2021-06-10"],
];

export const csvFilePaths = {
  listings: "/path/to/realEstateListings.csv",
  agents: "/path/to/realEstateAgents.csv",
  sales: "/path/to/realEstateSales.csv",
};

export function searchMockedData(query: string, data: any) {
  let results: string[][] = [];
  const queryLower = query.toLowerCase();

  if (
    data[0].some((header: string) => header.toLowerCase().includes(queryLower))
  ) {
    results.push(data[0]);
  }

  for (let i = 1; i < data.length; i++) {
    if (
      data[i].some((cell: string) => cell.toLowerCase().includes(queryLower))
    ) {
      results.push(data[i]);
    }
  }

  return results;
}
