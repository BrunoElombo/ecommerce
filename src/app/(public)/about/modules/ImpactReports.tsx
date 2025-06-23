const reports = [
    {
      title: 'Community Impact Report 2024',
      summary:
        'An overview of Nike’s efforts to empower communities through sports, education, and sustainability.',
      link: '#',
    },
    {
      title: 'Sustainability Report',
      summary:
        'Nike’s progress on reducing carbon footprint, waste, and water usage in manufacturing.',
      link: '#',
    },
  ];
  
  export default function ImpactReports() {
    return (
      <section className="bg-gray-50 py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Impact Reports</h2>
        <div className="space-y-12">
          {reports.map(({ title, summary, link }) => (
            <div key={title} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-gray-700 mb-6">{summary}</p>
              <a
                href={link}
                className="text-nike-blue font-semibold hover:underline"
                aria-label={`Read full report: ${title}`}
              >
                Read Full Report →
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  }
  