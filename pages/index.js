import TeamForm from '@/components/TeamForm/TeamForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 px-4 md:px-12 bg-gradient-to-br from-blue-900 to-blue-700">
      <h1 className='text-center text-gray-50 mb-4'>Welcome to Keep Score</h1>
      <div className='bg-gray-600 max-w-xl w-full rounded-lg p-6 shadow-xl'>
        <TeamForm/>
      </div>
    </main>
  )
}
