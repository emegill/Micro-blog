var deleteUser = new DeleteUser();
var updateUser = new UpdateUser();

function DeleteUser() {
    var delUserBtn = document.getElementsByClassName('delete-user-btn')[0];
    var delUserModal = document.getElementsByClassName('delete-user-modal')[0];
    var cancelBtn = document.getElementsByClassName('delete-user__cancel-btn')[0];

    delUserBtn.addEventListener("click", function() {
        setDisplayBlock(delUserModal);
    });
    cancelBtn.addEventListener("click", function() {
        setDisplayNone(delUserModal);
    });
}

function UpdateUser() {
    var userDetailsCont = document.getElementsByClassName('user-details__container')[0];
    var editUserBtn = document.getElementsByClassName('edit-user-btn')[0];
    var editUserCancelBtn = document.getElementsByClassName('edit-user__cancel-btn')[0];
    var editUserModal = document.getElementsByClassName('edit-user-modal')[0];

    var editPasswordBtn = document.getElementsByClassName('show-edit-password-btn')[0];
    var editPasswordCont = document.getElementsByClassName('edit-password__container')[0];

    var curPasswordInput = document.getElementsByClassName('current-password-input-field')[0];
    var newPasswordInput = document.getElementsByClassName('new-password-input-field')[0];

    editUserCancelBtn.addEventListener("click", hideEditUserModal);
    editUserBtn.addEventListener("click", showEditUserModal);
    editPasswordBtn.addEventListener("click", toggleEditPassword);

    function hideEditUserModal() {
        hideEditPassword();
        setDisplayNone(editUserModal);
        setDisplayBlock(userDetailsCont);
        setDisplayInline(editUserBtn);
        setDisplayNone(editUserCancelBtn);
    }

    function showEditUserModal() {
        setDisplayBlock(editUserModal);
        setDisplayNone(userDetailsCont);
        setDisplayNone(editUserBtn);
        setDisplayInline(editUserCancelBtn);
        curPasswordInput.focus();
    }

    function toggleEditPassword() {
        if (editPasswordCont.style.display === "block") {
            hideEditPassword();
        } else {
            showEditPassword();
        }
    }

    function hideEditPassword() {
        setDisplayNone(editPasswordCont);
        editPasswordBtn.innerHTML = "Change password";
    }

    function showEditPassword() {
        setDisplayBlock(editPasswordCont);
        editPasswordBtn.innerHTML = "Keep password";
        newPasswordInput.focus();
    }

}
