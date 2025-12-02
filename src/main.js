const addIssueButton = document.getElementById("add-issue-button");
const issuesList = document.getElementById("issues-list");
const issues = [];

// Issue
class Issue {
    constructor(text) {
        this.text = text;
        this.index = issues.length + 1;

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
        this.element.remove();

        const indexInIssuesList = issues.indexOf(this);
        issues.splice(indexInIssuesList, 1);

        refreshIndexes();
    }
}

// Timeout show input
function showNewIssueInput(input) {
    setTimeout(() => input.classList.add("show"), 50);
}

// Renumber indexes
function refreshIndexes() {
    issues.forEach((issue, i) => {
        issue.setIndex(i + 1);
    });
}

// Create new issue
function newIssue() {
    let newIssueInput = document.createElement("input");
    newIssueInput.type = "text";
    newIssueInput.className = "issue-input";
    issuesList.appendChild(newIssueInput);
    showNewIssueInput(newIssueInput);

    newIssueInput.focus();

    newIssueInput.addEventListener("keydown", (event) => {
        const text = newIssueInput.value.trim();
        if (event.key === "Enter") {
            if (text.trim() === "") {
                issuesList.removeChild(newIssueInput);
                return;
            }
            const issue = new Issue(text);
            issues.push(issue);

            issuesList.replaceChild(issue.element, newIssueInput);
            refreshIndexes();

            return;
        }
    });
}

addIssueButton.addEventListener("click", newIssue);
console.log("main loaded")