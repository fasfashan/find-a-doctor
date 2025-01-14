export default function ScheduleTable({ schedule }) {
  return (
    <table className="w-full text-left border-collapse mt-4">
      <thead>
        <tr>
          <th className="border px-4 py-2 bg-primary text-white">Day</th>
          <th className="border px-4 py-2 bg-primary text-white">Time</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(schedule).map(([day, time], index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
          >
            <td className="border px-4 py-2">{day}</td>
            <td className="border px-4 py-2">{time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
