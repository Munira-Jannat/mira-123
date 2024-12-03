const apiKey = "YOUR_DICTIONARY_API_KEY"; // Replace with a real API key.
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const wordInput = document.getElementById("wordInput");
const searchBtn = document.getElementById("searchBtn");

const meaningText = document.getElementById("meaningText");
const synonymsText = document.getElementById("synonymsText");
const antonymsText = document.getElementById("antonymsText");
const examplesText = document.getElementById("examplesText");

searchBtn.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if (!word) {
        alert("Please enter a word!");
        return;
    }
    fetchWordData(word);
});

async function fetchWordData(word) {
    try {
        const response = await fetch(`${apiUrl}${word}`);
        const data = await response.json();

        if (!data || data.title === "No Definitions Found") {
            meaningText.textContent = "No definitions found.";
            synonymsText.textContent = "-";
            antonymsText.textContent = "-";
            examplesText.textContent = "-";
            return;
        }

        const meaning = data[0]?.meanings[0]?.definitions[0]?.definition || "N/A";
        const synonyms = data[0]?.meanings[0]?.synonyms || [];
        const antonyms = data[0]?.meanings[0]?.antonyms || [];
        const example = data[0]?.meanings[0]?.definitions[0]?.example || "No example available.";

        meaningText.textContent = meaning;
        synonymsText.textContent = synonyms.length ? synonyms.join(", ") : "None";
        antonymsText.textContent = antonyms.length ? antonyms.join(", ") : "None";
        examplesText.textContent = example;
    } catch (error) {
        console.error("Error fetching word data:", error);
        meaningText.textContent = "Error fetching data. Please try again.";
    }
}

// Scroll functionality
const scrollUp = document.getElementById("scrollUp");
const scrollDown = document.getElementById("scrollDown");

scrollUp.addEventListener("click", () => {
    window.scrollBy({ top: -100, behavior: "smooth" });
});

scrollDown.addEventListener("click", () => {
    window.scrollBy({ top: 100, behavior: "smooth" });
});
