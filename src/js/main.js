document.querySelector('.burger').addEventListener('click', function(){
    document.querySelector('.burger span').classList.toggle('active');
    document.querySelector('.menu').classList.toggle("animate");
  })


  window.onscroll = function changestate() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var menu = document.querySelector('.menu');

    if(scrolled >= 30) {
      document.querySelector('.burger span').classList.remove('active');
     document.querySelector('.menu').classList.remove("animate");
    }
  }
  
