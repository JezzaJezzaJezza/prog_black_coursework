var comment_flag = true
function abt_entered(){
    var abt_text = document.getElementById("abt_overlay")
        unfade(abt_text)
       
}

function abt_left(){
    var abt_text = document.getElementById("abt_overlay")
        fade(abt_text)
}

function help_entered(){
    var help_text = document.getElementById("help_overlay")
        unfade(help_text)
}

function help_left(){
    var help_text = document.getElementById("help_overlay")
        fade(help_text)
}

function showForm(){
    var  show_form = document.getElementById("form_div")
    unfade(show_form)
}

function showCommentForm(){
    var show_comment_form = document.getElementById("comment_form_div")
    unfade(show_comment_form)
}
//
 
/* Code below adapted from the code found at https://www.w3docs.com/snippets/javascript/how-to-detect-a-click-outside-an-element.html - viewed on Jan 1st 2023 */
document.addEventListener("click", (evt) => {
    const flyoutEl = document.getElementById("form_div");;
    const create_btn = document.getElementById("load_review_form");
    let targetEl = evt.target;     
    do {
      if(targetEl == flyoutEl) {
        return;
      } else if(targetEl == create_btn){
        return;
      }
      targetEl = targetEl.parentNode;
    } while (targetEl);   
    fade(flyoutEl)
});
var db_flyout = false

document.addEventListener("click", (evt) => {
    const flyoutEl = document.getElementById("form_comment_div");
    const create_btn = document.getElementById("comment_btn");
    let targetEl = evt.target;     
    do {
      if(targetEl == flyoutEl) {
        return;
      } else if(targetEl == create_btn){
        return;
      }
      targetEl = targetEl.parentNode;
    } while (targetEl);   
    fade(flyoutEl)
});



/* code for fade function and unfade function were taken from the following page: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css - viewed on Dec 28th 2022 */
function fade(element) {
    var op = 1; 
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.5;
    }, 30);
}

function unfade(element) {
    var op = 0.1;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.5;
    }, 10);
}