import { useState } from 'react';
import axios from 'axios';

const AddQuestion = ({ onQuestionAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('https://eduacers-backend.onrender.com/questions', {
                title,
                description
            });
            onQuestionAdded();
            setTitle('');
            setDescription('');
        } catch (error) {
            setError('Error adding question: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Question Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Question Description"
                required
            />
            <button type="submit">Add Question</button>
        </form>
    );
};

export default AddQuestion;