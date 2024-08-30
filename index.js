const form = document.querySelector(".form-container");
const openBtn = document.querySelector(".open-btn");
const cancelbtn = document.querySelector(".cancel-btn");
let images = [];
let id = 100;
let editId = null

function storeToLocal(){
    localStorage.setItem('imageGallery', JSON.stringify(images));
}

function loadFromLocal(){
    const storeImg = localStorage.getItem('imageGallery');
    if(storeImg){
        images = JSON.parse(storeImg);
        id = Math.max(...images.map(img=> img.id),0) + 1 ;
    }
}

function updateUI(addnew = true){
    const formname = document.querySelector("#form-name").value 
    const alttext = document.querySelector("#alt-text").value 
    const description = document.querySelector("#description").value
    const url = document.querySelector("#url").value
    
    if(editId !== null){
        const index = images.findIndex(img => img.id === editId)
        if(editId != -1){
            images[index] = {
                "id" : editId,
                "url" : url,
                "name" : formname,
                "alt" : alttext,
                "description" : description
            }
        }
        editId = null
    }
    else if(addnew){
        images.push({
            "id" : id++,
            "url" : url,
            "name" : formname,
            "alt" : alttext,
            "description" : description
        })
    }
    

    let gallery = document.querySelector("#image-gallery");
    gallery.innerHTML = '';
    images.map((image)=>{
        gallery.innerHTML += `
        <div id="${image.id}" class="box-container">
            <div class="image-container">
                <img src="${image.url}" alt="${image.alt}">
            </div>
            <h2 class="image-heading">${image.name}</h2>
            <p class="image-description">${image.description}</p>
            <div class="customize-btn">
                <button class="btn delete-btn">Delete</button>
                <button class="btn edit-btn">Edit</button>
            </div>
        </div>
        `
        console.log(image)
    })

    console.log(images)
    storeToLocal()
    deleteBind()
    editBind()
    
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    updateUI();
    form.reset();
})

openBtn.addEventListener("click", ()=>{
    form.style.display = "flex";
    openBtn.style.display = "none";
})

cancelbtn.addEventListener("click" ,(e)=>{
    e.preventDefault();
    form.style.display = "none";
    openBtn.style.display = "block"
    form.reset();
    editId = null;
    updateUI(false)
})

function deleteBind(){
    
    const deleteBtns = document.querySelectorAll(".delete-btn");
    
    deleteBtns.forEach(button => {
        button.addEventListener("click", () => {
            const ContId = parseInt(button.closest(".box-container").id);
            console.log(ContId, "this button id is clicked");

            const cardElement = document.getElementById(ContId);
            cardElement.remove();

            images = images.filter(image => image.id !== ContId);
            console.log("the remaining acards are", images);

            storeToLocal();
            // updateUI(false); 
        });
    });
}

function editBind(){
    const editBtns = document.querySelectorAll(".edit-btn");

    editBtns.forEach(button =>{

        button.addEventListener("click", ()=>{
            const ContId = parseInt(button.closest(".box-container").id);

            // const cardElement = document.getElementById(ContId);
            let cardDetails = images.find(image => image.id === ContId);
    
            document.querySelector("#form-name").value = cardDetails.name
            document.querySelector("#alt-text").value  = cardDetails.alt
            document.querySelector("#description").value = cardDetails.description
            document.querySelector("#url").value = cardDetails.url
    
            // images = images.filter(image => image.id !== ContId);
            editId = ContId;
            form.style.display = "flex";
            openBtn.style.display = "none"
        })
        
    })
}

loadFromLocal();
updateUI(false)
