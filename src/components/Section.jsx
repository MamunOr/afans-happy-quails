export default function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-green-900">{title}</h2>
      {children}
    </section>
  );
}
