import { formatDate } from "../../utils/date";

describe("formatDate Utility Function", () => {
  it("formats date correctly", () => {
    const inputDate = "2022-01-15T14:30:00Z";
    const formattedDate = formatDate(inputDate);

    expect(formattedDate).toBe("15.01.2022. 15:30");
  });

  it("pads single-digit day and month with zero", () => {
    const inputDate = "2022-05-07T09:15:00Z";
    const formattedDate = formatDate(inputDate);

    expect(formattedDate).toBe("07.05.2022. 11:15");
  });

  it("handles hours and minutes correctly", () => {
    const inputDate = "2022-12-31T03:05:00Z";
    const formattedDate = formatDate(inputDate);

    expect(formattedDate).toBe("31.12.2022. 04:05");
  });
});
