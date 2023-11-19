const openLeftBar = document.querySelector('#openSideBar'),
closeLeftBar = document.querySelector('#closeSideBar'),
leftBar = document.querySelector('#left-bar');
 
openLeftBar.onclick = () => {
    //veririca se possui active, se não tiver,adiciona, se tiver,remove
    leftBar.classList.toggle("active");
}
leftBar.onclick = () => {
    leftBar.classList.toggle("active");
}