let form = document.querySelector('.user-info-form');
let inputGender = document.querySelector(".like-input");
let genderBlock = document.querySelector(".genders");
let genders= document.querySelectorAll(".gender");
let genderText = document.querySelector(".gender-text");
let inputs=document.getElementsByTagName("input");
let errorsText = document.querySelectorAll(".error-text");
let blockUploadedImages = document.querySelector(".uploaded-images");
let sendButton = document.querySelector(".send-button");
let sendFlag = document.querySelector('.form-sended');

let firstBlock =document.querySelector(".first-block");
let secondBlock = document.querySelector('.second-block');
let thirdBlock= document.querySelector('.upload');


const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

inputGender.onclick= function(){
    if(genderBlock.classList.contains("hidden")){
        genderBlock.classList.remove("hidden");
    }
    else{
        genderBlock.classList.add("hidden");
    }
};

for(let i=0;i<genders.length;++i){
    genders[i].onclick=function(){
        let male = genders[i].textContent;
        let arrow= '<img src="img/arrow.svg" alt="">';
        genderText.innerHTML=male+arrow;
        genderBlock.classList.add("hidden");
        inputGender.style.borderColor ="#8E43ED" ;
        genderText.style.color="#303030";
    };
};



for(let i=0;i<inputs.length;++i){
    inputs[i].addEventListener('keydown',(e)=>{
        if(e.keyCode == 13){
            e.preventDefault();
            return false;
        }
    });
     if(inputs[i].classList.contains('number')){
         inputs[i].oninput=function(){
            if(inputs[i].value.match(/\d\d[.]\d\d[.]\d\d\d\d/) && inputs[i].value.length === 10){
                inputs[i].style.borderColor= "#8E43ED";
                inputs[i].style.backgroundColor="#fff";
                errorsText[i].classList.add("hidden");
             }
            else if(inputs[i].value != ""){
                inputs[i].style.borderColor= "#ED4376";
                inputs[i].style.backgroundColor="#FFF5F5";
                errorsText[i].classList.remove("hidden");
            }
            else{
                inputs[i].style.borderColor= "#D4B1FF";
                inputs[i].style.backgroundColor="#fff";
                errorsText[i].classList.add("hidden");
            }
         };
     }
     else if(inputs[i].classList.contains('name')){
        inputs[i].oninput=function(){
            if(inputs[i].value.match(/^[a-zA-Z]+$/)){
                inputs[i].style.borderColor= "#8E43ED";
                inputs[i].style.backgroundColor="#fff";
                errorsText[i].classList.add("hidden");
            }
            else if(inputs[i].value != ""){
                inputs[i].style.borderColor= "#ED4376";
                inputs[i].style.backgroundColor="#FFF5F5";
                errorsText[i].classList.remove("hidden");
            }
            else{
                inputs[i].style.borderColor= "#D4B1FF";
                inputs[i].style.backgroundColor="#fff";
                errorsText[i].classList.add("hidden");
            }
        }
     }
     else{
        inputs[i].oninput=function(){
            if(inputs[i].value.match(/^[a-zA-Z\s]+$/)){
                inputs[i].style.borderColor= "#8E43ED";
                inputs[i].style.backgroundColor="#fff";
                errorsText[i].classList.add("hidden");
            }
            else if(inputs[i].value != ""){
                inputs[i].style.borderColor= "#ED4376";
                inputs[i].style.backgroundColor="#FFF5F5";
                errorsText[i].classList.remove("hidden");
            }
            else{
                inputs[i].style.borderColor= "#D4B1FF";
                inputs[i].style.backgroundColor="#fff";
                errorsText[i].classList.add("hidden");
            }
        }
     }
 }

 let fileUploader = document.querySelector("#file-upload");
 let imageCount=0;
 fileUploader.addEventListener('change',(e)=>{
    let files= e.target.files;
    let fileArray = Array.from(files);

    for(let i=0;i<fileArray.length;++i){
        let name=fileArray[i].name;
        let type = fileArray[i].type;
        type = type.slice(type.indexOf("/")+1).toUpperCase();
        let size = Math.round((fileArray[i].size/1048576)*10)/10;
        let img = document.createElement("img");
        img.src = window.URL.createObjectURL(fileArray[i]);
        img.height = 38;
        img.width = 38;

        let uploadedFileBlock = document.createElement("div");
        let fileInfoBlock = document.createElement("div");
        let fileName = document.createElement("p");
        let fileInfo = document.createElement("p");
        fileName.textContent = name.slice(0,name.indexOf("."));
        fileInfo.textContent = `${type} ${size} mb`;
        if(type === 'PNG' || type === 'JPG' || type === 'JPEG'){
            uploadedFileBlock.appendChild(img);
        }

        fileInfoBlock.appendChild(fileName);    
        fileInfoBlock.appendChild(fileInfo);
        uploadedFileBlock.setAttribute("class","uploaded-image");
        fileInfoBlock.setAttribute("class","uploaded-info");
        blockUploadedImages.appendChild(uploadedFileBlock);
        uploadedFileBlock.appendChild(fileInfoBlock);

        let deleteButton = document.createElement("img");
        let deleteUrl= 'img/delete.svg';
        deleteButton.src=deleteUrl;
        deleteButton.width=12;
        deleteButton.onclick=function(){
            fileArray.splice(i,1);
            blockUploadedImages.removeChild(uploadedFileBlock);
        }
        uploadedFileBlock.appendChild(deleteButton);       
    }
 });
 
 let sendButtonSwitch = setInterval(() => {
    let count=0;
    let uplFl = document.querySelectorAll(".uploaded-image");
    //console.log(imageCount);
     for(let i=0;i<errorsText.length;++i){
         if(errorsText[i].classList.contains("hidden")){
            ++count;  
         }      
     }
     if(count === errorsText.length && inputGender.textContent != 'Choose your gender' && uplFl.length != 0){
        sendButton.classList.remove("disabled");
     }
     else{
        sendButton.classList.add("disabled"); 
     }
 }, 100);
 sendButton.onclick=(e)=>{
     e.preventDefault();
     clearInterval(sendButtonSwitch);
    sendButton.classList.add("disabled"); 

    sendFlag.classList.remove("hidden");
 };
