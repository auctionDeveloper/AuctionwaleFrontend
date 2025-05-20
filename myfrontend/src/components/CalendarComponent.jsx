import { DateRange } from "react-date-range";

export default function CalendarComponent({ dateRange, setDateRange, setStartDate, setEndDate }) {
  return (
    <div className="bg-white p-3 shadow-lg border rounded-md z-50">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          setDateRange([item.selection]);
          setStartDate(item.selection.startDate.toISOString());
          setEndDate(item.selection.endDate.toISOString());
        }}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
      />
    </div>
  );
}
