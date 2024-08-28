// validate form
function validateForm(){
    var lastName = document.getElementById('lastName').value;
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var address = document.getElementById('address').value;

    if(lastName == ""){
        alert("Vui lòng nhập Họ");
        return false;
    }
    if(firstName == ""){
        alert("Vui lòng nhập Tên");
        return false;
    }
    if(email == ""){
        alert("Vui lòng nhập Email");
        return false;
    }
    if(phone == ""){
        alert("Vui lòng nhập phone");
        return false;
    }
    if(country == ""){
        alert("Vui lòng nhập country");
        return false;
    }
    if(city == ""){
        alert("Vui lòng nhập city");
        return false;
    }
    if(address == ""){
        alert("Vui lòng nhập address");
        return false;
    }
    
    return true;
}

// Show users
function showUsers(){
    var listUsers;
    if(localStorage.getItem("listUsers") == null){
        listUsers = []; 
    }else{
        listUsers = JSON.parse(localStorage.getItem("listUsers"));
    }

    var html = "";
    listUsers.forEach(function(element, index) {
        html += `
            <tr>
                    <td>${element.lastName} ${element.firstName}</td>
                    <td>${element.email}</td>
                    <td>${element.address}</td>
                    <td>${element.city}</td>
                    <td>${element.country}</td>
                    <td class="action">
                        <a href="${index}"><i class="fa-regular fa-eye"></i></a> |
                        <button  onclick="updateUser()" class="btn-update"><i class="fa-regular fa-pen-to-square"></i></button> |
                        <button onclick="deleteUser(${index})"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
        `
    });
    document.querySelector("#list-users tbody").innerHTML = html;
}


document.onload = showUsers();

// Create
function createUser(index){
    document.getElementById('save').style.display = 'block';
    document.getElementById('title-add').style.display = 'block';
    document.getElementById('update').style.display = 'none';
    document.getElementById('title-update').style.display = 'none';
}

// Add user
function addUser(){
    if(validateForm() == true){
        var lastName = document.getElementById('lastName').value;
        var firstName = document.getElementById('firstName').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var country = document.getElementById('country').value;
        var city = document.getElementById('city').value;
        var address = document.getElementById('address').value;

        var listUsers;
        if(localStorage.getItem("listUsers") == null){
            listUsers = []; 
        }else{
            listUsers = JSON.parse(localStorage.getItem("listUsers"));
        }
        listUsers.push({
            lastName: lastName,
            firstName: firstName,
            email: email,
            phone: phone,
            country: country,
            city: city,
            address: address
        })

        localStorage.setItem('listUsers', JSON.stringify(listUsers));
        showUsers();
        var lastName = document.getElementById('lastName').value = "";
        var firstName = document.getElementById('firstName').value = "";
        var email = document.getElementById('email').value = "";
        var phone = document.getElementById('phone').value = "";
        var country = document.getElementById('country').value = "";
        var city = document.getElementById('city').value = "";
        var address = document.getElementById('address').value = "";
    }
}

// Delete user
function deleteUser(index){
    var listUsers;
    if(localStorage.getItem("listUsers") == null){
        listUsers = []; 
    }else{
        listUsers = JSON.parse(localStorage.getItem("listUsers"));
    }

    listUsers.splice(index, 1);
    localStorage.setItem('listUsers', JSON.stringify(listUsers));
    showUsers();
}

//update and edit
function updateUser(index){
    document.getElementById('save').style.display = 'none';
    document.getElementById('title-add').style.display = 'none';
    document.getElementById('update').style.display = 'block';
    document.getElementById('title-update').style.display = 'block';
    
}