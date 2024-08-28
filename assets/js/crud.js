// var arrUsers = [
//     {
//         lastName: 'Minh',
//         firstName: 'Tuấn',
//         email: 'tuan@gmail.com',
//         address: 'Đức Cơ',
//         city: 'Pleiku',
//         country: 'Gia Lai',
//     },
//     {
//         lastName: 'Minh',
//         firstName: 'Tuấn',
//         email: 'tuan@gmail.com',
//         address: 'Đức Cơ',
//         city: 'Pleiku',
//         country: 'Gia Lai',
//     }, {
//         lastName: 'Minh',
//         firstName: 'Tuấn',
//         email: 'tuan@gmail.com',
//         address: 'Đức Cơ',
//         city: 'Pleiku',
//         country: 'Gia Lai',
//     }
// ];
// localStorage.setItem('USER_INFO', JSON.stringify(arrUsers));

// function addUser() {
//     var lastName = document.getElementById('lastName').value;
//     var firstName = document.getElementById('firstName').value;
//     var email = document.getElementById('email').value;
//     var phone = document.getElementById('phone').value;
//     var country = document.getElementById('country').value;
//     var city = document.getElementById('city').value;
//     var address = document.getElementById('address').value;


//     if(lastName == " "){
//         alert('Vui lòng nhập họ');
//         return false;
//     }
//     if(firstName == ""){
//         alert('Vui lòng nhập tên');
        
//     }else{
//         var objUser = {};
//         objUser.lastName = lastName;
//         objUser.firstName = firstName;
//         objUser.email = email;
//         objUser.phone = phone;
//         objUser.country = country;
//         objUser.city = city;
//         objUser.address = address;
    
//         arrUsers.push(objUser);
//         console.log(arrUsers);
//         loadDate();
       
//     }
// }
// var save = document.querySelector('.save');
// save.addEventListener('click', function(){
//     overflow.classList.remove('active');
// })
// function loadDate(){
//     var listUsers = document.getElementById('list-users');
//     var str = `
//                 <tr>          
//                     <th># <i class="fa-solid fa-sort"></i></th>
//                     <th>Name <i class="fa-solid fa-sort"></i></th>
//                     <th>Email <i class="fa-solid fa-sort"></i></th>
//                     <th>Address <i class="fa-solid fa-sort"></i></th>
//                     <th>City <i class="fa-solid fa-sort"></i></th>
//                     <th>Country <i class="fa-solid fa-sort"></i></th>
//                     <th>Action</th>
//                 </tr>
//             `
//     arrUsers.forEach( function(item, index){
//         str += `
//             <tr>
//                     <td>${index}</td>
//                     <td>${item.lastName} ${item.firstName}</td>
//                     <td>${item.email}</td>
//                     <td>${item.address}</td>
//                     <td>${item.city}</td>
//                     <td>${item.country}</td>
//                     <td class="action">
//                         <a href="${index}"><i class="fa-regular fa-eye"></i></a> |
//                         <a href="${index}"><i class="fa-regular fa-pen-to-square"></i></a> |
//                         <a href="${index}"><i class="fa-regular fa-trash-can"></i></a>
//                     </td>
//                 </tr>
//         `
//     });
//     listUsers.innerHTML = str;
// }