import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Content } from '../types';

interface SocialProofSectionProps {
  content: Content['socialProof'];
  isDarkMode: boolean;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  content,
  isDarkMode
}) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.posts.map((post, index) => (
            <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{post.author}</h4>
                  <p className="text-sm opacity-80">{post.role}</p>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
              </div>
              <p className="opacity-90 mb-4">{post.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-60">{post.platform}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current opacity-60" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};