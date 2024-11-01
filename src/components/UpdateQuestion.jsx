import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateQuestion = ({ onUpdateSuccess }) => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`https://eduacers-backend.onrender.com/questions/${id}`);
                setQuestion(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://eduacers-backend.onrender.com/questions/${id}`, {
                title: question.title,
                description: question.description
            });
            onUpdateSuccess();
        } catch (error) {
            setError('Error updating question: ' + error.message);
        }
    };

    if (!question) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input
                type="text"
                value={question.title}
                onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                required
            />
            <textarea
                value={question.description}
                onChange={(e) => setQuestion({ ...question, description: e.target.value })}
                required
            />
            <button type="submit">Update Question</button>
        </form>
    );
};

export default UpdateQuestion;