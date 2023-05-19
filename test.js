// Fetch existing employee data from the API
async function fetchEmployees() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch employees.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Display the employee list on the page
function displayEmployees(employees) {
  const employeesList = document.getElementById('employees');
  employeesList.innerHTML = '';

  employees.forEach((employee) => {
    const li = document.createElement('li');
    li.textContent = `${employee.name} - ${employee.department} - ${employee.salary}`;
    employeesList.appendChild(li);
  });
}

// Add a new employee to the API
async function addEmployee() {
  const nameInput = document.getElementById('name');
  const employeeIdInput = document.getElementById('employee-id');
  const departmentInput = document.getElementById('department');
  const salaryInput = document.getElementById('salary');
  const genderInput = document.getElementById('gender');
  const positionInput = document.getElementById('position');

  const newEmployee = {
    name: nameInput.value,
    employeeId: employeeIdInput.value,
    department: departmentInput.value,
    salary: salaryInput.value,
    gender: genderInput.value,
    position: positionInput.value,
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newEmployee),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to add employee.');
    }
    const data = await response.json();
    console.log('Added employee:', data);
    nameInput.value = '';
    employeeIdInput.value = '';
    departmentInput.value = '';
    salaryInput.value = '';
    genderInput.value = '';
    positionInput.value = '';
    alert('Employee added successfully!');
    fetchAndDisplayEmployees();
  } catch (error) {
    console.error(error);
  }
}

// Update an employee's data in the API
async function updateEmployee(employeeId, updatedData) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${employeeId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to update employee.');
    }
    const data = await response.json();
    console.log('Updated employee:', data);
    alert('Employee updated successfully!');
    fetchAndDisplayEmployees();
  } catch (error) {
    console.error(error);
  }
}

// Delete an employee from the API
async function deleteEmployee(employeeId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${employeeId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee.');
    }
    console.log('Deleted employee:', employeeId);
    alert('Employee deleted successfully!');
    fetchAndDisplayEmployees();
  } catch (error) {
    console.error(error);
  }
}

// Fetch and display employees when the page loads
window.addEventListener('load', fetchAndDisplayEmployees);

// Fetch and display employees from the API
async function fetchAndDisplayEmployees() {
  const employees = await fetchEmployees();
  displayEmployees(employees);
}

// Add event listeners to the "Add Employee" button and the "Filter" button
const addEmployeeButton = document.getElementById('add-employee');
addEmployeeButton.addEventListener('click', addEmployee);

const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', filterEmployees);

// Filter employees based on the search input
function filterEmployees() {
  const filterInput = document.getElementById('filter-input');
  const filterValue = filterInput.value.trim().toLowerCase();
  const employees = document.querySelectorAll('#employees li');

  employees.forEach((employee) => {
    const employeeText = employee.textContent.toLowerCase();
    if (employeeText.includes(filterValue)) {
      employee.style.display = 'block';
    } else {
      employee.style.display = 'none';
    }
  });

  if (document.querySelectorAll('#employees li[style="display: block;"]').length === 0) {
    alert('No employees found.');
  }
}
