import { REPLFunction, addCommand } from "./REPLFunction"; // Adjust the import path as necessary.
import {
  realEstateListingsCsv,
  realEstateAgentsCsv,
  realEstateSalesCsv,
  csvFilePaths,
  searchMockedData,
} from "./mockedJson"; // Adjust the import path as necessary.

let currentCsv: string[][] = [];

export const loadCsv: REPLFunction = (args) => {
  const filePath = args[0];
  switch (filePath) {
    case csvFilePaths.listings:
      currentCsv = realEstateListingsCsv;
      return "Listings CSV loaded!";
    case csvFilePaths.agents:
      currentCsv = realEstateAgentsCsv;
      return "Agents CSV loaded!";
    case csvFilePaths.sales:
      currentCsv = realEstateSalesCsv;
      return "Sales CSV loaded!";
    default:
      return "CSV file path not recognized.";
  }
};

export const viewCsv: REPLFunction = () => JSON.stringify(currentCsv);

export const searchCsv: REPLFunction = (args) => {
  const query = args.join(" ");
  return JSON.stringify(searchMockedData(query, currentCsv));
};
