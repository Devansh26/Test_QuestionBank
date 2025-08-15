document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("questionContainer");
    const searchInput = document.getElementById("searchInput");
    const topicFilter = document.getElementById("topicFilter");

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Questions directly in JS (no fetch)
    const questionsData = [
        { topic: "HTML", type: "MCQ", marks: 2, question: "Which HTML tag is used to create a hyperlink?\na) <a>\nb) <link>\nc) <href>\nd) <url>", answer: "a) <a>" },
        { topic: "HTML", type: "MCQ", marks: 2, question: "Which attribute is used to provide alternative text for an image?\na) title\nb) alt\nc) src\nd) caption", answer: "b) alt" },
        { topic: "HTML", type: "Code Completion", marks: 2, question: "Complete the code to create an ordered list with three items: Apple, Banana, Mango.\n<_____>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Mango</li>\n</_____>", answer: "<ol> ... </ol>" },
        {
            topic: "HTML",
            type: "Theory",
            marks: 3,
            question: "What is the difference between HTML tags and attributes? Give one example.",
            answer: "Tags define elements (e.g., <p>), while attributes provide additional information about elements (e.g., <img src='image.jpg'> where src is an attribute)."
        },
        { topic: "CSS", type: "MCQ", marks: 2, question: "Which CSS property is used to change the text color?\na) background-color\nb) text-color\nc) color\nd) font-color", answer: "c) color" },
        { topic: "CSS", type: "Code Debugging", marks: 2, question: "Find and correct the error:\np {\n  font-size: 16;\n}", answer: "Missing unit — should be: font-size: 16px;" },
        { topic: "CSS", type: "Theory", marks: 3, question: "Describe the difference between inline, internal, and external CSS. Include an example of each.", answer: "Inline: style=\"color:red;\"; Internal: <style> in head; External: linked CSS file.(note : write in brief)" },
        {
            topic: "CSS",
            type: "Theory",
            marks: 3,
            question: "What is the :hover selector in CSS and how is it used? Give an example.",
            answer: "The :hover selector is used to apply styles when the user places the mouse pointer over an element. Example: button:hover { background-color: blue; } changes the button's background to blue when hovered."
        },
        { topic: "JavaScript", type: "MCQ", marks: 2, question: "Which symbol is used for single-line comments in JavaScript?\na) <!-- -->\nb) //\nc) /* */\nd) #", answer: "b) //" },
        {
            topic: "JavaScript",
            type: "Coding",
            marks: 3,
            question: "Write a JavaScript program that does the following:\n" +
                "1. Select the div element with the id 'container'.\n" +
                "2. Create a new paragraph element with the text 'Hello, DOM!'.\n" +
                "3. Add this paragraph inside the 'container' div.",
            answer: "const container = document.getElementById('container');\n" +
                "const p = document.createElement('p');\n" +
                "p.textContent = 'Hello, DOM!';\n" +
                "container.appendChild(p);"
        },
        {
            topic: "JavaScript",
            type: "Coding",
            marks: 3,
            question: "Write a JavaScript program that does the following:\n" +
                "1. Select all buttons on the page with the class 'click-btn'.\n" +
                "2. Make it so that when any button is clicked, its text changes to 'Clicked!'.",
            answer: "const buttons = document.querySelectorAll('.click-btn');\n" +
                "buttons.forEach(btn => {\n" +
                "  btn.addEventListener('click', () => {\n" +
                "    btn.textContent = 'Clicked!';\n" +
                "  });\n" +
                "});"
        },
        {
            topic: "JavaScript",
            type: "Theory",
            marks: 3,
            question: "Explain the difference between var, let, and const in JavaScript.",
            answer: "In JavaScript, 'var', 'let', and 'const' are used to declare variables, but they behave differently:\n\n" +
                "1. var:\n" +
                "- Function-scoped, meaning it is accessible throughout the function where it is declared.\n" +
                "- Can be redeclared and updated within its scope.\n" +
                "- Hoisted to the top of its function scope (accessible before declaration, but undefined).\n\n" +
                "2. let:\n" +
                "- Block-scoped, meaning it is only accessible within the block ({ ... }) where it is declared.\n" +
                "- Can be updated but not redeclared in the same scope.\n" +
                "- Hoisted, but not initialized (cannot access before declaration).\n\n" +
                "3. const:\n" +
                "- Block-scoped, like 'let'.\n" +
                "- Cannot be reassigned after initialization.\n" +
                "- Useful for constants or values that should not change.\n\nExample:\n" +
                "function demo() {\n" +
                "  var x = 10;\n" +
                "  let y = 20;\n" +
                "  const z = 30;\n" +
                "}"
        },
        { topic: "Git", type: "MCQ", marks: 2, question: "Which command is used to check the current status of your repository?\na) git check\nb) git status\nc) git log\nd) git diff", answer: "b) git status" },
        { topic: "Git", type: "MCQ", marks: 2, question: "Which command is used to download a repository from GitHub?\na) git fetch\nb) git download\nc) git clone\nd) git pull", answer: "c) git clone" },
        {
            topic: "Git",
            type: "Coding",
            marks: 4,
            question: "Write the complete sequence of Git commands to stage all changes, commit them with your message , and push to the remote repository.",
            answer: `git add .\ngit commit -m "Initial commit"\ngit push`
        },
        { topic: "HTML", type: "MCQ", marks: 2, question: "In HTML5, which tag is used to define navigation links?\na) <navigate>\nb) <nav>\nc) <navigation>\nd) <links>", answer: "b) <nav>" },
        { topic: "JavaScript", type: "Code Output Prediction", marks: 3, question: "What will be the output of:\nconsole.log(2 + '2');\nconsole.log(2 - '2');", answer: "22 and 0" },
        { topic: "CSS", type: "Code Completion", marks: 3, question: "Write a CSS rule to make all <h1> elements blue and center-aligned.\nh1 {\n  color: _____;\n  text-align: _____;\n}", answer: "color: blue; text-align: center;" },
        { topic: "Git", type: "MCQ", marks: 2, question: "In Git, which command shows the commit history?\na) git history\nb) git commits\nc) git log\nd) git show", answer: "c) git log" },
        { topic: "Web Dev", type: "Theory", marks: 3, question: "Explain what a responsive website is and name two ways to make a website responsive.", answer: "Responsive = adapts to screen size. Ways: media queries, fluid grids." }
    ];

    function displayQuestions(questions) {
        questionContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const card = document.createElement("div");
            card.className = "question-card";

            // card.innerHTML = `
            //     <h3>Q${index + 1} (${q.topic} - ${q.type} - ${q.marks} Marks)</h3>
            //     <p>${escapeHTML(q.question).replace(/\n/g, "<br>")}</p>
            //     <button class="show-answer">Show Answer</button>
            //     <div class="answer">${escapeHTML(q.answer || "No answer provided").replace(/\n/g, "<br>")}</div>
            // `;

            card.innerHTML = `
                <h3>Q${index + 1} (${q.topic} - ${q.type} - ${q.marks} Marks)</h3>
                <p ${q.type === "Coding" ? 'class="code-question"' : ''}>
                    ${escapeHTML(q.question).replace(/\n/g, "<br>")}
                </p>
                <button class="show-answer">Show Answer</button>
                <div class="answer ${q.type === "Coding" ? 'code-answer' : ''}">
                    ${escapeHTML(q.answer || "No answer provided").replace(/\n/g, "<br>")}
                </div>
            `;

            card.querySelector(".show-answer").addEventListener("click", () => {
                const ans = card.querySelector(".answer");
                ans.style.display = ans.style.display === "block" ? "none" : "block";
            });

            questionContainer.appendChild(card);
        });
    }

    function filterQuestions() {
        const searchText = searchInput.value.toLowerCase();
        const selectedTopic = topicFilter.value;

        const filtered = questionsData.filter(q => {
            const matchesTopic = selectedTopic ? q.topic === selectedTopic : true;
            const matchesSearch = q.question.toLowerCase().includes(searchText);
            return matchesTopic && matchesSearch;
        });

        displayQuestions(filtered);
    }

    searchInput.addEventListener("input", filterQuestions);
    topicFilter.addEventListener("change", filterQuestions);

    displayQuestions(questionsData);
});
