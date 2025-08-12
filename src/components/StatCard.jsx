export default function StatCard({ icon, title, value, unit, color }) {
  return (
    <div className={`rounded-lg p-5 shadow-md text-white ${color}`}>
      <div className="flex items-center gap-3 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">
        {value} {unit || ''}
      </p>
    </div>
  );
}
