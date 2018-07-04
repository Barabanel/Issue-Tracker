document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
document.onload = fetchIssues(); // to load issues from localStorage on load
document.getElementById('issuesList').addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('closed')){
    	var dataId = e.target.getAttribute('data-issueId');
    	setStatusClosed(dataId);
    }
 });
document.getElementById('issuesList').addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('deleted')){
    	var dataId = e.target.getAttribute('data-issueId');
    	deleteIssue(dataId);
    }
 });

function saveIssue(e) {
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid();
	var issueStatus = "Open";

	var issue = {
		id : issueId,
		description : issueDesc,
		severity : issueSeverity,
		assignedTo : issueAssignedTo,
		status : issueStatus
	}

	if (localStorage.getItem('issues') == null) {
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();

	fetchIssues();

	e.preventDefault();
}

function setStatusClosed(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (let i = 0; i < issues.length; i++) {
		if(issues[i].id == id) {
			issues[i].status = 'Closed';
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}

function deleteIssue(id) {
	var issues = JSON.parse(localStorage.getItem('issues')) ;

	for (let i = 0; i < issues.length; i++) {
		if(issues[i].id == id) {
			issues.splice(i, 1);
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}

function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesList = document.getElementById('issuesList');

	issuesList.innerHTML = "";

	for(let i = 0; i < issues.length; i++) {
		var id = issues[i].id;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issuesList.innerHTML += '<div class="card mb-3">' +
								'<div class="card-body bg-light">' +
								'<h6>Issue Id: ' + id + '</h6>' +
								'<p><span class="badge badge-info">' + status + '</span></p>' +
								'<h3>' + desc + '</h3>' +
								'<p><i class="far fa-clock mr-2"></i>' + severity + '</p>' +
								'<p><i class="fas fa-user-tie mr-2"></i>' + assignedTo + '</p>' +
								'<button data-issueId="' + id + '" class="btn btn-warning closed">Close</button>' +
								'<button data-issueId="' + id + '" class="btn btn-danger deleted">Delete</button>' +
								'</div></div>';

	}
}