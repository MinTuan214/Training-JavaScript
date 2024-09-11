
const utils = {
    containForm(){
        var lastName = document.getElementById('lastName').value;
        var firstName = document.getElementById('firstName').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var country = document.getElementById('country').value;
        var city = document.getElementById('city').value;
        var address = document.getElementById('address').value;
        var index = document.getElementById('user-index').value;
        return { lastName, firstName, email, phone, country, city, address, index};
    },
        
    modal() {
        var add = document.querySelector('.btn-add');
        var formAdd = document.querySelector('.form-add');
        var closeModal = document.querySelector('.close-modal');
        var overflow = document.querySelector('.overflow');
        add.addEventListener('click', function () {
            overflow.classList.add('active');
        });
        closeModal.addEventListener('click', function () {
            overflow.classList.remove('active');
        });
        overflow.addEventListener('click', function () {
            overflow.classList.remove('active');
        });
        formAdd.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }, 
}

export { utils }