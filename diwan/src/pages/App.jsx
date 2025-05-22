import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

export default function PoetryApp() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const context = import.meta.glob('../poems/*.md', { as: 'raw' });
    Promise.all(
      Object.entries(context).map(async ([path, loader]) => {
        const content = await loader();
        const lines = content.split('\n');
        return {
          title: lines[0].replace('# ', ''),
          arabic: lines[1] || '',
          english: lines[2] || '',
          type: lines[3]?.toLowerCase().includes('song') ? 'song' : 'poetry',
        };
      })
    ).then(setPoems);
  }, []);

  const filteredPoems = poems.filter((poem) => {
    const query = search.toLowerCase();
    return (
      (tab === 'all' || poem.type === tab) &&
      (poem.title.toLowerCase().includes(query) ||
        poem.arabic.includes(query) ||
        poem.english.toLowerCase().includes(query))
    );
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Diwan</h1>
      <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4" />

      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList className="flex justify-center gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="poetry">Poetry</TabsTrigger>
          <TabsTrigger value="song">Songs</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4">
        {filteredPoems.map((poem, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{poem.title}</h2>
              <p className="text-right text-lg text-gray-800">{poem.arabic}</p>
              <p className="text-left text-gray-600 italic">{poem.english}</p>
            </CardContent>
          </Card>
        ))}
        {filteredPoems.length === 0 && <p className="text-center text-gray-500">No results found.</p>}
      </div>
    </div>
  );
}
