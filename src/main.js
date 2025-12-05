const addIssueButton = document.getElementById("add-issue-button");
const issuesRoot = document.getElementById("issues-list");
const issuesList = [];

// Issue
class Issue {
    constructor(text, onDelete) {
        this.text = text;
        this.onDelete = onDelete;
        this.index = 0;

        // Create element
        this.element = document.createElement("li");
        this.element.className = "issue-item";

        // Issue index
        this.numberSpan = document.createElement("span");
        this.numberSpan.className = "issue-span";
        this.numberSpan.textContent = this.index + ". ";

        // Issue text
        this.textSpan = document.createElement("span");
        this.textSpan.className = "issue-text";
        this.textSpan.textContent = this.text;

        // Delete button
        this.deleteButton = document.createElement("button");
        this.deleteButton.className = "btn btn-secondary delete-issue-btn";
        this.deleteButton.id = "delete-issue-btn";
        this.deleteButton.type = "button";
        this.deleteButton.textContent = "Удалить";

        // Element
        this.element.appendChild(this.numberSpan);
        this.element.appendChild(this.textSpan);
        this.element.appendChild(this.deleteButton);

        // Delete issue
        this.deleteButton.addEventListener("click", () => {
            this.delete();
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
}

// Delete issue
function onDelete(issue) {
    const index = issuesList.indexOf(issue);
    issuesList.splice(index, 1);
    renderIssues(issuesList, issuesRoot);
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

// Create new issue
function newIssue() {
    let newIssueInput = document.createElement("input");
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
                return;
            }
            createIssue(text, issuesList, issuesRoot, newIssueInput);

            return;
        }
    });
}

function createIssue(text, issues, root, input) {
    let issue = new Issue(text, onDelete);
    issues.push(issue);
    root.removeChild(input);
    renderIssues(issues, root);
}

addIssueButton.addEventListener("click", newIssue);
console.log("main loaded")