function validInput(input){
    if(input.style.borderColor === "rgb(142, 67, 237)"){
        return true
    }
    return false;
}
 let blockOpener = setInterval(() => {

    if (secondBlock.classList.contains("hidden")){
        let firstInput = firstBlock.querySelector("input");
        if(firstInput.value != "" &&  inputGender.textContent != 'Choose your gender' && validInput(firstInput)){
           secondBlock.classList.remove("hidden");
        }
    }
    if(thirdBlock.classList.contains("hidden") && !secondBlock.classList.contains("hidden")){
        let secondInputs = secondBlock.querySelectorAll("input");
        let validCount=0;
        for(let i=0;i<secondInputs.length;++i){
            if(validInput(secondInputs[i])){
                validCount++;
            } 
        }
 
        if(validCount===3){
            thirdBlock.classList.remove("hidden");
            clearInterval(blockOpener);
        }
    }
 }, 500);

let slider= document.querySelector('.slider');
let slides= document.querySelectorAll(".slide");
let prevArrow= document.querySelector(".prev-arrow");
let nextArrow = document.querySelector(".next-arrow");
let navBlock = document.querySelector(".slider-nav");
let navElements = document.querySelectorAll(".nav-element");
let deviceWidth = window.screen.width;
let images;
if(deviceWidth < 400){
    images= ['img/1mslide.jpg','img/2mslide.jpg','img/3mslide.jpg'];
}
else{
    images= ['img/1slide.jpg','img/2slide.jpg','img/3slide.jpg'];
}


let wrapper=document.querySelector(".wrapper");

for(let i=0;i<images.length;++i){
    slides[i].style.backgroundImage=`url(${images[i]})`;
}
let image1 = document.createElement("img");
image1.src = images[0];
let imageWidth=image1.naturalWidth;



