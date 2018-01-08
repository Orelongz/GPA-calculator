let numOfTables = document.querySelector("#numOfTables");
let semesterDetails = document.querySelector("#semesterDetails");
let gradePoint = document.querySelector("#gradePoint");
let submitButton = document.querySelector('button');
let semesters;
let calcPoints;

// THE APP IS BASED ON A FIVE AND SEVEN POINT GPA SCALE
function fivePoints(score) {
  if (score >= 70 && score <= 100) {
    return 5;
  } else if (score >= 60 && score < 70) {
    return 4;
  } else if (score >= 50 && score < 60) {
    return 3;
  } else if (score >= 45 && score < 50) {
    return 2;
  } else if (score >= 40 && score < 45) {
    return 1;
  } else {
    return 0;
  }
}

function sevenPoints(score) {
  if (score >= 70 && score <= 100) {
    return 7;
  } else if (score >= 65 && score < 70) {
    return 6;
  } else if (score >= 60 && score < 64) {
    return 5;
  } else if (score >= 55 && score < 59) {
    return 4;
  } else if (score >= 50 && score < 54) {
    return 3;
  } else if (score >= 45 && score < 49) {
    return 2;
  } else if (score >= 40 && score < 45) {
    return 1;
  } else {
    return 0;
  }
}

// CREATE THE EACH TABLE ELEMENT WITHIN EACH
function createTable() {
  let myTable = document.createElement("table");
  let tableBody = document.createElement("tbody");
  tableBody.innerHTML = (
    `<tr>
      <th>SCORE</th>
      <th>UNITS</th>
    </tr>`
  );
  tableBody.appendChild(tableContent());
  myTable.appendChild(tableBody);
  return myTable;
}

// CREATE THE BODY OF EACH TABLE
function tableContent() {
  let tableRow = document.createElement("tr");
  tableRow.innerHTML = (
    `<td><input type='number' name='score'></td>
    <td><input type='number' name='units'></td>`
  );
  return tableRow;
}

// CREATE THE TABLE AND HEADING OF EACH SEMESTER
function perSemester() {
  let len = numOfTables.value;
  for (let i = 1; i <= len; i++) {
    let eachSemester = document.createElement("div");
    eachSemester.setAttribute('class', 'semesters');
    eachSemester.innerHTML = (
      `<h4>Semester ${i}</h4>`
    );
    eachSemester.appendChild(createTable());    
    eachSemester.appendChild(document.createElement("p"));
    semesterDetails.appendChild(eachSemester);
  }
  semesters = document.querySelectorAll('.semesters');
}

// CREATE NUMBER OF SEMESTERS BASED ON INPUT GIVEN AND THE SUBMIT BUTTON
numOfTables.addEventListener("change", function(event) {
  submitButton.classList.remove('notSeen');
  while (semesterDetails.lastChild) {
    semesterDetails.removeChild(semesterDetails.lastChild); 
  }
  perSemester();
});


// IF THE LAST INPUT IN THE TABLE IS CHANGED, A NEW "TR" IS GENERATED
semesterDetails.addEventListener("change", function(event) {
  if(event.target.tagName === "INPUT") {
    if (event.target.parentNode.parentNode.parentNode.lastChild === event.target.parentNode.parentNode) {
      event.target.parentNode.parentNode.parentNode.appendChild(tableContent());
    }
  }
});


// CALCULATE THE GPA AND CGPA ONCE THE "CALCULATE BUTTON" IS CLICKED
document.body.addEventListener("click", function(event) {
  if(event.target.tagName === "BUTTON") {
    if (gradePoint.value === '1') {
      calcPoints = fivePoints;
    } else if (gradePoint.value === '2') {
      calcPoints = sevenPoints;
    }
    gpa();
  }
});

// LOGIC OF GPA AND CGPA CALCULATION
function gpa() {
  let gradePointUnit = 0;
  let gradeUnit = 0;

  for (let i = 0; i < semesters.length; i++) {
    semesterScores = semesters[i].querySelectorAll("input[name=score]");
    semesterUnits = semesters[i].querySelectorAll("input[name=units]");
    
    let totalPointUnit = 0;
    let totalUnits = 0;

    for(let j = 0; j < semesterUnits.length; j++) {
      let pointUnit = Number(semesterUnits[j].value) * calcPoints(semesterScores[j].value);
      totalPointUnit += pointUnit;
      totalUnits += Number(semesterUnits[j].value);
    }

    gradePointUnit += totalPointUnit;
    gradeUnit += totalUnits;

    let pointAverage = (totalPointUnit/ totalUnits).toFixed(2);
    if (String(pointAverage) === 'NaN') {
      semesters[i].querySelector('.semesters p').textContent = ("You omitted some details, kindly check all fields");
    } else {
      semesters[i].querySelector('.semesters p').textContent = ("Your GPA for the semester is " + pointAverage);
    }
  }

  let gradePointAverage = (gradePointUnit/ gradeUnit).toFixed(2);
  if (String(gradePointAverage) === 'NaN') {
    document.querySelector('.cgpaMessage').textContent = '';
  } else {
    document.querySelector('.cgpaMessage').textContent = ("You are on a CGPA  of " + gradePointAverage);
  }
}