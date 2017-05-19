var updateBlog = new UpdateBlog();
var deleteBlog = new DeleteBlog();

function setDisplayNone(elem) {
    elem.style.display = "none";
}

function setDisplayBlock(elem) {
    elem.style.display = "block";
}


function DeleteBlog() {
    var delBlogModals = document.getElementsByClassName('delete-blog-modal');
    // var delBlogForms = document.getElementsByClassName('delete-blog-form');
    var delBlogBtns = document.getElementsByClassName('blog-list__del-blog-btn');
    var cancelBtns = document.getElementsByClassName('delete-blog__cancel-btn');


    for (let k = 0; k < delBlogBtns.length; k++) {
        delBlogBtns[k].addEventListener("click", function() {
            setDisplayBlock(delBlogModals[k]);
        });
        cancelBtns[k].addEventListener("click", function() {
            setDisplayNone(delBlogModals[k]);
        });
    }
    // for (let k = 0; k < cancelBtns.length; k++) {
    //
    // }
}



function UpdateBlog() {

    var editBlogBtns = document.getElementsByClassName('blog-list__edit-blog-btn');
    var updateBlogFormContainers = document.getElementsByClassName('update-blog-form__container');
    var blogTitles = document.getElementsByClassName('blog-list__blog-title')
    var blogContents = document.getElementsByClassName('blog-list__blog-content')

    for (let k = 0; k < editBlogBtns.length; k++) {
        editBlogBtns[k].addEventListener("click", function() {
            toggleEditBlogForm(k);
        });
    }

    function toggleEditBlogForm(blogNum) {
        if (updateBlogFormContainers[blogNum].style.display === "block") {
            closeEditBlog(blogNum);
        } else {
            openEditBlog(blogNum);
        }
    }

    function closeEditBlog(blogNum) {
        setDisplayNone(updateBlogFormContainers[blogNum]);
        setDisplayBlock(blogContents[blogNum]);
        editBlogBtns[blogNum].innerHTML = "Edit blog"
    }

    function openEditBlog(blogNum) {
        setDisplayBlock(updateBlogFormContainers[blogNum]);
        setDisplayNone(blogContents[blogNum]);
        editBlogBtns[blogNum].innerHTML = "Close edit"
    }


}
