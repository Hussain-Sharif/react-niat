
import { ArrowBigDown } from 'lucide-react'
import './App.css'
import { Button } from './components/ui/button'
import data from './utils/data.json'

function App() {

  return (
    <>
    {data.dishes.length}
    <Button>hi</Button>
    </>
  )
}

export default App
