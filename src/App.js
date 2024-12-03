import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [word, setWord] = useState('');
    const [data, setData] = useState({
        meaning: 'Search a word to see its meaning here.',
        synonyms: 'Synonyms will appear here.',
        antonyms: 'Antonyms will appear here.',
        example: 'Example sentences will appear here.',
    });

    const fetchWordData = async () => {
        if (!word.trim()) {
            alert('Please enter a word!');
            return;
        }

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const result = await response.json();

            if (!result || result.title === 'No Definitions Found') {
                setData({
                    meaning: 'No definitions found.',
                    synonyms: '-',
                    antonyms: '-',
                    example: '-',
                });
                return;
            }

            const meaning = result[0]?.meanings[0]?.definitions[0]?.definition || 'N/A';
            const synonyms = result[0]?.meanings[0]?.synonyms || [];
            const antonyms = result[0]?.meanings[0]?.antonyms || [];
            const example = result[0]?.meanings[0]?.definitions[0]?.example || 'No example available.';

            setData({
                meaning,
                synonyms: synonyms.length ? synonyms.join(', ') : 'None',
                antonyms: antonyms.length ? antonyms.join(', ') : 'None',
                example,
            });
        } catch (error) {
            console.error('Error fetching word data:', error);
            setData({
                meaning: 'Error fetching data. Please try again.',
                synonyms: '-',
                antonyms: '-',
                example: '-',
            });
        }
    };

    return (
        <div className="app-container">
            <header>
                <h1>Dynamic Dictionary</h1>
            </header>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Type a word..."
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
                <button onClick={fetchWordData}>Search</button>
            </div>
            <div className="results-section">
                <div id="meaning">
                    <h2>Meaning</h2>
                    <p>{data.meaning}</p>
                </div>
                <div id="synonyms">
                    <h2>Synonyms</h2>
                    <p>{data.synonyms}</p>
                </div>
                <div id="antonyms">
                    <h2>Antonyms</h2>
                    <p>{data.antonyms}</p>
                </div>
                <div id="examples">
                    <h2>Example Sentence</h2>
                    <p>{data.example}</p>
                </div>
            </div>
        </div>
    );
};

export default App;
