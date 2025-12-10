const addIssueButton = document.getElementById("add-issue-button");
const issuesRoot = document.getElementById("issues-list");
const issuesList = [];

// Issue
class Issue {
    static idIssue = 0;

    constructor(text, onDelete, done = false) {
        this.text = text;
        this.onDelete = onDelete;
        this.index = 0;
        this.done = done;

        // Create element
        this.element = document.createElement("li");
        this.element.className = "issue-item";

        // Done
        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        this.checkbox.className = "issue-checkbox";
        this.checkbox.checked = this.done;

        // Issue index
        this.numberSpan = document.createElement("span");
        this.numberSpan.className = "issue-span";
        this.numberSpan.textContent = this.index + ". ";

        // Issue text
        this.textSpan = document.createElement("span");
        this.textSpan.className = "issue-text";
        this.textSpan.textContent = this.text;

        // Check
        if (this.done) {
            this.element.classList.add("issue-done");
        }

        // Issue id
        this.id = Issue.idIssue++;

        // Delete button
        this.deleteButton = document.createElement("button");
        this.deleteButton.className = "btn btn-secondary delete-issue-btn";
        this.deleteButton.id = `delete-issue-btn-${this.id}`;
        this.deleteButton.type = "button";
        this.deleteButton.textContent = "Удалить";

        // Element
        this.element.appendChild(this.numberSpan);
        this.element.appendChild(this.textSpan);
        this.element.appendChild(this.deleteButton);
        this.element.appendChild(this.checkbox);

        // Delete issue
        this.deleteButton.addEventListener("click", () => {
            this.delete();
        });

        // Change text
        this.textSpan.addEventListener("click", () => {
           this.editIssue();
        });

        // Change done-state
        this.checkbox.addEventListener("change", () => {
            this.done = this.checkbox.checked;
            this.element.classList.toggle("issue-done", this.done);
            saveIssues(issuesList);
        });
    }

    // Set index
    setIndex(newIndex) {
        this.index = newIndex;
        this.numberSpan.textContent = this.index + ". ";
    }

    // Delete
    delete() {
        this.onDelete(this);
    }

    // Edit issue
    editIssue() {
        const oldText = this.text;

        const input = document.createElement("input");
        showNewIssueInput(input);
        input.type = "text";
        input.className = "edit-issue-input";
        input.value = this.text;

        this.element.replaceChild(input, this.textSpan);

        const finishEditing = () => {
            const newText = input.value.trim();

            if (newText === "") {
                this.text = oldText;
            } else {
                this.text = newText;
            }

            this.textSpan = document.createElement("span");
            this.textSpan.className = "issue-text";
            this.textSpan.textContent = this.text;

            this.textSpan.addEventListener("click", () => {
                this.editIssue();
            });

            this.element.replaceChild(this.textSpan, input);
            saveIssues(issuesList);
        }

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                finishEditing();
            } else if (event.key === "Escape") {
                input.value = oldText;
                finishEditing();
            }
        });

        // miss click
        input.addEventListener("blur", () => {
            finishEditing();
        });
    }
}

// Delete issue
function onDelete(issue) {
    const index = issuesList.indexOf(issue);
    issuesList.splice(index, 1);
    renderIssues(issuesList, issuesRoot);
    saveIssues(issuesList);
}

// Render issues
function renderIssues(issues, root) {
    root.innerHTML = "";
    issues.forEach((issue) => {
        root.appendChild(issue.element);
    });
    refreshIndexes(issues);
}

// Timeout show input
function showNewIssueInput(input) {
    setTimeout(() => input.classList.add("show"), 50);
}

// Renumber indexes
function refreshIndexes(issues) {
    issues.forEach((issue, i) => {
        issue.setIndex(i + 1);
    });
}

// Create issue
function createIssue(text, issues, root, input) {
    let issue = new Issue(text, onDelete);
    issues.push(issue);
    root.removeChild(input);
    renderIssues(issues, root);
    saveIssues(issues);
}

// Save issue
function saveIssues(issues) {
    const plainIssues = issues.map((issue) => {
        return {
            id: issue.id,
            text: issue.text,
            done: issue.done
        }
    })
    localStorage.setItem("issues", JSON.stringify(plainIssues));
}

// Load issue
function loadIssues(issues, root) {
    const data = localStorage.getItem("issues");
    if (!data) return;

    const plainIssues = JSON.parse(data);
    plainIssues.forEach((item) => {
        const issue = new Issue(item.text, onDelete, item.done ?? false);
        issue.id = item.id; // восстановили id, чтобы совпадало

        issues.push(issue);
        root.appendChild(issue.element);
    });

    refreshIndexes(issues);
}

// Issue
function newIssue() {
    const newIssueInput = document.createElement("input");
    newIssueInput.type = "text";
    newIssueInput.className = "issue-input";
    issuesRoot.appendChild(newIssueInput);
    showNewIssueInput(newIssueInput);

    newIssueInput.focus();

    newIssueInput.addEventListener("keydown", (event) => {
        const text = newIssueInput.value.trim();
        if (event.key === "Enter") {
            if (text.trim() === "") {
                issuesRoot.removeChild(newIssueInput);
                cntInputs = 0;
                return;
            }

            createIssue(text, issuesList, issuesRoot, newIssueInput);
            cntInputs = 0;
        }
    });
}


loadIssues(issuesList, issuesRoot);
console.log("main loaded");

let cntInputs = 0;
addIssueButton.addEventListener("click", () => {
    cntInputs++;
    if (cntInputs === 1)
        newIssue();
    else
        return;
});

