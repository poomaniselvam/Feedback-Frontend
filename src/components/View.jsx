import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackForm.css"; // Make sure to update this CSS file with the new styles

export default function View() {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    Mobile: "",
    rating: "",
    comment: "",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("https://mediumblue-jellyfish-250677.hostingersite.com/api/question")
      .then(response => {
        setQuestions(response.data.questions);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prevState => {
      const updatedValue = checked
        ? prevState[field] ? `${prevState[field]},${value}` : value
        : prevState[field].split(",").filter(item => item !== value).join(",");
      return { ...prevState, [field]: updatedValue };
    });
  };

  const handleRatingChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      rating: e.target.value,
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.rating) newErrors.rating = "Rating is required.";
      if (!formData.Name) newErrors.Name = "Name is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      if (!formData.Mobile) newErrors.Mobile = "Mobile is required.";
    } else if (step === 2) {
      questions.forEach(question => {
        if (!formData[question.id]) {
          newErrors[question.id] = "At least one option is required.";
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Submitting form data:", formData);
      axios.post("https://mediumblue-jellyfish-250677.hostingersite.com/api/rating", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        console.log("Form submitted successfully:", response.data);
        setShowSuccessPopup(true);
      })
      .catch(error => {
        console.error("There was an error submitting the form!", error.response || error.message);
        alert("There was an error submitting the form!");
      });
    }
  };

  const SuccessPopup = ({ onClose }) => (
    <div className="success-popup">
      <div className="success-popup-content">
        <h2>Success!</h2>
        <p>Your feedback has been submitted successfully.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="card card_css">
        <div className="progress-container">
          <div className="step-progress">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <span>1</span>
            </div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <span>2</span>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h2 className="text-center mb-4">Feedback Form</h2>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="mb-4">
                <h4>Rating and Personal Information</h4>
                <div className="form-group">
                  <label>Select a Rating:</label>
                  <div className="d-flex justify-content-around mt-3">
                    {["best", "excellent", "good", "average", "poor"].map((rating) => (
                      <div key={rating} className="text-center">
                        <input
                          type="radio"
                          name="rating"
                          id={rating}
                          value={rating}
                          className="d-none"
                          checked={formData.rating === rating}
                          onChange={handleRatingChange}
                        />
                        <label htmlFor={rating} className={`rating-option ${formData.rating === rating ? 'active' : ''}`}>
                          {rating === "best" ? "🌟" : 
                           rating === "excellent" ? "🏆" : 
                           rating === "good" ? "👍" : 
                           rating === "average" ? "😐" : "👎"}
                        </label>
                        <div className="rating-label">{rating.charAt(0).toUpperCase() + rating.slice(1)}</div>
                      </div>
                    ))}
                  </div>
                  {errors.rating && <div className="text-danger">{errors.rating}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    placeholder="Enter your name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                  {errors.Name && <div className="text-danger">{errors.Name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="Mobile">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="Mobile"
                    placeholder="Enter your mobile number"
                    value={formData.Mobile}
                    onChange={handleChange}
                    required
                  />
                  {errors.Mobile && <div className="text-danger">{errors.Mobile}</div>}
                </div>
              </div>
            )}

            {step === 2 && questions.length > 0 && (
              <div className="mb-4">
                <h4>Feedback Questions</h4>
                {questions.map((question) => (
                  <div key={question.id} className="form-group">
                    <label>{question.label} (Select all that apply)</label>
                    {question.options.map((option) => (
                      <div className="form-check" key={option.id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`${question.id}_${option.label}`}
                          value={option.label}
                          checked={formData[question.id]?.split(",").includes(option.label) || false}
                          onChange={(e) => handleCheckboxChange(e, question.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${question.id}_${option.id}`}
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                    {errors[question.id] && (
                      <div className="text-danger">{errors[question.id]}</div>
                    )}
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor="comment">Additional Comments</label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Enter your comments here"
                  ></textarea>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between">
              {step === 2 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              {step === 1 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              )}
            </div>
          </form>
          {showSuccessPopup && (
            <SuccessPopup onClose={() => setShowSuccessPopup(false)} />
          )}
        </div>
      </div>
    </div>
  );
}