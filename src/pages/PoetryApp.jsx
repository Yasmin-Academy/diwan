import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PoetryApp() {
  const [poems, setPoems] = useState([])

  useEffect(() => {
    const context = import.meta.glob('../../public/poems/*.md', { as: 'raw' })
    Promise.all(
      Object.entries(context).map(async ([path, loader]) => {
        const content = await loader()
        const slug = path.split('/').pop().replace('.md', '')
        const lines = content.split('\n')
        return {
          title: lines[0].replace('# ', ''),
          arabic: lines[1],
          english: lines[2],
          type: lines[3],
          slug
        }
      })
    ).then(setPoems)
  }, [])

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>All Poems</h1>
      <div className='space-y-4'>
        {poems.map((poem, idx) => (
          <div key={idx} className='border p-4 rounded shadow-sm'>
            <Link to={`/poem/${poem.slug}`} className='text-xl text-blue-600 font-semibold'>{poem.title}</Link>
            <p className='text-right'>{poem.arabic}</p>
            <p className='italic text-gray-600'>{poem.english}</p>
          </div>
        ))}
      </div>
    </div>
  )
}