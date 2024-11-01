import React from 'react';
import axios from 'axios';

const DeleteQuestion = ({ id, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`https://eduacers-backend.onrender.com/questions/${id}`);
            onDeleteSuccess();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete Question
        </button>
    );
};

export default DeleteQuestion;