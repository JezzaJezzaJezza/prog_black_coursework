const endpoint_root = "http://127.0.0.1:5510/";


let the_list = "";
 async function list_posts(){
  
  try {
    const post_response = await fetch(endpoint_root + "posts");
    const post_key_text = await post_response.text();
    const post_keys = JSON.parse(post_key_text);
    const post_list = document.getElementById("list_of_posts");
    get_attributes(post_keys);
    post_list.innerHTML = the_list;
    the_list = ""
  } catch(e) {
    const post_list = document.getElementById("list_of_posts");
    console.log("caught");
    the_list = "";
    the_list += `<h3 class="list_the_post" style="position: relative; margin-top: 2%;">Oops. Looks like something went wrong with the server. Perhaps you are not connected to the internet?</h3>`
    post_list.innerHTML = the_list;
    the_list = "";
  }
};

 async function get_attributes(post_keys){
  const post_list = document.getElementById("list_of_posts");
  for (const post_key1 of post_keys) {
  
  //const attribute_list = document.getElementById("list_post_attributes")
  const post_response = await fetch(`http://127.0.0.1:5510/posts/${post_key1}/`);
  const post_content = await post_response.text();
  const readable_content = JSON.parse(post_content)
  
  the_list += `
  <h3 class="list_the_post" style="position: relative; margin-top: 2%;">${readable_content.key}</h3>
  <hr class="text-white" size="5" style="width: 87%; margin: 0 auto;">
    <p class="list_the_attribute" style="position: relative; padding:1%;">Opinion: ${readable_content.desc_rev}</p>
    <hr class="text-white" size="5" style="width: 87%; margin: 0 auto; margin-top: -2%;margin-bottom: 2%;">
    <p class="list_the_attribute" style="position: relative; padding:0.1%; margin-top: -2%;">${readable_content.ratings}/10</p>
    <form id="comment_form${post_key1}">
    <div class="form_field">
    <label>Comment:</label>
    <input type="text" id="comment" name="comment" placeholder="Criticize their opinion..." style="width:70%;" required/>
    <input type="hidden" id="key" name="key" value="${post_key1}">
    <small></small>
    </div>
    <div class="form_field" style="padding: 10px;">
    <input type="submit" onclick="comment_getter(${post_key1})"  style="border: none; border-radius: 7px 7px 7px 7px;"/>
    <small></small>
    </div>
    </form>`;
    //const myTimeout = setTimeout(get_comments(post_key1), 3000);
    get_comments(post_key1);
    }
  //post_list.innerHTML = the_list;
  
 };

 async function comment_getter(in_key, event){
  const the_right_form = document.getElementById("comment_form"+in_key)
  the_right_form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const comment_form_data = new FormData(the_right_form);
  const comment_form_data_json = JSON.stringify(Object.fromEntries(comment_form_data));
  const response = await fetch(endpoint_root + "new_comment",
    {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: comment_form_data_json
    });
    the_right_form.reset();
    list_posts();
  })
};


async function get_comments(link_post_key){
  const comment_response = await fetch(endpoint_root + "comments");
  const comment_key_text = await comment_response.text();
  const comment_array = JSON.parse(comment_key_text);
  const post_list = document.getElementById("list_of_posts");

  for (let i = 0; i < comment_array.length; i++) {
    if (link_post_key == comment_array[i].key){
      
    the_list += `<p class="list_the_comment" style="position: relative; padding:1%; border:3px solid #e5e5e5;border-radius: 9px 9px 9px 9px; margin-top:1%;margin-bottom:2%;">${comment_array[i].comment}</p>`
    }
  }
  post_list.innerHTML = the_list;
};

 async function get_form() {  
  const revForm = document.getElementById("reviewForm");
  revForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const form_data = new FormData(revForm);
    const form_data_json = JSON.stringify(Object.fromEntries(form_data));
    const response = await fetch(endpoint_root + "new_rev",
    {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: form_data_json
    });
    console.log("form submitted")
    revForm.reset();
    list_posts();
  })
 };
 

 //document.addEventListener("DOMContentLoaded", comment_getter);
 document.addEventListener("DOMContentLoaded", get_comments);
 document.addEventListener("DOMContentLoaded", list_posts);
 document.addEventListener("DOMContentLoaded", get_form);
 
  