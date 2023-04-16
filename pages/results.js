import Results from '@/components/Results/Results';

export default function Vote() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 px-4 md:px-12 bg-gradient-to-br from-blue-900 to-blue-700">
      <h1 className='text-center text-gray-50 mb-4'>What&apos;s the Tally?</h1>
      <div className='bg-gray-600 max-w-xl w-full rounded-lg p-6'>
        <Results/>
      </div>
    </main>
  )
}