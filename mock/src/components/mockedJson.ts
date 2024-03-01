export const mockedCsvData = [
  ["ID", "Name", "Occupation", "Age"],
  ["1", "John Doe", "Software Engineer", "30"],
  ["2", "Jane Smith", "Data Scientist", "28"],
  ["3", "Alice Johnson", "Product Manager", "35"],
  ["4", "Bob Brown", "Graphic Designer", "26"],
  ["5", "Charlie Davis", "Marketing Specialist", "32"],
];

export const searchResultsByName = {
  John: [["1", "John Doe", "Software Engineer", "30"]],
  Alice: [["3", "Alice Johnson", "Product Manager", "35"]],
};

export const searchResultsByOccupation = {
  Engineer: [["1", "John Doe", "Software Engineer", "30"]],
  Designer: [["4", "Bob Brown", "Graphic Designer", "26"]],
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
