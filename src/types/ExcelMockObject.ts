import { OfficeMockObject } from "office-addin-mock";
import ExcelMockData from "./ExcelMockData";

type ExcelMockObject = OfficeMockObject & {
  context: ExcelMockData["context"];
};

export default ExcelMockObject;
