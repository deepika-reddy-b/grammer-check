import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [checkResult, setCheckResult] = useState([]);
  const apiKey = 'SCfZ6wCFhztmgAWz';
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionDropdownVisible, setSuggestionDropdownVisible] = useState(false);
  const [currentErrorWord, setCurrentErrorWord] = useState(null);

  const handleSuggestionClick = (correction) => {
    setSuggestions(correction.better);
    setSuggestionDropdownVisible(true);
    setCurrentErrorWord(correction);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const applySuggestion = (suggestion) => {
    const { offset, length } = currentErrorWord;
    const start = text.slice(0, offset);
    const end = text.slice(offset + length);
    const newText = start + suggestion + end;
    setText(newText);
    setSuggestions([]);
    setSuggestionDropdownVisible(false);
  };

  const checkGrammar = async () => {
    try {
      const apiUrl = `https://api.textgears.com/grammar?text=${text}&language=en-US&whitelist=&dictionary_id=&ai=1&key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      if (!response.ok) {
        throw  Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const responseErrors = (result.response && result.response.errors) || [];

      setCheckResult(responseErrors);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const isWrongWord = (index) => {
    return checkResult.some((correction) => {
      const offset = correction.offset;
      const length = correction.length;
      return index >= offset && index < offset + length;
    });
  };

  return (
    <div>
      <h1>Check your grammar and spellings</h1>
      <div className="main">
        <div className="text-area-wrapper">
          <label>Write your text:</label><br />
          <textarea
            name="postContent"
            placeholder="Type your content here...."
            rows={10}
            cols={40}
            value={text}
            onChange={handleTextChange}
          />
          <label>The written text:</label> <br></br> <br></br>
          {text.split(/\s+/).map( (word, index) => {
            const error = checkResult.find(
              (correction) => correction.offset <= index && index < correction.offset + correction.length
            );
            if (error) {
              return (
                <span
                  key={index}
                  className={isWrongWord(index) ? "error-word" : ""}
                  onClick={() => handleSuggestionClick(error)}
                >
                  {word}
                </span>
              );
            } else {
              return <span key={index}>{word} </span>;
            }
            } )
          }
        </div>

        {suggestionDropdownVisible && (
          <div className="suggestion-dropdown">
            <ul>
              {suggestions.map( (suggestion, j) => (
                <li key={j} onClick={() => applySuggestion(suggestion)} >
                  {suggestion}
                </li> )  )
              }
            </ul>
          </div>
        )}
        <button type="button" disabled={!text} className="submit-btn" onClick={checkGrammar}>
          Check Grammar
        </button>
      </div>
      <div className="results">
        <h2>Grammar Check Result:</h2>
        {checkResult.length === 0 ? (
          <p className='correct'>The given text is good with grammar.</p>
        ) : (
          <div className="results">
            <h2>Grammar Check Result:</h2>
            <ul>
              {checkResult.map((correction, i) => (
                <li key={i}>
                  <span
                    className="error-word"
                    onClick={() => handleSuggestionClick(correction)}
                  >
                    {text.substring(correction.offset, correction.offset + correction.length)}
                  </span>
                  {suggestionDropdownVisible && (
                    <select>
                      {correction.better.map((suggestion, j) => (
                        <option key={j} value={suggestion}>
                          {suggestion}
                        </option>
                      ))}
                    </select>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
