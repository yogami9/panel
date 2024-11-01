import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetAllQuestions from './components/GetAllQuestions';
import GetAQuestionById from './components/GetAQuestionById';
import AddQuestion from './components/AddQuestion';
import UpdateQuestion from './components/UpdateQuestion';

const App = () => {
    const [questionsUpdated, setQuestionsUpdated] = useState(false);

    const handleQuestionAdded = () => {
        setQuestionsUpdated(prev => !prev);
    };

    const handleUpdateSuccess = () => {
        setQuestionsUpdated(prev => !prev);
    };

    return (
        <Router>
            <div>
                <h1>PANEL</h1>
                <AddQuestion onQuestionAdded={handleQuestionAdded} />
                <Routes>
                    <Route path="/" element={<GetAllQuestions />} />
                    <Route path="/questions/:id" element={<GetAQuestionById />} />
                    <Route path="/update/:id" element={<UpdateQuestion onUpdateSuccess={handleUpdateSuccess} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;