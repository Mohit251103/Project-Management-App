import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { databases } from '../lib/appwrite';

const ProjectDetails = () => {
    const { id } = useParams();
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState({})

    async function init() {
        const response = await databases.listDocuments(
            '653fcde3b6182c19eede',
            '653fcdf109a2042766d4'
        );
        setProjects(response.documents);
        console.log(response.documents);
        let project = response.documents.filter((element) => element.id === id);
        setCurrentProject(project[0]);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6 m-4">
                <h2 className="text-2xl font-bold mb-4">{currentProject.title}</h2>
                <p className="mb-2"><strong>Description:</strong> {currentProject.content}</p>
                <p className="mb-2"><strong>Start Date:</strong> {currentProject.start}</p>
                {currentProject.end && (<p className="mb-4"><strong>End Date:</strong> {currentProject.end}</p>)}
                {currentProject.users && JSON.parse(currentProject.users).length > 0 && (
                    <div className="mb-2">
                        <strong>Contributors:</strong>
                        <ul className="list-disc pl-4">
                            {JSON.parse(currentProject.users).map((contributor, index) => (
                                <li key={index}>{contributor.name}: {contributor.task}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProjectDetails