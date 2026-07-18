const users = [
    {email:"employee@company.com", password:"1234", role:"employee"},
    {email:"manager@company.com", password:"1234", role:"manager"}
];

let leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Invalid login");
        return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = user.role === "employee" ? "employee.html" : "manager.html";
}

function checkEmployee() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "employee") window.location.href = "login.html";
}

function checkManager() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "manager") window.location.href = "login.html";
}

function applyLeave() {
    let leave = {
        employee: "Employee User",
        type: leaveType.value,
        dates: startDate.value + " to " + endDate.value,
        status: "Pending"
    };
    leaveRequests.push(leave);
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
    alert("Leave submitted");
    loadEmployeeLeaves();
}

function loadEmployeeLeaves() {
    let table = document.getElementById("employeeTable");
    table.innerHTML = "";
    leaveRequests.forEach(l => {
        table.innerHTML += `<tr><td>${l.type}</td><td>${l.dates}</td><td>${l.status}</td></tr>`;
    });
}

function loadManagerLeaves() {
    let table = document.getElementById("managerTable");
    table.innerHTML = "";
    leaveRequests.forEach((l, i) => {
        table.innerHTML += `<tr>
            <td>${l.employee}</td>
            <td>${l.type}</td>
            <td>${l.dates}</td>
            <td><button onclick="approve(${i})">Approve</button></td>
        </tr>`;
    });
}

function approve(index) {
    leaveRequests[index].status = "Approved";
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
    loadManagerLeaves();
}

function logout() {
    localStorage.clear();
}
