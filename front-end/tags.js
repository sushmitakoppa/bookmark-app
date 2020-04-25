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
    closebtn.setAttribute("class", "material-icons md-18");
    closebtn.setAttribute("id",lable);
    closebtn.setAttribute("data-item",lable);
    closebtn.innerHTML=`clear`;
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

  if(e.target.tagName === 'I') {
    const tagLabel = e.target.getAttribute('data-item');
    //console.log(tagLabel);
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    addTags();    
  }
})


                        //////////////////POST///////////// 

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


document.querySelector('#btn').addEventListener('click', sendData);


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
                         //////////////////GET///////////// 

function getData(){
  // e.preventDefault();

  $.ajax({
    type: 'GET',
    url: 'http://localhost:5000/users/bookmarks/list',
    dataType: 'json',
    success: function (data) {
      // alert(data);
      // console.log(data);
      list(data);
    },
    error: function (error) {
      console.log(error);
    }
  });

}
function list(data){
  
  let lists = data;
  console.log('list from ajax:',lists);
  console.log(lists.length);
  let resultTags = lists.map(t => t.tags);
  let resultUrl = lists.map(u => u.url);
  let resultDesc = lists.map(d => d.desc);
  console.log(resultTags);
  console.log(resultUrl);
  console.log(resultDesc);
  //Showtable();
  // console.log("lists[0]",lists[0]);
  // console.log("lists[1]",lists[1]);
  // console.log("lists[2]",lists[2]);

  let table=`
  <table class="table table-striped">
    <thead>
        <tr>
            <th>  url  </th>
            <th>  description  </th>
            <th>  tags  </th>
        </tr>
    </thead>
    <tbody id ="tbody">             
    </tbody>

  </table>`;
  let tr=[];
  for(let i = 0 ; i <= lists.length ; i++){
    tr[i] =`<tr>  <td>${resultUrl[i]}</td>
                  <td>${resultDesc[i]}</td> 
                  <td>${resultTags[i]}</td>
            </tr>`;
  }

  
  document.querySelector('#table').insertAdjacentHTML('afterbegin',table);
  document.querySelector("#tbody").innerHTML = tr.join("");
}


document.querySelector('#dataShow').addEventListener('click', getData);




///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

                         /////////////////////PUT////////// 


                         /////////////////////DELETE////////// 
