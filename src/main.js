const addIssueButton = document.getElementById("add-issue-button");
const issuesList = document.getElementById("issues-list")

function deleteIssue(issue) {
    issue.parentNode.removeChild(issue);
}

function refreshIssues(issues, cur_index) {
    for (const elem of issues) {
        cur_index++;
    }
    return cur_index;
}

class Issue {

}

function newIssue() {
    let newIssueInput = document.createElement("input");
    newIssueInput.type = "text";
    newIssueInput.className = "issue-input";
    issuesList.appendChild(newIssueInput);
    setTimeout(() => newIssueInput.classList.add("show"), 10);

    newIssueInput.focus();

    newIssueInput.addEventListener("keydown", (event) => {
        const text = newIssueInput.value;
        if (event.key == "Enter") {
            if (text.trim() == "") {
                issuesList.removeChild(newIssueInput);
                return;
            }
            const newIssue = document.createElement("li");
            newIssue.className = "issue-item";
            newIssue.textContent = `${index++}. ${text}`;

            const issueDelete = document.createElement("button");
            issueDelete.className = "btn btn-secondary";
            issueDelete.id = "delete-issue-btn";
            issueDelete.textContent = "Удалить";
            newIssue.appendChild(issueDelete);
            issueDelete.type = "button";

            issuesList.replaceChild(newIssue, newIssueInput);

            issueDelete.addEventListener("click", () => {deleteIssue(newIssue), refreshIssues(issuesList, index)});
            return;
        }
    });
}

let index = 1;
addIssueButton.addEventListener("click", newIssue);
console.log("main loaded")
console.log(issuesList.children.length);
if (issuesList.children.length == 0) {

}