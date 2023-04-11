let popbox=document.querySelector('.popup');
let popbox2=document.querySelector('.popup2');
let plus=document.querySelector('.plus');
let txt=document.querySelector('#newtxt');
let txt2=document.querySelector('#items-txt');
const box=document.querySelector('.box');
const noitemtxt=document.querySelector('.noitem');


function addTask(){
    popbox.style.display = "block";
    document.querySelector('.blur').style.opacity="17%";
}

let data=[];
let card_id;


function addCards(){
    popbox.style.display = "none";
    document.querySelector('.blur').style.opacity="100%";
    const mytxt=txt.value;
    txt.value="";
    const cardsdata={
        id:new Date().getTime().toString(),
        title:mytxt,
        content:[]
    };
    if(mytxt){
        data.push(cardsdata);//adding cards data into array
        add();
    }
    else{
        alert("please enter card title");
    }
    // txt.value="";
    // close();
}

function add(){
    let child="";
    for(let i=0;i<data.length;i++){
        child+=`<div class=cards id=${data[i].id} ><h2 class="title" onclick=filter(${data[i].id})>${data[i].title}</h2>
                <hr>
                    <ul id="content_${data[i].id}" class="carditems"></ul>
                    <div class=card-buttons>
                        <button class="addItem" onclick="Itempopup(${data[i].id})"><span class="material-symbols-outlined symbol">add</span></button>
                        <button class="delete" onclick="Delete(${data[i].id})"><span class="material-symbols-outlined dlt">delete</span></button>
                    </div>
                </div>`;
    }
    document.querySelector('.container').innerHTML=child;
    handleItems();
    noitemtxt.style.display="none";
}



function Close(){
    popbox.style.display = "none";
    txt.value="";
    document.querySelector('.blur').style.opacity="100%";

    popbox2.style.display = "none";
    txt2.value="";
}

function Itempopup(id){
    popbox2.style.display="block";
    card_id=id;
    // document.querySelector('.blur').style.opacity="17%";
}

//deleting the cards (also from dom)
function Delete(id){
    const card_id=`${id}`;
    const card=document.getElementById(card_id);
    card.parentNode.removeChild(card);
    data=data.filter(item=>item.id!==card_id);
    // noitemtxt.style.display="block";

}

//adding tasks list into card
function AddItems(){
    popbox2.style.display = "none";
    const itemstxt=txt2.value;
    txt2.value="";
    // const listid=`content_${card_id}`;
    if(!itemstxt){
        alert("please enter tasks");
    }
    else{
        const ulid=`content_${card_id}`;
        const ul=document.getElementById(ulid);
        const list=document.createElement('li');
        const id=new Date().getTime().toString();
        list.innerHTML=itemstxt;
        list.id=`content_${id}`;
        list.className="items";
        list.onclick=function(){
            done(id,card_id);
        }
        ul.appendChild(list);
        for(let i=0;i<data.length;i++){
            if(data[i].id==card_id){
                const content={
                    id:id,
                    contenttxt:itemstxt,
                    done:false,
                }
                data[i].content.push(content);
            }
        }
        
    }
}

function handleItems(){
    for(let i=0;i<data.length;i++){
        const ul=document.getElementById(`content_${data[i].id}`);
        let child="";
        
        for(let j=0;j<data[i].content.length;j++){
            const content=data[i].content[j];
            child+=`<li id=content_${content.id} class=items ${content.done ? "checked":""} onclick=done(${content.id},${data[i].id})>${content.contenttxt}</li>`;
            // console.log(content.id); onclick=done(content.id,data[i].id)${content.done ? "checked":""}
        }
        ul.innerHTML=child;
        
    }
    // console.log(data);
}

function done(listid,cardid){
    const items_id=`content_${listid}`;
    const list=document.getElementById(items_id);
    list.classList.toggle("checked");
    // if(list.style.textDecoration==='line-through' && list.style.color==='red' ){
    //     list.style.textDecoration==='none';
    //     console.log(list.innerText);
    // }
    // else{
    //     list.style.textDecoration='line-through';
    //     list.style.color="red";
    // }

    // for(let i=0;i<data.length;i++){
    //     if(data[i].id==cardid){
    //         for(let j=0;i<data[i].content.length;j++){
    //             if(items_id==listid){
    //                 data[i].content[j].done=true;
    //             }
    //         }
    //     }
    // }
}

let id;
// let count=0;
function filter(cid){
    let c=document.getElementById(cid);
    const cardtit=c.querySelector('.title');
    let blur=document.querySelector('.blur');
    id=cid;
    
    blur.style.opacity='5%';
    document.querySelector('.cardtitle').innerText=cardtit.innerText;
    let div=document.querySelector('.specificCard');
    div.style.display="block";

    popbox2.style.zIndex="3"; 
    div.append(c);
    // console.log(div);
}

function back(){
    let backbtn=document.querySelector('.back');
    let blur=document.querySelector('.blur');
    let div=document.querySelector('.specificCard');
    let c=document.getElementById(id);

    document.getElementById(id).style.display='none';
    div.style.display='none';
    blur.style.opacity='100%';
    add();
}