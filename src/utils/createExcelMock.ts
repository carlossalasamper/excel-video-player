import ExcelMockData from "@/types/ExcelMockData";
import ExcelMockObject from "@/types/ExcelMockObject";
import { OfficeMockObject } from "office-addin-mock";

export default function createExcelMock(
  mockData: ExcelMockData
): ExcelMockObject {
  return new OfficeMockObject(mockData) as unknown as ExcelMockObject;
}
