const articles = [
    {
      title: "Nike's Breaking4",
      description:
        "A historic attempt to break the four-hour marathon barrier with innovation and determination.",
      image: '/images/breaking4.jpg', // Replace with your image path or URL
    },
    {
      title: 'Bill Bowerman: Nike’s Original Innovator',
      description:
        'Discover the legacy of Bill Bowerman, co-founder and the visionary behind Nike’s innovative designs.',
      image: '/images/bill-bowerman.jpg',
    },
    {
      title: 'Sustainability in Action',
      description:
        'Nike’s commitment to sustainability and reducing environmental impact through innovation.',
      image: '/images/sustainability.jpg',
    },
  ];
  
  export default function NewsroomHighlights() {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Newsroom Highlights</h2>
        <div className="grid gap-12 md:grid-cols-3">
          {articles.map(({ title, description, image }) => (
            <article key={title} className="flex flex-col bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 md:h-56 bg-gray-300 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-700 flex-grow">{description}</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-sm font-semibold text-nike-blue hover:underline"
                  aria-label={`Read more about ${title}`}
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
  