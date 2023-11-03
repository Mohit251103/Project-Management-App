import React, { useState, useEffect } from 'react'
import { databases } from '../lib/appwrite';
import { Link } from 'react-router-dom';
import { ID } from 'appwrite';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [contributors, setContributors] = useState([]);
    const [contributorName, setContributorName] = useState('');
    const [contributorTask, setContributorTask] = useState('');

    const addContributor = () => {
        if (contributorName && contributorTask) {
            const newContributor = {
                name: contributorName,
                task: contributorTask,
            };
            setContributors([...contributors, newContributor]);
            setContributorName('');
            setContributorTask('');
        }
    }

    async function add(idea) {
        const response = await databases.createDocument(
            '653fcde3b6182c19eede',
            '653fcdf109a2042766d4',
            ID.unique(),
            idea
        );
        setTimeout(() => {
            setProjects((projects) => [response.$id, ...projects].slice(0, 10));
        }, 400);
    }

    async function remove(id) {
        await databases.deleteDocument('653fcde3b6182c19eede',
            '653fcdf109a2042766d4', id);
        setProjects((projects) => projects.filter((project) => project.$id !== id));
        await init(); // Refetch ideas to ensure we have 10 items
    }

    async function init() {
        const response = await databases.listDocuments(
            '653fcde3b6182c19eede',
            '653fcdf109a2042766d4'
        );
        console.log(response);
        setProjects(response.documents);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Ongoing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects ? (projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <Link
                            to={`/projects/${project.id}`}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Project
                        </Link>
                        <button
                            onClick={() => remove(project.$id)}
                            className="bg-red-500 text-white mx-2 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete Project
                        </button>
                    </div>
                ))) : (
                    <h3 className="text-xl font-semibold mb-2">Add Projects</h3>
                )}
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                var id = "id" + Math.random().toString(16).slice(2);
                let users = JSON.stringify(contributors);
                add({ title, id, content, start, end, users });
                setTimeout(() => {
                    window.location.reload();
                }, 550);
            }}>
                <div className="mb-4 my-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Project Title:
                    </label>
                    <input
                        id='title'
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter project title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Project Description:
                    </label>
                    <input
                        id='desc'
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter project link"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                    <input
                        id="startDate"
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={start}
                        onChange={(e) => {
                            setStart(e.target.value);
                        }}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
                    <input
                        id="endDate"
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={end}
                        onChange={(e) => {
                            setEnd(e.target.value);
                        }}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Contributors:</label>
                    {contributors.map((contributor, index) => (
                        <div key={index} className="flex mb-2">
                            <div className="mr-2">{contributor.name}: {contributor.task}</div>
                        </div>
                    ))}
                    <div className="flex">
                        <input
                            type="text"
                            value={contributorName}
                            onChange={(e) => setContributorName(e.target.value)}
                            placeholder="Contributor Name"
                        />
                        <input
                            type="text"
                            value={contributorTask}
                            onChange={(e) => setContributorTask(e.target.value)}
                            placeholder="Task"
                        />
                        <button type="button" onClick={addContributor} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Project
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Projects