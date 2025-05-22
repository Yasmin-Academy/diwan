import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-8 text-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Diwan</h1>
      <p className="text-lg">Explore Arabic-English poetry and songs.</p>
      <div className="space-x-4">
        <Link to="/poems" className="px-4 py-2 bg-blue-500 text-white rounded">Browse All</Link>
        <Link to="/poem/love-in-evening" className="px-4 py-2 bg-gray-700 text-white rounded">Sample Poem</Link>
      </div>
    </div>
  );
}
