import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PoemPage() {
  const { slug } = useParams();
  const [poem, setPoem] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`/poems/${slug}.md`)
      .then(res => res.text())
      .then(text => {
        const [title, arabic, english, type] = text.split('\n');
        setPoem({ title: title.replace('# ', ''), arabic, english, type });
        setLiked(localStorage.getItem(slug) === 'liked');
      });
  }, [slug]);

  const toggleLike = () => {
    const newState = !liked;
    setLiked(newState);
    localStorage.setItem(slug, newState ? 'liked' : '');
  };

  if (!poem) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">{poem.title}</h2>
      <p className="text-right text-lg mb-2">{poem.arabic}</p>
      <p className="text-left italic mb-4 text-gray-600">{poem.english}</p>
      <button onClick={toggleLike} className={\`px-4 py-2 rounded \${liked ? 'bg-red-500' : 'bg-gray-400'} text-white\`}>
        {liked ? '♥ Liked' : '♡ Like'}
      </button>
    </div>
  );
}