function changeSlide(now,next){
    let firstblock;
    let secondBlock;
    if(now ===0 && next===2){
        firstblock = slides[next].cloneNode(true);
        secondBlock = slides[now].cloneNode(true); 
    }
    else if(now ===2 && next===0){
        firstblock = slides[now].cloneNode(true);
        secondBlock = slides[next].cloneNode(true);
        secondBlock.classList.add("active");
    }
    else if(now<next ){
        firstblock = slides[now].cloneNode(true);
        secondBlock = slides[next].cloneNode(true);
    }
    else if(now>next){
        firstblock = slides[next].cloneNode(true);
        secondBlock = slides[now].cloneNode(true);
        secondBlock.classList.add("active");
    }

        firstblock.classList.add("active");
        secondBlock.classList.add("active");
        wrapper.appendChild(firstblock);
        wrapper.appendChild(secondBlock);
    



    nextArrow.style.pointerEvents = 'none';
    prevArrow.style.pointerEvents = 'none';
    navBlock.style.pointerEvents = 'none';
    if(now ===0 && next===2){
        wrapper.animate([
            {transform:`translateX(-${imageWidth}px)`},
            {transform:"translateX(0px)"}
        ],1000);
    }
    else if(now ===2 && next===0){
        wrapper.animate([
            {transform:"translateX(0px)"},
            {transform:`translateX(-${imageWidth}px)`}
        ],1000);
    }
    else if(now>next ){
        wrapper.animate([
            {transform:`translateX(-${imageWidth}px)`},
            {transform:"translateX(0px)"}
        ],1000);
    }
    else if(now<next){
        wrapper.animate([
            {transform:"translateX(0px)"},
            {transform:`translateX(-${imageWidth}px)`}
        ],1000);
    }

    setTimeout(remover,1000);
    function remover(){
        wrapper.innerHTML=' ';
        nextArrow.style.pointerEvents = '';
        prevArrow.style.pointerEvents = '';
        navBlock.style.pointerEvents = '';
    }

   //let image1 = document.createElement("img");
   //image1.src = images[now];
   //let image2 = document.createElement("img");
   //image2.src = images[next];

   
}

function changeNav(now,next){
    navElements[now].classList.remove("active-nav");
    navElements[next].classList.add("active-nav");
}


function showSlide(i){
    setTimeout(show,1000);
    function show(){
        slides[i].style.opacity ="1";
    }
}
function hideSlide(i){
        slides[i].style.opacity ="0";
}

nextArrow.onclick = function(){
    let activeIndex=0;
    for(let i=0;i<slides.length;++i){
        if(slides[i].classList.contains("active")){
            activeIndex=i;
        }
    }
    if(activeIndex===2){
        changeSlide(activeIndex,0);
        slides[activeIndex].classList.remove("active");
        slides[0].classList.add("active");
        hideSlide(0);
        showSlide(0);
        changeNav(activeIndex, 0);
        
    }
    else{
        changeSlide(activeIndex,activeIndex+1);
        slides[activeIndex].classList.remove("active");
        slides[activeIndex+1].classList.add("active");
        hideSlide(activeIndex+1);
        showSlide(activeIndex+1);
        changeNav(activeIndex, activeIndex+1);
    }
};
prevArrow.onclick = function(){
    console.log("2");
    let activeIndex=0;
    for(let i=0;i<slides.length;++i){
        if(slides[i].classList.contains("active")){
            activeIndex=i;
        }
    }
    if(activeIndex===0){
        changeSlide(activeIndex,2);
        slides[activeIndex].classList.remove("active");
        slides[2].classList.add("active");
        hideSlide(2);
        showSlide(2);
        changeNav(activeIndex, 2);
    }
    else{
        changeSlide(activeIndex,activeIndex-1);
        slides[activeIndex].classList.remove("active");
        slides[activeIndex-1].classList.add("active");
        hideSlide(activeIndex-1);
        showSlide(activeIndex-1);
        changeNav(activeIndex,activeIndex-1);
    }
};
for(let i=0;i<navElements.length;++i){
    let showIndex=0;
    let activeIndex=0;

    navElements[i].addEventListener('click',()=>{
        showIndex=i;
        for(let j=0;j<navElements.length;++j){
            if(navElements[j].classList.contains("active-nav")){
                activeIndex=j;
            }
        }
        changeSlide(activeIndex,showIndex);
        slides[activeIndex].classList.remove("active");
        slides[showIndex].classList.add("active");
        hideSlide(showIndex);
        showSlide(showIndex);
        changeNav(activeIndex, showIndex);





    });
}