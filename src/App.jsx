import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  return (
    <div className='flex flex-col items-center h-full'>
      <div className='flex flex-row items-center justify-center h-full'>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-32" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="w-32" alt="React logo" />
        </a>
      </div>
      <h1 className="mt-4 text-xl font-bold">Intermediate File Structure Template</h1>
      <p className="mt-2 text-center text-ml">
        <a href="https://blog.webdevsimplified.com/2022-07/react-folder-structure/" target="_blank" rel="noopener noreferrer">
          https://blog.webdevsimplified.com/2022-07/react-folder-structure/
        </a>
      </p>
    </div>
  )
}

export default App
