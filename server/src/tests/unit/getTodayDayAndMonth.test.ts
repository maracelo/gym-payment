import getTodayDayAndMonth from "../../helpers/getTodayDayAndMonth";

it('it should test today day and month with ISOString', () =>{
  const {day, month} = getTodayDayAndMonth();
  const date = new Date();
  const convertedDate = date.toISOString();
  const testDay = parseInt(convertedDate.slice(8,10));
  const testMonth = parseInt(convertedDate.slice(5,7));

  expect(day).toBe(testDay);
  expect(month).toBe(testMonth);
});