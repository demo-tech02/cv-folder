import React from 'react';

interface TestimonialProps {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  imageUrl: string;
  linkedInUrl?: string;
  isDarkMode?: boolean;
}

const Testimonial: React.FC<TestimonialProps & { showTwitter?: boolean; isDarkMode?: boolean }> = ({
  name,
  position,
  company,
  testimonial,
  imageUrl,
  linkedInUrl,
  showTwitter,
  isDarkMode = false,
}) => (
  <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
    <div className="flex items-center mb-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />
      <div>
        <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{name}</h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {position} at {company}
        </p>
      </div>
      <div className="ml-auto flex space-x-2">
        {showTwitter ? (
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
            aria-label="Twitter"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64.9c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.9 3.55 4.3-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 010 19.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.92 12.9-12.92 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" />
            </svg>
          </a>
        ) : (
          linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )
        )}
      </div>
    </div>
    <blockquote className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial}"</blockquote>
  </div>
);

interface SocialProofSectionProps {
  content: any;
  isDarkMode: boolean;
}

const SocialProofSection: React.FC<SocialProofSectionProps> = ({ content, isDarkMode }) => {
  const testimonials = [
    {
      name: "Sarah Al-Mahmoud",
      position: "HR Director",
      company: "ARAMCO",
      testimonial: "The quality of CVs we receive from this platform is exceptional. Clear formatting and ATS-friendly structure makes our screening process much more efficient.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      linkedInUrl: "https://linkedin.com/in/sarah-al-mahmoud"
    },
    {
      name: "Ahmed Hassan",
      position: "Talent Acquisition Manager",
      company: "Tech ",
      testimonial: "Finally found a service that understands the Saudi job market! The LinkedIn profiles they optimize consistently perform better in our searches.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face  ",
      linkedInUrl: "https://linkedin.com/in/ahmed-hassan"
    },
    {
      name: "Fatima Al-Zahra",
      position: "Recruiter",
      company: "STC",
      testimonial: "I've been recommending this platform to all job seekers. The attention to detail and understanding of what employers look for is remarkable.",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      linkedInUrl: "https://linkedin.com/in/fatima-al-zahra"
    },
    
  ];

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {content.title}
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Trusted by top companies and professionals across Saudi Arabia
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              {...testimonial}
              showTwitter={index === 1}
              linkedInUrl={index === 1 ? undefined : testimonial.linkedInUrl}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
