var contentbox = document.querySelector(".contentbox"),
	semester = document.querySelector("#semesters"),
	semesterDetails = document.querySelector("#semesterDetails"),
	lastpara = document.querySelector("#remove"),
	courses,
	divSemesterNo,
	semesterNo,
	messages,
	semesterheading;

// THE APP IS BASED ON A FIVE POINT GPA SCALE
function fivePoints (score) {
	if (score >= 70 && score <= 100) {
		return (5);
	} else if (score >= 60 && score < 70) {
		return (4);
	} else if (score >= 50 && score < 60) {
		return (3);
	} else if (score >= 45 && score < 50) {
		return (2);
	} else if (score >= 40 && score < 45) {
		return (1);
	} else if (score >= 0 && score < 40) {
		return (0);
	}  else if (score < 0 || score > 100) {
		return ("Not valid, "+ -1);
	}
}

// CREATE THE EACH TABLE ELEMENT WITHIN EACH
function createTable () {
	var myTable = document.createElement("table");
	var heading = ["COURSES", "SCORE", "UNITS"];
	
	var trow = document.createElement("tr");
	for (var i = 0; i < heading.length; i++) {
		var thead = document.createElement("th");
		thead.textContent = heading[i];
		trow.appendChild(thead);
	}
	myTable.appendChild(trow);
	myTable.setAttribute("align", "center");
	myTable.appendChild(tableContent ());
	return myTable;
}

// CREATE THE BODY OF EACH TABLE
function tableContent () {
	var trow = document.createElement("tr");
	for (var k = 0; k < 3; k++) {
		var tdata = document.createElement("td");
		if (k === 0) {
			tdata.textContent = 1;
		} else if (k === 1){
			tdata.innerHTML = "<input type='number' name='score'>";
		} else if (k === 2){
			tdata.innerHTML = "<input type='number' name='units'>";
		}
		trow.appendChild(tdata);
		
	}
	return trow;
}

// CREATE THE TABLE AND HEADING OF EACH SEMESTER
function perSemester () {
	for (var i = 1; i <= semester.value; i++) {
		divSemesterNo = document.createElement("div");
		divSemesterNo.className = "semesterNo";
		semesterheading = document.createElement("h3");
		semesterheading.innerHTML = ("Semester " + i );
		divSemesterNo.appendChild(semesterheading);
		divSemesterNo.appendChild(createTable ());
		semesterDetails.appendChild(divSemesterNo);
	}
	semesterNo = document.querySelectorAll(".semesterNo");
}



// CREATE NUMBER OF SEMESTERS BASED ON INPUT GIVEN AND THE SUBMIT BUTTON
semester.addEventListener("change", function(event) {
	while (semesterDetails.lastChild) {
	    semesterDetails.removeChild(semesterDetails.lastChild); 
	}
	perSemester();
	event.target.parentNode.parentNode.parentNode.removeChild(lastpara);
	submitButton = document.createElement("div");
	submitButton.innerHTML = ("<br><input type='submit' class='btn btn-primary' value='calculate'>");
	semesterDetails.appendChild(submitButton);
});


// IF THE LAST INPUT IN THE TABLE IS CHANGED, A NEW "TR" IS GENERATED
semesterDetails.addEventListener("change", function(event) {
	if(event.target.tagName === "INPUT") {
		if (event.target.parentNode.parentNode.parentNode.lastChild === event.target.parentNode.parentNode) {
			event.target.parentNode.parentNode.parentNode.appendChild(tableContent ());
		}
	}
});


// CALCULATE THE GPA AND CGPA ONCE THE "CALCULATE BUTTON" IS CLICKED
semesterDetails.addEventListener("click", function(event) {
	if(event.target.value === "calculate") {
		gpa ();
	}
});



// LOGIC OF GPA AND CGPA CALCULATION
function gpa () {
	var gradePointUnit = 0;
	var gradeUnit = 0;


	for(var i = 0; i < semesterNo.length; i++) {
		semesterScores = semesterNo[i].querySelectorAll("input[name=score]");
		semesterUnits = semesterNo[i].querySelectorAll("input[name=units]");
		
		var totalPointUnit = 0;
		var totalUnits = 0;

		for(var j = 0; j < semesterUnits.length; j++) {
			pointUnit = Number(semesterUnits[j].value) * fivePoints(semesterScores[j].value);
			totalPointUnit += pointUnit;
			totalUnits += Number(semesterUnits[j].value);
		}

		gradePointUnit += totalPointUnit;
		gradeUnit += totalUnits;

		var pointAverage = (totalPointUnit/ totalUnits).toFixed(2);
		semesterMessage = document.createElement("p");
		semesterMessage.className = "lead";
		semesterMessage.textContent = ("Your GPA for the semester is " + pointAverage);
		semesterNo[i].appendChild(semesterMessage);

	}

	var gradePointAverage = (gradePointUnit/ gradeUnit).toFixed(2);
	var gpaMessage = document.createElement("p");
	gpaMessage.className = "lead";
	gpaMessage.innerHTML = ("You are on a CGPA  of " + gradePointAverage);
	contentbox.appendChild(gpaMessage);
	messages = document.querySelectorAll(".lead");
}