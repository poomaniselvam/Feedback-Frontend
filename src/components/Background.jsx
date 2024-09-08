import React, { useState } from 'react';
import axios from 'axios';

const Background = () => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [message, setMessage] = useState('');

    const handleColorChange = (e) => {
        setBackgroundColor(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('background_colors', backgroundColor); // Use the correct field name

        try {
            const response = await axios.post('https://mediumblue-jellyfish-250677.hostingersite.com/api/bodycolors', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Background color updated successfully!');
        } catch (error) {
            setMessage(`Error: ${error.response ? error.response.data.message : 'Server Error'}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Set Background Color</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="background_color" className="form-label">Background Color</label>
                    <input
                        className="form-control"
                        type="color"
                        id="background_color"
                        value={backgroundColor}
                        onChange={handleColorChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};

export default Background;
