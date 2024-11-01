import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import DeleteQuestion from "./DeleteQuestion";

const GetAllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("https://eduacers-backend.onrender.com/questions");
                setQuestions(response.data); // Assuming response.data is an array of questions
            } catch (error) {
                setError(
                    error.response ? error.response.data : "An error occurred while fetching data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>All Questions</h1>
            <ul>
                {questions.map((question) => (
                    <li key={question._id}>
                        {question.title}
                        <Link to={`/questions/${question._id}`}> View</Link>
                        <Link to={`/update/${question._id}`}> Update</Link> {/* Add update link */}
                        <DeleteQuestion
                            id={question._id}
                            onDeleteSuccess={() => setQuestions((prev) => prev.filter(q => q._id !== question._id))} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetAllQuestions;