import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionsManager = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableQuestionId, setEditableQuestionId] = useState(null);

  useEffect(() => {
    // Fetch questions from the API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://mediumblue-jellyfish-250677.hostingersite.com/api/question'); // Replace with your API endpoint
        setQuestions(response.data.questions);
      } catch (err) {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (e, questionId, optionId) => {
    const { value } = e.target;

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: Array.isArray(question.options)
                ? question.options.map((option) =>
                    option.id === optionId
                      ? { ...option, label: value }
                      : option
                  )
                : question.options,
              label: optionId ? question.label : value,
            }
          : question
      )
    );
  };

  const handleEditClick = (questionId) => {
    setEditableQuestionId((prevId) => (prevId === questionId ? null : questionId));
  };

  const handleSubmit = async () => {
    if (editableQuestionId) {
      const questionToUpdate = questions.find(q => q.id === editableQuestionId);

      try {
        await axios.put(`https://mediumblue-jellyfish-250677.hostingersite.com/api/question/${editableQuestionId}`, questionToUpdate);
        alert('Question updated successfully!');
        setEditableQuestionId(null); // Exit edit mode
      } catch (err) {
        console.error('Failed to update question:', err);
        alert('Failed to update question');
      }
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Question Label</th>
            <th>Options</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>
                <input
                  type="text"
                  value={question.label}
                  onChange={(e) => handleInputChange(e, question.id)}
                  className="form-control"
                  disabled={editableQuestionId !== question.id}
                />
              </td>
              <td>
                {Array.isArray(question.options) ? (
                  question.options.map((option) => (
                    <div key={option.id}>
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) =>
                          handleInputChange(e, question.id, option.id)
                        }
                        className="form-control"
                        disabled={editableQuestionId !== question.id}
                      />
                    </div>
                  ))
                ) : (
                  <div>No options available</div>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleEditClick(question.id)}
                  className="btn btn-secondary"
                >
                  {editableQuestionId === question.id ? 'Cancel' : 'Edit'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editableQuestionId && (
        <button onClick={handleSubmit} className="btn btn-primary mt-4">
          Save Changes
        </button>
      )}
    </div>
  );
};

export default QuestionsManager;
