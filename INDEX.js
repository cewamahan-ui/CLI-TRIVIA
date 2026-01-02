// Kenyan History & Leaders Trivia Game
console.log("KENYAN HISTORY & LEADERS TRIVIA");
console.log("=".repeat(50));

// Trivia questions about Kenyan history and leaders
// Keeping everything in one place felt easier than over-engineering it
const triviaQuestions = [
{
question: "In what year did Kenya gain independence?",
choices: ["1957", "1960", "1963", "1966"],
correct: 2, // 1963
timeLimit: 12,
category: "Independence"
},
{
question: "Who was Kenya's first president?",
choices: ["Daniel Moi", "Mwai Kibaki", "Jomo Kenyatta", "Uhuru Kenyatta"],
correct: 2,
timeLimit: 10,
category: "Leaders"
},
{
question: "What does 'Harambee' mean in English?",
choices: ["Freedom", "Let's work together", "Peace", "Unity"],
correct: 1,
timeLimit: 10,
category: "Culture"
},
{
question: "Who was known as the 'Fighting Bishop' for his role in Kenya's independence?",
choices: [
"Bishop John G. Gatu",
"Bishop Henry Okullu",
"Bishop Festo Olang",
"Bishop Alexander Muge"
],
correct: 1,
timeLimit: 15,
category: "Independence Heroes"
},
{
question: "Which political party led Kenya to independence?",
choices: ["KADU", "KANU", "FORD", "ODM"],
correct: 1,
timeLimit: 12,
category: "Politics"
},
{
question: "Who was Kenya's longest-serving vice president?",
choices: [
"Michael Wamalwa",
"Musalia Mudavadi",
"Mwai Kibaki",
"Joseph Murumbi"
],
correct: 1,
timeLimit: 15,
category: "Leaders"
},
{
question: "What year was the new Kenyan constitution adopted?",
choices: ["2005", "2007", "2010", "2013"],
correct: 2,
timeLimit: 10,
category: "Modern Kenya"
},
{
question: "Who was the first African woman to win the Nobel Peace Prize?",
choices: [
"Wangari Maathai",
"Muthoni Likimani",
"Grace Ogot",
"Micere Mugo"
],
correct: 0,
timeLimit: 12,
category: "Heroes"
},
{
question: "Which freedom fighter was known as 'Burning Spear'?",
choices: [
"Dedan Kimathi",
"Jomo Kenyatta",
"Tom Mboya",
"Ronald Ngala"
],
correct: 1,
timeLimit: 12,
category: "Independence Heroes"
},
{
question: "In which year did Kenya become a republic?",
choices: ["1963", "1964", "1965", "1966"],
correct: 1,
timeLimit: 10,
category: "Independence"
}
];

// Game state (kept global for now, not ideal but simple)
let score = 0;
let questionIndex = 0;
let activeTimer;
let playerName = "";

// Ask for player name
function getPlayerName() {
const rl = require("readline").createInterface({
input: process.stdin,
output: process.stdout
});

rl.question("\nEnter your name: ", (name) => {
playerName = name || "Player";
console.log(`\nWelcome, ${playerName}! Let's test your knowledge of Kenyan history.`);
rl.close();
showMenu();
});
}

// Start game
function startGame() {
score = 0;
questionIndex = 0;

console.log(`\nGAME START, ${playerName.toUpperCase()}!`);
console.log("=".repeat(50));
console.log("Instructions:");
console.log("- Type 1 to 4 to answer");
console.log("- Each question has a timer");
console.log("- You can skip with 's' if stuck");
console.log("=".repeat(50));

setTimeout(askQuestion, 3000);
}

// Ask a question
function askQuestion() {
if (questionIndex >= triviaQuestions.length) {
endGame();
return;
}

const q = triviaQuestions[questionIndex];

console.log(`\nQUESTION ${questionIndex + 1}/${triviaQuestions.length}`);
console.log(`Category: ${q.category}`);
console.log(`Time limit: ${q.timeLimit}s`);
console.log(`\n${q.question}`);

q.choices.forEach((choice, i) => {
console.log(`  ${i + 1}. ${choice}`);
});

startTimer(q.timeLimit);

const rl = require("readline").createInterface({
input: process.stdin,
output: process.stdout
});

rl.question("\nYour answer (1-4) or 's' to skip: ", (answer) => {
if (activeTimer) clearInterval(activeTimer);
rl.close();

if (answer.toLowerCase() === "s") {
  console.log("Skipped. Next one!");
} else {
  checkAnswer(answer, q);
}

setTimeout(() => {
  questionIndex++;
  askQuestion();
}, 2000);

});
}

