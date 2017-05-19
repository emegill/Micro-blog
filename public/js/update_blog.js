var updateBlog = new UpdateBlog();

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
        // setDisplayBlock(blogTitles[blogNum]);
        setDisplayBlock(blogContents[blogNum]);
        editBlogBtns[blogNum].innerHTML = "Edit blog"
    }

    function openEditBlog(blogNum) {
        setDisplayBlock(updateBlogFormContainers[blogNum]);
        // setDisplayNone(blogTitles[blogNum]);
        setDisplayNone(blogContents[blogNum]);
        editBlogBtns[blogNum].innerHTML = "Close edit"
    }

    function setDisplayNone(elem) {
        elem.style.display = "none";
    }

    function setDisplayBlock(elem) {
        elem.style.display = "block";
    }

}
