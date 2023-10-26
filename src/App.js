import React, { useState } from 'react';
import './App.css'
const App = () => {
  const [text, setText] = useState('');
  const [spellCheckResult, setSpellCheckResult] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const checkSpelling = async () => {
    try {
      const response = await fetch('https://api.apilayer.com/spell/spellchecker?q={q}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '920Bs9w6Qqk1nUBYfQvdfmhg2Ji98gRA', 
        body: JSON.stringify({ text: text }),
      });

      if (response.ok) {
        const data = await response.json();
        setSpellCheckResult(data.corrections);
      } else {
        console.error('Spelling check error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Spelling check error:', error);
    }
  };

  return (
    <div>
      <h1>Check your spellings</h1>
      <div className="main">
        <label>Write your text:</label><br />
        <textarea
          name="postContent"
          placeholder="Type your content here...."
          rows={10}
          cols={40}
          value={text}
          onChange={handleTextChange}
        />
        <button type="button" className="submit-btn" onClick={checkSpelling}>
          Check Spelling
        </button>
      </div>
      <div className="results">
        <h2>Spell Check Result:</h2>
        <ul>
          {spellCheckResult.map((correction, index) => (
            <li key={index}>{correction.best_candidate}</li>
          ),}
        </ul>
      </div>
    </div>
  );
};

export default App;
