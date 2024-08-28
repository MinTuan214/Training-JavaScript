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
                        <button onclick="updateUser(${index})" class="btn-update"><i class="fa-regular fa-pen-to-square"></i></button> |
                        <button onclick="confirmDelete(${index})" class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
        `
    });
    document.querySelector("#list-users tbody").innerHTML = html;
}


document.onload = showUsers();

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

    location.reload();

    }

}

function confirmDelete(index) {
    document.querySelector('.confirm-delete').classList.add('active');
    document.querySelector('.delete').setAttribute('onclick', `deleteUser(${index})`);
    document.querySelector('.cancel').onclick = function() {
        document.querySelector('.confirm-delete').classList.remove('active');
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
    document.querySelector('.confirm-delete').style.display = 'none';
    showUsers();
    location.reload();

}

//update and edit
function updateUser(index){
    document.getElementById('save').style.display = 'none';
    document.getElementById('title-add').style.display = 'none';
    document.getElementById('update').style.display = 'block';
    document.getElementById('title-update').style.display = 'block';
    var listUsers;
        if(localStorage.getItem("listUsers") == null){
            listUsers = []; 
        }else{
            listUsers = JSON.parse(localStorage.getItem("listUsers"));
        }
    document.getElementById('lastName').value = listUsers[index].lastName;
    document.getElementById('firstName').value = listUsers[index].firstName;
    document.getElementById('email').value = listUsers[index].email;
    document.getElementById('phone').value = listUsers[index].phone;
    document.getElementById('country').value = listUsers[index].country;
    document.getElementById('city').value = listUsers[index].city;
    document.getElementById('address').value = listUsers[index].address;

    document.getElementById('update').onclick = function(){
    if(validateForm() == true) {
        listUsers[index].lastName = document.getElementById('lastName').value;
        listUsers[index].firstName = document.getElementById('firstName').value;
        listUsers[index].email = document.getElementById('email').value;
        listUsers[index].phone = document.getElementById('phone').value;
        listUsers[index].country = document.getElementById('country').value;
        listUsers[index].city = document.getElementById('city').value;
        listUsers[index].address = document.getElementById('address').value;

        localStorage.setItem('listUsers', JSON.stringify(listUsers));
        showUsers();

        location.reload();
    }
      
    }
}