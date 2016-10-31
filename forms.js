$(document).ready(function() {
/*****************************************************
VARIABLE DECLARATIONS
*****************************************************/
  var totalSalaries = 0;
  var employee = {};
  var $totalMonthlySalaries, $empList, totalMonthlySalaries, row, currentSalary, fields;
/*****************************************************
EVENT LISTENERS
*****************************************************/
  $("#employeeForm").on("submit", submitEmployee);
  $("#container").on("click", ".delete", deleteEmployee);
/*****************************************************
FUNCTIONS
*****************************************************/
  function submitEmployee(event)  {
    event.preventDefault();
    fields = $("#employeeForm").serializeArray(); //convert inputs into and array of objects
    fields.forEach(function(element) {
      employee[element.name] = element.value; //assign properties to each object and give it value
    });
    addToTable(employee);
    addToSalary();
    $("#employeeForm").find("input[type=text]").val(''); //clear input fields
    $("#employeeForm").find("input[type=number]").val(''); //clear input fields
  }

  function addToTable(empInfo) {
    $empList = $("#container").children().last(); //location to add new row to
    $empList.append('<tr class="row"></tr>'); //adds new row for new employee
    row = $('.row').last(); //location to add new employee data to
    row.append(
      '<td>' + empInfo.employeeFirstName + '</td><td>' +
      empInfo.employeeLastName + '</td><td>' + empInfo.IDNumber + '</td><td>' +
      empInfo.jobTitle + '</td><td>' +
      empInfo.annualSalary + '</td><td><button class="delete">DELETE</button></td>'
    );
    row.data("salary", parseInt(empInfo.annualSalary)); //stores employee salary as data on that tr
  }

  function addToSalary () {
    totalSalaries += row.data("salary");
    totalMonthlySalaries = Math.round((totalSalaries/12) * 100)/100;
    $alary = $('#salaryCalc').children();
    $alary.remove();
    $('#salaryCalc').append('<p>$' + totalMonthlySalaries + '</p>');
  }

  function deleteEmployee() {
    currentSalary = $(this).parent().parent().data("salary");
    totalSalaries -= currentSalary;
    $totalMonthlySalaries = $('#salaryCalc').children();
    totalMonthlySalaries = Math.round((totalSalaries/12) * 100)/100;
    $totalMonthlySalaries.replaceWith('<p>$' + totalMonthlySalaries + '</p>');
    $(this).parent().parent().remove();
  }
});
