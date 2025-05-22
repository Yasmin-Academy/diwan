import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='p-10 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Diwan</h1>
      <p className='mb-6'>Your hub for Arabic-English poetry and songs.</p>
      <Link to='/poems' className='px-6 py-2 bg-blue-600 text-white rounded'>Browse Poems</Link>
    </div>
  )
}