import React, { useEffect, useState } from 'react';
import { json, useParams } from 'react-router-dom';
import "./ProblemsPage.css";

const ProblemsPage = () => {
    const [CodeSeg, setCodeSeg] = useState("// Write your solution here");
    const { pid } = useParams();
    const cleanId = pid.startsWith(":") ? pid.substring(1) : pid;
    const [problem, setProblem] = useState(null);
    const [submission, setSubmission] = useState("");

    const init = async () => {
        const response = await fetch("http://localhost:3000/problem/" + cleanId, {
          method: "GET",
        });
        console.log(cleanId);
        const json = await response.json();
        setProblem(json.problem);
      }
  
    useEffect(() => {
      init();
    }, [])

    if (!problem) {
        return <div>The searched Question Doesn't exist</div>;
    }

    const { title, difficulty, description} = problem;

    const handleKey = (event) => {
        if(event.key == "Tab"){
            event.preventDefault();
            const { selectionStart , selectionEnd, value } = event.target;
            const val = value.substring(0, selectionStart) + "\t" + value.substring(selectionStart);
            event.target.value = val;
            event.target.selectionStart = event.target.selectionEnd = selectionStart + 1;
        }
        setCodeSeg(event.value);
    }

    return (
        <div className='ques'>
            {problem ? (
                <div className='question'>
                    <h1 className='q-title'>{title}</h1>
                    <p className='diff-btn-text'><button className='diff-btn'>{difficulty}</button></p>
                    <div className='q-desc' dangerouslySetInnerHTML={{ __html: description }}></div>
                    {problem.examples.map((examples, exIndex) => (
                        <div key={`example-${exIndex}`}>
                            <h3>Example {exIndex + 1}: </h3>
                            <p className='eg-desc'><strong>Input:</strong> {examples.input}</p>
                            <p className='eg-desc'><strong>Output:</strong> {examples.output}</p>
                        </div>
                    ))}
                </div>
            ) :
            (<div>The searched Question Doesn't exist</div>)
        }

            <div className='code-side'>
                <div className='code-form'>
                    <textarea name="SolvedCode" onChange={(e) => setSubmission(e.target.value)} onKeyDown={(event) => handleKey(event)} defaultValue={`// Write your solution here`}></textarea>
                    <button id='btn-submit' type="submit" onClick={async () => {
                        const response = await fetch(`http://localhost:3000/submission`, {
                            method: "POST",
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            },
                            body: JSON.stringify({
                                problemId: cleanId,
                                submission: submission
                            })
                        });
                        const json = await json.response();
                        console.log(json);

                    }}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ProblemsPage;
