import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GetAQuestionById = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`https://eduacers-backend.onrender.com/questions/${id}`);
                setQuestion(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {question ? (
                <>
                    <h1>{question.title}</h1>
                    <p>{question.description}</p>
                </>
            ) : (
                <p>Question not found</p>
            )}
        </div>
    );
};

export default GetAQuestionById;