import Stepper from './components/stepper'

export default function Home() {
  return (
    <div className="container mx-auto px-4">

      <div className="flex justify-center pt-8">
        <h1 className="text-5xl font-bold">AI Cover Letter Generator</h1>
      </div>

      <Stepper />
    </div>
  )
}
