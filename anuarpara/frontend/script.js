async function loadUsers() {
    const response = await fetch(`${API_URL}/api/transactions/${currentUser.id}`);  
    const users = await response.json();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");

        li.textContent =
            `${user.username} | Баланс: ${user.balance} тенге `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";

        deleteButton.onclick = () => deleteUser(user.id);

        li.appendChild(deleteButton);
        userList.appendChild(li);
    });
}

async function deleteUser(userId) {
    if (!confirm("Вы действительно хотите удалить пользователя?")) {
        return;
    }

    const response = await fetch(
        `${API_URL}/api/users/${userId}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (response.ok) {
        alert(data.message);

        if (currentUser && currentUser.id === userId) {
            currentUser = null;

            document.getElementById("bankSection").classList.add("hidden");
            document.getElementById("authSection").classList.remove("hidden");
        }

        loadUsers();
    } else {
        alert(data.detail);
    }
}