import Section from '../components/Section';

export default function Home() {
  return (
    <div className="p-6 sm:p-10 bg-green-50 min-h-screen">
      <Section title="Welcome to Afan's Happy Quails">
        <p className="text-green-900 max-w-3xl mb-8">
          Raising quails is a joyful and rewarding experience. Explore our
          dashboard to track your batches and tagged quails.
        </p>
      </Section>

      <Section title="Latest Blog Posts">
        <div className="space-y-6 max-w-3xl">
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Tips for Healthy Quail Hatchings
            </h3>
            <p>
              Maintaining proper incubator temperature and humidity is key to
              a good hatch rate.
            </p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              How to Tag Your Quails Effectively
            </h3>
            <p>
              Use brightly colored tags and record weights weekly for best
              tracking.
            </p>
          </article>
        </div>
      </Section>
    </div>
  );
}
