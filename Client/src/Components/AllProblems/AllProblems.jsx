import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./AllProblems.css";

const AllProblems = () => {
    const [problems, setProblems] = useState([]);

    const init = async() => {
        const response = await fetch('http://localhost:3000/problems', {
            method: "GET",
        });

        const json = await response.json();
        setProblems(json.problems);
    }

    useEffect( () => {
        init()
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 15;

    const totalPages = Math.ceil(problems.length / problemsPerPage);

    const indexOfLastProblem = currentPage * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <table className='problems-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Acceptance</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProblems.map((problem, index) => (
                        <tr key={`problem_${index}`}>
                        <td>
                            <Link to={`/problems/${problem.problemId}`}>
                                {problem.title}
                            </Link>
                        </td>
                        <td>{problem.acceptance}</td>
                        <td>{problem.difficulty}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <ul className='pagination'>
                    {pageNumbers.map((page, index) => (
                        <li 
                            key={`page_${index}`} 
                            onClick={() => handleClick(page)} 
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </li>
                    ))} 
                </ul>
            </div>
        </div>
    );
};

export default AllProblems
