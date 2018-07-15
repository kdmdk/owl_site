function scrollToTop(){

    var y = document.body.scrollTop || document.documentElement.scrollTop;
    if(y){
        scrollTo(0,y/=1.06);
        setTimeout(scrollToTop,1);
    }
}
