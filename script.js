document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  const employeesList = document.getElementById("employees");
  const addEmployeeButton = document.getElementById("add-employee");
  const filterButton = document.getElementById("filter-button");

  // Function to fetch employees from the API and display them
  const fetchEmployees = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const employees = await response.json();
      displayEmployees(employees);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to display employees in the list
  const displayEmployees = (employees) => {
    employeesList.innerHTML = "";
    employees.forEach((employee) => {
      const li = document.createElement("li");
      li.textContent = `Name: ${employee.name}, Employee ID: ${employee.employeeId}, Department: ${employee.department}, Salary: ${employee.salary}, Gender: ${employee.gender}, Position: ${employee.position}`;
      employeesList.appendChild(li);
    });
  };

  // Function to add a new employee
  const addEmployee = async () => {
    const nameInput = document.getElementById("name");
    const employeeIdInput = document.getElementById("employee-id");
    const departmentInput = document.getElementById("department");
    const salaryInput = document.getElementById("salary");
    const genderInput = document.getElementById("gender");
    const positionInput = document.getElementById("position");

    const newEmployee = {
      name: nameInput.value,
      employeeId: employeeIdInput.value,
      department: departmentInput.value,
      salary: salaryInput.value,
      gender: genderInput.value,
      position: positionInput.value,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) {
        throw new Error("Failed to add employee");
      }
      nameInput.value = "";
      employeeIdInput.value = "";
      departmentInput.value = "";
      salaryInput.value = "";
      genderInput.value = "";
      positionInput.value = "";
      await fetchEmployees(); // Refresh the list of employees
    } catch (error) {
      console.error(error);
    }
  };

  // Function to filter employees based on the selected option
  const filterEmployees = () => {
    const filterInput = document.getElementById("filter-input");
    const filterOption = document.getElementById("filter-option").value;
    const searchTerm = filterInput.value.toLowerCase();

    const filteredEmployees = employeesList.childNodes;
    filteredEmployees.forEach((employee) => {
      const employeeText = employee.textContent.toLowerCase();
      if (employeeText.includes(searchTerm)) {
        employee.style.display = "block";
      } else {
        employee.style.display = "none";
      }
    });

    filterInput.value = "";
  };

  // Event listener for the "Add Employee" button
  addEmployeeButton.addEventListener("click", addEmployee);

  // Event listener for the "Filter" button
  filterButton.addEventListener("click", filterEmployees);

  // Fetch and display employees when the page loads
  fetchEmployees();
});
