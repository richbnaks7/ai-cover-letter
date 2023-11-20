"use client"
import { useState } from 'react'
import UploadResume from './uploadResume'

function Prev(currentStep) {
    if (currentStep.currentStep > 0) {
        return <button className='btn btn-outline btn-primary'>Prev</button>
    } else {
        return null;
    }
}

export default function Stepper() {

    const [currentStep, setCurrentStep] = useState(0);
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);

    const steps = {
        0: 'Upload Resume',
        1: 'Job Description',
        2: 'Your Cover Letter',
    }

    const resumeData = (data) => {
        setResume(data);
        setCurrentStep(1)
    }

    const generateCoverLetter = () => {
        console.log('post')
        fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resume, jobDescription }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setCoverLetter(data);
                setCurrentStep(2)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div>
            <div className="flex flex-col justify-center pt-8">
                <ul className="steps steps-vertical lg:steps-horizontal my-4">
                    {Object.entries(steps).map(([key, value]) => (
                        <li key={key} className={`step ${currentStep >= parseInt(key) ? 'step-primary' : ''}`}>{value}</li>
                    ))}
                </ul>

                <div>
                    {currentStep === 0 && <UploadResume func={resumeData} />}
                    {currentStep === 1 && <textarea className="textarea textarea-primary w-[100%] h-[300px]" placeholder="Job Description" onChange={(e) => setJobDescription(e.target.value)}></textarea>}
                    {currentStep === 2 && <div>{coverLetter}</div>}
                </div>
                <div className='my-8'>
                    <span onClick={() => setCurrentStep(currentStep - 1)}>
                        <Prev currentStep={currentStep} />
                    </span>

                    {currentStep === 1 && <button className='btn btn-primary' onClick={generateCoverLetter}>Generate Cover Letter</button>}
                </div>
            </div>
        </div>
    )
}