var updateBlog = new UpdateBlog();
var deleteBlog = new DeleteBlog();

function setDisplayNone(elem) {
    elem.style.display = "none";
}

function setDisplayBlock(elem) {
    elem.style.display = "block";
}

function setDisplayInline(elem) {
    elem.style.display = "inline";
}

function DeleteBlog() {
    var delBlogModals = document.getElementsByClassName('delete-blog-modal');
    var delBlogBtns = document.getElementsByClassName('blog-list__del-blog-btn');
    var cancelBtns = document.getElementsByClassName('delete-blog__cancel-btn');

    for (let k = 0; k < delBlogBtns.length; k++) {
        delBlogBtns[k].addEventListener("click", function() {
            setDisplayBlock(delBlogModals[k]);
            setDisplayNone(delBlogBtns[k]);
        });
        cancelBtns[k].addEventListener("click", function() {
            setDisplayNone(delBlogModals[k]);
            setDisplayInline(delBlogBtns[k]);
        });
    }
}


function UpdateBlog() {

    var editBlogBtns = document.getElementsByClassName('blog-list__edit-blog-btn');
    var cancelEditBlogBtns = document.getElementsByClassName('blog-list__cancel-edit-blog-btn');
    var updateBlogFormContainers = document.getElementsByClassName('update-blog-form__container');
    var blogTitles = document.getElementsByClassName('blog-list__blog-title')
    var blogContents = document.getElementsByClassName('blog-list__blog-content')

    for (let k = 0; k < editBlogBtns.length; k++) {
        editBlogBtns[k].addEventListener("click", function() {
            openEditBlog(k);
        });
        cancelEditBlogBtns[k].addEventListener("click", function() {
            closeEditBlog(k);
        });
    }

    function closeEditBlog(blogNum) {
        setDisplayNone(updateBlogFormContainers[blogNum]);
        setDisplayBlock(blogContents[blogNum]);
        setDisplayInline(editBlogBtns[blogNum]);
        setDisplayNone(cancelEditBlogBtns[blogNum]);
    }

    function openEditBlog(blogNum) {
        setDisplayBlock(updateBlogFormContainers[blogNum]);
        setDisplayNone(blogContents[blogNum]);
        setDisplayNone(editBlogBtns[blogNum]);
        setDisplayInline(cancelEditBlogBtns[blogNum]);
    }
}
