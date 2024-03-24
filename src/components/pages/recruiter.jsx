import React, { useState } from "react";
import "./recruiter.css";

function Recruiter() {

    const [keywords, setKeywords] = useState([""]);
    const [resumes, setResumes] = useState([]);

    const handleAddKeyword = () => {
        setKeywords([...keywords, ""]);
    };

    const handleResumeUpload = (event) => {
        const files = Array.from(event.target.files);
        setResumes(prevResumes => [...prevResumes, ...files]);
    };


    const handleKeywordChange = (index, event) => {
        const newKeywords = [...keywords];
        newKeywords[index] = event.target.value;
        setKeywords(newKeywords);
    };

    function handleSubmit(event) {
        event.preventDefault();
        // Handle form submission
    }

    return (
        <>
        <div className='dashboard'>
            <div className='left'>
                <h2>Submit applied resumes</h2>
                <form>
                    <label for="file-upload">Upload Resume</label>
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleResumeUpload}
                        className='resume-input'
                    />
                    {resumes.length > 0 && (
                        <div>
                            <h3>Uploaded Resumes:</h3>
                            <ul>
                                {resumes.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
            </div>
            <div className='right'>
                <h2>Enter keywords for filtering resumes</h2>
                <form>
                    {keywords.map((keyword, index) => (
                        <div key={index}>
                            <label>Label {index + 1}</label>
                            <input
                                type="text"
                                className='keyword-input'
                                value={keyword}
                                onChange={(event) => handleKeywordChange(index, event)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddKeyword} className="add-btn">+ Add</button>
                </form>
            </div>
        </div>
        <button className='submit-btn' type="submit">Submit</button>
        </>
    );
}

export default Recruiter;