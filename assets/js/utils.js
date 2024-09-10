
function containForm(){
    var lastName = document.getElementById('lastName').value;
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var address = document.getElementById('address').value;
    var index = document.getElementById('user-index').value;
    return { lastName, firstName, email, phone, country, city, address, index};
}
    
export { containForm }