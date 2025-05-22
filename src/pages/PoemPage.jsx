import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function PoemPage() {
  const { slug } = useParams()
  const [poem, setPoem] = useState(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    fetch(`/poems/${slug}.md`)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n')
        setPoem({
          title: lines[0].replace('# ', ''),
          arabic: lines[1],
          english: lines[2],
          type: lines[3]
        })
        setLiked(localStorage.getItem(slug) === 'liked')
      })
  }, [slug])

  const toggleLike = () => {
    setLiked(!liked)
    localStorage.setItem(slug, !liked ? 'liked' : '')
  }

  if (!poem) return <p className='p-6'>Loading...</p>

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h2 className='text-3xl font-semibold mb-4'>{poem.title}</h2>
      <p className='text-right text-lg'>{poem.arabic}</p>
      <p className='italic text-gray-600 mb-4'>{poem.english}</p>
      <button onClick={toggleLike} className={`px-4 py-2 rounded text-white ${liked ? 'bg-red-500' : 'bg-gray-600'}`}>
        {liked ? '♥ Liked' : '♡ Like'}
      </button>
    </div>
  )
}