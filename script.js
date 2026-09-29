const form = document.querySelector(".form");
const saveBTN = document.getElementById("saveBTN")
const updateBTN = document.querySelector(".btn:nth-child(2)");
const deleteBTN = document.querySelector(".btn:nth-child(3)");
const showBTN = document.querySelector(".btn:nth-child(4)");
const clearBTN = document.querySelector(".btn:nth-child(5)");

const inputs = document.querySelectorAll("input");

const tbody = document.querySelector("table tbody");

function clearInputs() {
    inputs[0].value = ""
    inputs[1].value = ""
    inputs[2].value = ""
    inputs[3].value = ""
}

async function showSingleUser(id) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/users/${id}`);
        const data = await response.json();
        const user = data.data;
        inputs[0].value = user.id;
        inputs[1].value = user.name;
        inputs[2].value = user.email;
        inputs[3].value = user.age;
    } catch (error) {
        console.log(error)
    }

}

async function showData() {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/users");
        const data = await response.json();
        if (data.success == true) {
            tbody.innerHTML = ""
            data.data.forEach((user) => {
                tbody.innerHTML += `
                <tr onclick="showSingleUser(${user.id})"}>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                </tr>
                `
            })
        }
    } catch (error) {
        console.log(error)
    }
}

async function saveUser(id, name, email, age) {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                email: email,
                age: age
            })
        })

        const data = await response.json();

        if (data.success == true) {
            showData();
        }

    } catch (error) {
        console.log(error)
    }
}

async function updateData(id, name, email, age) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/users/${id}`, {
            method: "put",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                email: email,
                age: age
            })
        })
        const data = await response.json();
        if (data.success == true) {
            clearInputs();
            showData();
        }
    } catch (error) {
        console.log(error)
    }
}


async function deleteData(id,name,email,age) {

    try {

        const response = await fetch(`http://127.0.0.1:3000/api/users/${id}`, {
            method: "DELETE",
           
        })

        const data = await response.json();
        if(data.success == false) {
            //console.log(data)
            window.alert(data.message)
        }
        if(data.success == true) {
            showData();
        }
       

    } catch (error) {
        console.log(error);
    }
}



saveBTN.addEventListener("click", (e) => {
    e.preventDefault();
    const id = inputs[0].value;
    const name = inputs[1].value;
    const email = inputs[2].value;
    const age = inputs[3].value;
    saveUser(id, name, email, age)
})


updateBTN.addEventListener("click", (e) => {
    e.preventDefault();
    const id = inputs[0].value;
    const name = inputs[1].value;
    const email = inputs[2].value;
    const age = inputs[3].value;
    updateData(id, name, email, age)
})


deleteBTN.addEventListener("click",(e) => {
    
    id = window.prompt("Enter delete ID:")
    deleteData(id);
})

showData()


clearBTN.addEventListener("click", clearInputs)