```
if (answer.toLowerCase() === "s") {
  console.log("⏭️ Skipped. Next one!");
} else {
  checkAnswer(answer, q);
}

setTimeout(() => {
  questionIndex++;
  askQuestion();
}, 2000);
```

});
}

// Timer logic (simple, not fancy)
function startTimer(seconds) {
let remaining = seconds;
console.log(`⏰ Time remaining: ${remaining}s`);

activeTimer = setInterval(() => {
remaining--;

if (remaining <= 5 || remaining % 5 === 0) {
  console.log(`⏰ ${remaining}s left`);
}

if (remaining <= 0) {
  clearInterval(activeTimer);
  console.log("\n⏰ TIME'S UP! Moving on...");
  questionIndex++;
  setTimeout(askQuestion, 1500);
}

}, 1000);
}

```
if (remaining <= 5 || remaining % 5 === 0) {
  console.log(`⏰ ${remaining}s left`);
}

if (remaining <= 0) {
  clearInterval(activeTimer);
  console.log("\n⏰ TIME'S UP! Moving on...");
  questionIndex++;
  setTimeout(askQuestion, 1500);
}
```

}, 1000);
}

// Check answer
function checkAnswer(answer, q) {
const chosen = parseInt(answer);

if (isNaN(chosen) || chosen < 1 || chosen > 4) {
console.log("⚠️ Invalid input, but no stress.");
return;
}

if (chosen - 1 === q.correct) {
console.log("✅ Correct! Hongera 🎉");
score++;
} else {
console.log("❌ Incorrect.");
console.log(`📖 Correct answer: ${q.choices[q.correct]}`);
giveHistoricalContext(q.question);
}

console.log(`📊 Score: ${score}/${questionIndex + 1}`);
}

// Extra learning info
function giveHistoricalContext(qText) {
const facts = {
"In what year did Kenya gain independence?":
"Kenya gained independence on 12th December 1963.",
"Who was Kenya's first president?":
"Jomo Kenyatta became president in 1964 when Kenya became a republic.",
"What does 'Harambee' mean in English?":
"Harambee means pulling together, a key Kenyan value.",
"Which political party led Kenya to independence?":
"KANU led Kenya to independence and ruled for many years."
};

if (facts[qText]) {
console.log(`💡 Did you know? ${facts[qText]}`);
}
}

// End game
function endGame() {
console.log("\n" + "=".repeat(50));
console.log("🏁 GAME OVER - MATOKEO YAKO!");
console.log("=".repeat(50));

const percent = (score / triviaQuestions.length) * 100;

console.log(`👤 Player: ${playerName}`);
console.log(`📊 Final Score: ${score}/${triviaQuestions.length}`);
console.log(`📈 Percentage: ${percent.toFixed(1)}%`);

if (percent >= 80) console.log("🌟 Vizuri sana!");
else if (percent >= 60) console.log("👍 Nzuri, keep learning!");
else console.log("📚 Soma zaidi!");

askReplay();
}

// Replay prompt
function askReplay() {
const rl = require("readline").createInterface({
input: process.stdin,
output: process.stdout
});

rl.question("\n🔄 Cheza tena? (y/n): ", (res) => {
rl.close();
if (res.toLowerCase() === "y") {
startGame();
} else {
console.log(`\n👋 Kwaheri, ${playerName}! Asante kwa kucheza 🇰🇪`);
process.exit();
}
});
}

// Menu
function showMenu() {
console.log("\n" + "=".repeat(50));
console.log("MAIN MENU");
console.log("=".repeat(50));
console.log("1. Start Game");
console.log("2. View Questions");
console.log("3. Exit");

const rl = require("readline").createInterface({
input: process.stdin,
output: process.stdout
});

rl.question("\nChoose option (1-3): ", (choice) => {
rl.close();
if (choice === "1") startGame();
else if (choice === "2") showAllQuestions();
else process.exit();
});
}

// Show all questions (learning mode)
function showAllQuestions() {
console.log("\n📚 ALL QUESTIONS");
console.log("=".repeat(50));

triviaQuestions.forEach((q, i) => {
console.log(`${i + 1}. ${q.question}`);
console.log(`   ✔ ${q.choices[q.correct]}`);
});

setTimeout(showMenu, 5000);
}

// Program intro
console.log("\n🇰🇪 JIFUNZE HISTORIA YA KENYA! 🇰🇪");
console.log("A CLI trivia game for learning Kenyan history.");
console.log("Built by a student developer 👨‍🎓");

// Start
getPlayerName();
