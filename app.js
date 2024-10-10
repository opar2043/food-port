document.getElementById('btn').addEventListener('click',function(){
    let input = document.getElementById('input').value ;
    console.log(input);

    // let btn2 = document.getElementById('btn2');
    // btn2.classList.remove('hidden')

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then(res => res.json())
        .then(data => sreachBtnMeal(data.meals))

        // let mainDiv = document.getElementById('mainDiv');
        // mainDiv.classList.add('hidden')
       
        document.getElementById('input').value = ''
   
})



function sreachBtnMeal(meals){

    console.log(meals);

    meals.forEach((meal)=>{

    let {strMeal,strArea,strMealThumb,strYoutube} = meal;

        let upperDiv = document.getElementById('upperDiv')
        let div = document.createElement('div');

        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl ">
        <figure class="px-10 pt-10">
          <img
            src="${strMealThumb}"
            class="rounded-xl object-cover" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${strMeal}</h2>
          <p class="font-semibold ">${strArea}</p>
          <a href="${strYoutube}" class="text-red-700 font-semibold">How to cook (Video)</a>

          <div class="card-actions">
            <button class="btn btn-primary" onclick="'${strMealThumb}', ${null}">view detils</button>
          </div>
        </div>
      </div>
    `

    upperDiv.appendChild(div)

    }) 
}





function allMealsFunction(){
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => showMealData(data.categories))
}

function showMealData(categories){

    console.log(categories);

    categories.forEach(category => {

        // console.log(category);

        let {strCategoryThumb,strCategory,strCategoryDescription} = category
        let mainDiv = document.getElementById('mainDiv');

        let div = document.createElement('div');
  
        div.innerHTML = `
            <div class="card bg-base-100 shadow-xl ">
            <figure class="px-10 pt-10">
              <img
                src="${strCategoryThumb}"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title font-bold">${strCategory}</h2>
              
              <div class="card-actions">
                <button class="btn btn-primary" onclick="details('${strCategoryDescription || 'na'}', '${strCategoryThumb}')">view detils</button>
              </div>
            </div>
          </div>
        `

        mainDiv.appendChild(div)
    });
}

function details(description, img) {
  let modal = document.getElementById('modal');

  // Clear any existing modal content
  modal.innerHTML = '';

  // Create new modal content
  let div = document.createElement('div');
  div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <img src="${img}" class="rounded-xl" alt="Category Image" />
        <h3 class="text-lg font-bold">Details</h3>
        <p class="py-4">${description}</p>
        <div class="modal-action">
          <button class="btn bg-red-500" onclick="closeModal()">Close</button>
        </div>
      </div>
    </dialog>
  `;

  // Append the modal to the container
  modal.appendChild(div);

  // Show the modal
  let modalElement = document.getElementById('my_modal_1');
  modalElement.showModal();
}

function closeModal() {
  let modalElement = document.getElementById('my_modal_1');
  modalElement.close();
}

allMealsFunction()


// category button

function categoryBtn(){
 
  fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(res => res.json())
        .then(data => {

          let categories = (data.categories)
          console.log((categories));

          categories.forEach((makeBtn)=>{
                  // console.log(makeBtn);

                  let btnDiv = document.getElementById('btnDiv') 

                  let {idCategory,strCategory} = makeBtn

                  let btn = document.createElement('button');
                  btn.classList.add('btn-active','btn','btn-accent','text-white')
                  // console.log(btn);

                  btn.innerText = strCategory;
                  btn.addEventListener('click',function(){
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
                    .then(res => res.json())
                     .then(data => showMealData(data.meals))
                    // .then(data => showMealData(data))
                    .catch(error => console.error('Error fetching data:', error));
                  
                  })

                  btnDiv.appendChild(btn)
          })
        })


}

categoryBtn()