
const tagContainer = document.querySelector('.tag_container');

const input= document.querySelector('.tag_container input');

let tags =[];


function createTags(lable) {

    //create div
    const div=document.createElement("div");
    div.setAttribute("class", "tag");

    //create span
    const span=document.createElement("span");
    span.innerHTML=lable;

    //create i
    const closebtn=document.createElement("i");
    closebtn.setAttribute("class", "material-icons");
    closebtn.setAttribute("id",lable);
    closebtn.setAttribute("data-item",lable);
    closebtn.innerHTML=`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">        <path fill="#000000" d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path></svg>`;
    console.log(closebtn);

    div.appendChild(span);
    div.appendChild(closebtn);
    return div;

}


//reset
function reset() {
    document.querySelectorAll('.tag').forEach(function(tag) {
        tag.parentElement.removeChild(tag);
        
    })
}



//add tags
function addTags() {
    reset();
    tags.slice().reverse().forEach(function(tag) {
        const input = createTags(tag);
        tagContainer.prepend(input);
        //console.log(tags);        
    })
    
}

//seprate each of input into tags
input.addEventListener('keyup', (e) => {
    if ((e.code === 'Space' || e.which === 32) || (e.key === 'Enter')){
      e.target.value.split(/,|#/).forEach(tag => {
        tags.push(tag);  
      });
      
      addTags();
      input.value = '';
    }
});





//delete
document.addEventListener('click', (e) => {
  console.log(e.target.tagName);
  console.log(e.target);
  if(e.target.tagName === 'svg'){
    e.target=console.log(e.target.parentElement);
  }
  if(e.target.tagName=== 'path'){
    e.target=console.log(e.target.parentElement.parentElement);
  }
  
  if(e.target.tagName === 'I') {
    const tagLabel = e.target.getAttribute('data-item');
    //console.log(tagLabel);
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    addTags();    
  }
})



// this below function uses ajax and send data to backend 

function sendData(e) {
  e.preventDefault()
  u = document.getElementById('url').value;
  d = document.getElementById('desc').value;
  document.getElementById('inputTag').value=tags;
  t = document.getElementById('inputTag').value.split(',');
  document.getElementById('inputTag').value="";
  console.log(u)
  let valueToSend = {
    url: u,
    desc: d,
    tags: t
  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5000/users/bookmarks',
    dataType: 'json',
    data: valueToSend,
    success: function (data) {
      alert(data);
    },
    error: function (error) {
      console.log(error);
    }
  });
}


document.querySelector('.btn').addEventListener('click', sendData);
