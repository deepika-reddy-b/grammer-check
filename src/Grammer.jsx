import React, { useState } from 'react';
//import axios from 'axios';
//import spellchecker from 'spellchecker';

const GrammarSpellChecker = () => {
  const [inputText, setInputText] = useState('');
  const [grammarCheckResult, setGrammarCheckResult] = useState('');
  const [spellCheckResult, setSpellCheckResult] = useState('');

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  // const checkGrammar = () => {
  //   // Make a request to the Grammarly API (You need to sign up for Grammarly API and get your own API key)
  //   // Replace 'YOUR_GRAMMARLY_API_KEY' with your actual API key
  //   axios
  //     .post('https://api.grammarly.com/v1/grammar-check', { text: inputText }, {
  //       headers: {
  //         'Authorization': 'Bearer YOUR_GRAMMARLY_API_KEY',
  //       },
  //     })
  //     .then((response) => {
  //       setGrammarCheckResult(response.data.suggestions);
  //     })
  //     .catch((error) => {
  //       console.error('Grammar check error:', error);
  //     });
  // };

  const checkSpelling = () => {
    const words = inputText.split(/\s+/);
    //const misspelledWords = words.filter(word => !spellchecker.isMisspelled(word));
    setSpellCheckResult(words);
  };

  return (
    <div>
      <h2>Grammar and Spell Checker</h2>
      <textarea rows="10" cols="50" value={inputText} onChange={handleTextChange} />
      <button onClick={checkGrammar}>Check Grammar</button>
      <button onClick={checkSpelling}>Check Spelling</button>
      <div>
        <h3>Grammar Check Result:</h3>
        <pre>{JSON.stringify(grammarCheckResult, null, 2)}</pre>
      </div>
      <div>
        <h3>Spell Check Result:</h3>
        <pre>{JSON.stringify(spellCheckResult, null, 2)}</pre>
      </div>
    </div>
  );
};

export default GrammarSpellChecker;
