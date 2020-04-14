let input,mainDiv,idNum=0;
let tag=[],tags,html,count=0;
let taglist=[];
​
​
input=document.querySelector('#taginput');
tags=input.value;
mainDiv=document.querySelector("#master");
​
​
function add(){
    tags=input.value;
    tag=tags.split(/,|#|\s/);
    tag = tag.filter(e => String(e).trim());
    taglist=taglist.concat(tag);
    console.log(taglist);
​
    
    tag.forEach(element => {
        //creaing new span
        let Span_new=document.createElement('span');
        // Span_new.setAttribute('id',`span_`+(count+1));
        Span_new.innerHTML=element;
        //creating new button
        let btn_new=document.createElement('button');
        btn_new.setAttribute('id',`button_`+(count+1));
        btn_new.setAttribute('class',`tag-btn`);
        //onclick to delete that elements
        btn_new.onclick=(event)=>{
            //console.log(event);
    
            //tag to be reomnoved from array
            delElemnt=Span_new.innerText;
            console.log(taglist.splice(delElemnt, 1));
​
            //tag to be removed from display
            delSpan=Span_new.parentElement.removeChild(Span_new);
            console.log(delSpan);
            console.log(tag);
            console.log(taglist);
            
​
        }
        btn_new.innerHTML=`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
            <path fill="#000000" d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path></svg>`
        count++;
        Span_new.appendChild(btn_new);   
        document.querySelector(`#master`).insertAdjacentElement('afterbegin',Span_new);
        input.value="";  
        
    });   
​
}
​
​
​
input.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13){
        console.log("event:",tag);      
        add();
    }
});
​
​
//module.exports =taglist