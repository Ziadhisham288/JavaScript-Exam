
$(document).ready(() => {

    let loadingScreen = document.getElementById("loadingScreen");

    loadingScreen.classList.replace("d-none", "d-flex");
    setTimeout(() => {
        getMealsByName()
    }, 1000);


    async function getMealsByName(name) {
        if (name == undefined) {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
            const response = await api.json();
            const { meals: homeMeals } = response;
            displayMeals(homeMeals);

            $("#homeBtn").on("click", () => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#detailsPage").css("display", "none");
                $("#mealCategories").css("display", "none")
                $("#mealAreas").css("display", "none")
                $("#search").css("display", "none")
                $("#mealIngredients").css("display", "none");
                $("#contactUs").css("display", "none");
                $("#mealsByArea").css("display", "none");
                $("#mealsByIngredient").css("display", "none");
                $("#mealByCategory").css("display", "none");

                setTimeout(() => {
                    displayMeals(homeMeals)
                }, 700);

            })
        } else {
            let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            let response = await api.json();
            let { meals: mealsByName } = response;
            displayMealsByName(mealsByName);
        }


    }

    function displayMeals(list) {
        $("#home").css("display", "flex");
        $("#mealCategories").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#search").css("display", "none");
        loadingScreen.classList.replace("d-flex", "d-none");


        let cartona = ``;
        for (let i = 0; i < 20; i++) {
            cartona +=
                `<div data-id="${list[i].idMeal}" class="card col-md-3 p-2 bg-transparent">
                <div data-id="${list[i].idMeal}" class="inner overflow-hidden rounded-2">
                    <div data-id="${list[i].idMeal}" class="image position-relative">
                        <img src="${list[i].strMealThumb}" alt="" class="w-100">
                        <div data-id="${list[i].idMeal}" class="layer flex-column justify-content-center position-absolute">
                            <p data-id="${list[i].idMeal}" >${list[i].strMeal}</p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        $("#myData").html(cartona);


        cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#home").css("display", "none");
                setTimeout(() => {
                    getMealDetails(e.target.getAttribute("data-id"))
                }, 2000)
            })
        }

    }

    async function getMealDetails(id) {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const response = await api.json();
        const { meals: meal } = response;
        displayMealDetails(meal);
    }

    function displayMealDetails(list) {
        $("#home").css("display", "none");
        $("#mealsByArea").css("display", "none");
        $("#detailsPage").css("display", "flex");
        $("#mealsByIngredient").css("display", "none");
        $("#mealCategories").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#search").css("display", "none");
        $("#mealIngredients").css("display", "none");

        loadingScreen.classList.replace("d-flex", "d-none");


        for (let i = 0; i <= list.length; i++) {
            let tags = list[i].strTags?.split(",")
            if (!tags) tags = []

            let tagsStr = ''
            for (let i = 0; i < tags.length; i++) {
                tagsStr += `
        <li class="m-2 p-1 text-white bg-info p-1 rounded-1">${tags[i]}</li>`
            }

            document.getElementById("details").innerHTML = `<div class="col-md-4 pt-4">
        <img src="${list[i].strMealThumb}" class="w-100" alt="">
        <p>${list[i].strMeal}</p>
    </div>
    <div class="col-md-8 pt-4">
        <h2 class="mb-2">Instructions</h2>
        <p class="mb-3">${list[i].strInstructions}</p>
        <h4 class="mb-3">Area: ${list[i].strArea} </h4>
        <h4 class="mb-3">Category: ${list[i].strCategory} </h4>
        <div>
        <h3 class="mb-2">Recipes: </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class='bg-info text-white p-1 rounded-1'>${list[i].strIngredient1}</li>
            <li class='bg-info text-white p-1 rounded-1'>${list[i].strIngredient2}</li>
            <li class='bg-info text-white p-1 rounded-1'>${list[i].strIngredient3}</li>
            <li class='bg-info text-white p-1 rounded-1'>${list[i].strIngredient4}</li>
            <li class='bg-info text-white p-1 rounded-1'>${list[i].strIngredient5}</li>
        </ul>
        </div>
        <h4 class="mb-2">Tags: </h4>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
        <div class="buttons">
            <button id="sourceBtn" class="py-1 px-2 bg-success"><a class="text-decoration-none text-white" href="${list[i].strSource}">Source</a></button>
            <button id="youtubeBtn" class="py-1 px-2 bg-danger"><a class="text-decoration-none text-white" href="${list[i].strYoutube}">Youtube</a></button>
        </div>
    </div>`
        }

    }

    async function getMealCategories() {
        const api = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const response = await api.json();
        const { categories: mealCategories } = response;
        displayMealCategories(mealCategories)
    }

    function displayMealCategories(list) {
        $("#home").css("display", "none")
        $("#mealsByArea").css("display", "none");
        $("#mealCategories").css("display", "flex")
        $("#mealAreas").css("display", "none")
        $("#search").css("display", "none")
        $("#detailsPage").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#mealIngredients").css("display", "none");




        loadingScreen.classList.replace("d-flex", "d-none");


        let cartona = ``;
        for (let i = 0; i < list.length; i++) {
            cartona += `<div class="col-md-3 p-2 bg-transparent">
            <div data-category="${list[i].strCategory}" class="categoryCard inner overflow-hidden rounded-2">
                <div data-category="${list[i].strCategory}" class="image position-relative">
                    <img data-category="${list[i].strCategory}" src="${list[i].strCategoryThumb}" class="w-100" alt="">
                    <div data-category="${list[i].strCategory}" class="layer position-absolute d-flex flex-column text-center">
                        <h3 data-category="${list[i].strCategory}">${list[i].strCategory}</h3>
                        <p data-category="${list[i].strCategory}" >${list[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        </div>`
        }

        $("#categoryData").html(cartona);

        let cards = document.querySelectorAll(".categoryCard");
        console.log(cards);

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealCategories").css("display", "none")
                let mealCategory = e.target.getAttribute("data-category");
                setTimeout(() => {
                    getMealbyCategory(mealCategory);
                }, 1000);
            })
        }

    }

    async function getMealbyCategory(category) {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const response = await api.json();
        const { meals: mealsByCategory } = response;
        displayMealsByCategory(mealsByCategory);
    }

    function displayMealsByCategory(list) {
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none");
        $("#mealsByArea").css("display", "none");
        $("#mealByCategory").css("display", "flex");
        $("#mealsByIngredient").css("display", "none");
        $("#search").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealIngredients").css("display", "none");

        loadingScreen.classList.replace("d-flex", "d-none");


        let cartona = ``;
        for (let i = 0; i < list.length; i++) {
            cartona += `<div data-id="${list[i].idMeal}" class="card col-md-3 p-2 bg-transparent">
            <div data-id="${list[i].idMeal}" class="inner overflow-hidden rounded-2">
                <div data-id="${list[i].idMeal}" class="image position-relative">
                    <img data-id="${list[i].idMeal}" src="${list[i].strMealThumb}" alt="" class="w-100">
                    <div data-id="${list[i].idMeal}" class="layer flex-column justify-content-center position-absolute">
                        <p data-id="${list[i].idMeal}" >${list[i].strMeal}</p>
                    </div>
                </div>
            </div>
        </div>`
        }

        document.getElementById("categoryRecipes").innerHTML = cartona;

        let cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealByCategory").css("display", "none");
                setTimeout(() => {
                    getMealDetails(e.target.getAttribute("data-id"))
                }, 1000)
            })
        }
    }

    async function getMealAreas() {
        let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        let response = await api.json();
        let { meals: mealAreas } = response;
        displayMealAreas(mealAreas)
    }

    function displayMealAreas(list) {
        $("#home").css("display", "none")
        $("#mealsByArea").css("display", "none");
        $("#mealCategories").css("display", "none")
        $("#mealAreas").css("display", "flex")
        $("#detailsPage").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#mealIngredients").css("display", "none");




        loadingScreen.classList.replace("d-flex", "d-none");


        let cartona = ``;
        for (let i = 0; i < list.length; i++) {
            cartona += `<div class="col-md-3 p-2 bg-transparent text-white">
            <div data-area="${list[i].strArea}" class="areaCard inner overflow-hidden rounded-2">
                <div data-area="${list[i].strArea}" class="image text-center">
                    <img data-area="${list[i].strArea}" src="./images/areaLogo.png" class="w-50 m-auto" alt="">
                    <h3 data-area="${list[i].strArea}">${list[i].strArea}</h3>
                </div>
            </div>
        </div>`
        }

        $("#areaData").html(cartona);

        let cards = document.querySelectorAll(".areaCard");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealAreas").css("display", "none")
                let mealArea = e.target.getAttribute("data-area");
                setTimeout(() => {
                    getMealByArea(mealArea);
                }, 1000);
            })
        }
    }

    async function getMealByArea(area) {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const response = await api.json();
        const { meals: mealsByArea } = response;
        displayMealsByArea(mealsByArea);
    }

    function displayMealsByArea(list) {
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#mealAreas").css("display", "none")
        $("#search").css("display", "none")
        $("#mealsByArea").css("display", "flex");
        $("#mealsByIngredient").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealIngredients").css("display", "none");


        loadingScreen.classList.replace("d-flex", "d-none");


        let cartona = ``;
        for (let i = 0; i < list.length; i++) {
            cartona += `<div data-id="${list[i].idMeal}" class="card col-md-3 p-2 bg-transparent">
            <div data-id="${list[i].idMeal}" class="inner overflow-hidden rounded-2">
                <div data-id="${list[i].idMeal}" class="image position-relative">
                    <img data-id="${list[i].idMeal}" src="${list[i].strMealThumb}" alt="" class="w-100">
                    <div data-id="${list[i].idMeal}" class="layer flex-column justify-content-center position-absolute">
                        <p data-id="${list[i].idMeal}" >${list[i].strMeal}</p>
                    </div>
                </div>
            </div>
        </div>`
        }

        document.getElementById("areaRecipes").innerHTML = cartona;

        let cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealsByArea").css("display", "none");
                setTimeout(() => {
                    getMealDetails(e.target.getAttribute("data-id"))
                }, 1000)
            })
        }
    }

    async function getMealIngredients() {
        let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        let response = await api.json();
        let { meals: mealIngredients } = response;
        displayMealIngredients(mealIngredients)
    }

    function displayMealIngredients(list) {
        $("#home").css("display", "none")
        $("#mealCategories").css("display", "none")
        $("#mealsByArea").css("display", "none");
        $("#mealAreas").css("display", "none")
        $("#search").css("display", "none")
        $("#mealIngredients").css("display", "flex")
        $("#detailsPage").css("display", "none");
        $("#mealByCategory").css("display", "none");


        loadingScreen.classList.replace("d-flex", "d-none");


        let cartona = ``;
        for (let i = 0; i < 20; i++) {
            cartona += `<div data-ingredient="${list[i].strIngredient}" class="ingredientCard col-md-3 p-2 bg-transparent text-white">
            <div data-ingredient="${list[i].strIngredient}" class="inner overflow-hidden rounded-2">
                <div data-ingredient="${list[i].strIngredient}" class="image text-center">
                    <img data-ingredient="${list[i].strIngredient}" src="./images/ingredientImage.png" class="w-50 m-auto" alt="">
                    <h3 data-ingredient="${list[i].strIngredient}">${list[i].strIngredient}</h3>
                </div>
            </div>
        </div>`
        }

        $("#ingredientsData").html(cartona);

        let cards = document.querySelectorAll(".ingredientCard");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealIngredients").css("display", "none")
                let mealIngredient = e.target.getAttribute("data-ingredient");
                setTimeout(() => {
                    getMealsByIngredient(mealIngredient);
                }, 1000);
            })
        }
    }

    async function getMealsByIngredient(ingredient) {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const response = await api.json();
        const { meals: mealsByIngredient } = response;
        console.log(response);
        displayMealsByIngredient(mealsByIngredient);
    }

    function displayMealsByIngredient(list) {
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#mealAreas").css("display", "none")
        $("#mealsByArea").css("display", "none");
        $("#mealIngredients").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealsByIngredient").css("display", "flex");
        $("#mealByCategory").css("display", "none");

        loadingScreen.classList.replace("d-flex", "d-none");

        let cartona = ``;
        for (let i = 0; i < list.length; i++) {
            cartona += `<div data-id="${list[i].idMeal}" class="card col-md-3 p-2 bg-transparent">
            <div data-id="${list[i].idMeal}" class="inner overflow-hidden rounded-2">
                <div data-id="${list[i].idMeal}" class="image position-relative">
                    <img data-id="${list[i].idMeal}" src="${list[i].strMealThumb}" alt="" class="w-100">
                    <div data-id="${list[i].idMeal}" class="layer flex-column justify-content-center position-absolute">
                        <p data-id="${list[i].idMeal}" >${list[i].strMeal}</p>
                    </div>
                </div>
            </div>
        </div>`
        }

        document.getElementById("ingredientRecipes").innerHTML = cartona;

        console.log(cartona);

        let cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealsByIngredient").css("display", "none");
                setTimeout(() => {
                    getMealDetails(e.target.getAttribute("data-id"))
                }, 1000)
            })
        }
    }

    async function getMealsByLetter(letter) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let response = await api.json();
        let { meals: mealsByLetter } = response;
        displayMealsByLetter(mealsByLetter)
    }

    function displayMealsByLetter(list) {
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#mealAreas").css("display", "none")
        $("#mealsByArea").css("display", "none");
        $("#mealIngredients").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealsByLetter").css("display", "flex");
        loadingScreen.classList.replace("d-flex", "d-none");

        let cartona = ``;
        for (let i = 0; i < list.length; i++) {
            cartona += `<div data-id="${list[i].idMeal}" class="card col-md-3 p-2 bg-transparent">
            <div data-id="${list[i].idMeal}" class="inner overflow-hidden rounded-2">
                <div data-id="${list[i].idMeal}" class="image position-relative">
                    <img data-id="${list[i].idMeal}" src="${list[i].strMealThumb}" alt="" class="w-100">
                    <div data-id="${list[i].idMeal}" class="layer flex-column justify-content-center position-absolute">
                        <p data-id="${list[i].idMeal}" >${list[i].strMeal}</p>
                    </div>
                </div>
            </div>
        </div>`
        }

        document.getElementById("mealsByLetter").innerHTML = cartona;


        let cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealsByIngredient").css("display", "none");
                setTimeout(() => {
                    getMealDetails(e.target.getAttribute("data-id"))
                }, 1000)
            })
        }
    }

    function displayMealsByName(list) {
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none");
        $("#mealByCategory").css("display", "none");
        $("#mealAreas").css("display", "none")
        $("#mealsByArea").css("display", "none");
        $("#mealIngredients").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealsByLetter").css("display", "none");
        $("#mealsByName").css("display", "flex");
        $("#detailsPage").css("display", "none");
        loadingScreen.classList.replace("d-flex", "d-none");

        let cartona = ``;
        for (let i = 0; i < list.length; i++) {
            cartona += `<div data-id="${list[i].idMeal}" class="card col-md-3 p-2 bg-transparent">
            <div data-id="${list[i].idMeal}" class="inner overflow-hidden rounded-2">
                <div data-id="${list[i].idMeal}" class="image position-relative">
                    <img data-id="${list[i].idMeal}" src="${list[i].strMealThumb}" alt="" class="w-100">
                    <div data-id="${list[i].idMeal}" class="layer flex-column justify-content-center position-absolute">
                        <p data-id="${list[i].idMeal}" >${list[i].strMeal}</p>
                    </div>
                </div>
            </div>
        </div>`
        }

        document.getElementById("mealsByName").innerHTML = cartona;

        let cards = document.querySelectorAll(".card");

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                loadingScreen.classList.replace("d-none", "d-flex");
                $("#mealsByIngredient").css("display", "none");
                setTimeout(() => {
                    getMealDetails(e.target.getAttribute("data-id"))
                }, 1000)
            })
        }
    }


    $("#categoryLink").on("click", () => {
        loadingScreen.classList.replace("d-none", "d-flex");
        $("#mealAreas").css("display", "none");
        $("#home").css("display", "none");
        $("#mealIngredients").css("display", "none");
        $("#search").css("display", "none");
        $("#contactUs").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealsByArea").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealByCategory").css("display", "none");


        setTimeout(() => {
            getMealCategories()
        }, 3000)
    })

    $("#areaLink").on("click", () => {
        loadingScreen.classList.replace("d-none", "d-flex");
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none")
        $("#mealIngredients").css("display", "none")
        $("#search").css("display", "none")
        $("#contactUs").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealsByArea").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealByCategory").css("display", "none");




        setTimeout(() => {
            getMealAreas()
        }, 3000)
    })

    $("#ingredientsLink").on("click", () => {
        loadingScreen.classList.replace("d-none", "d-flex");
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none")
        $("#mealAreas").css("display", "none")
        $("#search").css("display", "none")
        $("#contactUs").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealsByArea").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealByCategory").css("display", "none");


        setTimeout(() => {
            getMealIngredients()
        }, 3000)
    })

    $("#searchLink").on("click", () => {
        $("#home").css("display", "none");
        $("#mealCategories").css("display", "none")
        $("#mealIngredients").css("display", "none");
        $("#mealAreas").css("display", "none")
        $("#search").css("display", "block")
        $("#contactUs").css("display", "none");
        $("#detailsPage").css("display", "none");
        $("#mealsByArea").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealByCategory").css("display", "none");



    })

    $("#letterSearch").on("input", (e) => {
        let letter = e.target.value;
        getMealsByLetter(letter);
        let charCount = letter.length;
        let maxChars = $("#letterSearch").attr("data-max-characters");
        // let remaining = maxChars - charCount;
        if (charCount > maxChars) {
            e.target.value = letter.substr(0, maxChars);
            return;
        }

    })

    $("#nameSearch").on("input", (e) => {
        let name = e.target.value;
        getMealsByName(name);
    })

    $("#contactUsLink").on("click", () => {
        $("#home").css("display", "none");
        $("#mealIngredients").css("display", "none");
        $("#mealCategories").css("display", "none");
        $("#mealAreas").css("display", "none");
        $("#search").css("display", "none");
        $("#contactUs").css("display", "flex");
        $("#detailsPage").css("display", "none");
        $("#mealsByArea").css("display", "none");
        $("#mealsByIngredient").css("display", "none");
        $("#mealByCategory").css("display", "none");
    })



    /* SideBar animations */

    let sidebarWidth = $("#sideBar .menuLinks").innerWidth();


    $("#openBarBtn").on("click", () => {
        $("#sideBar").animate({ left: 0 }, 500);
        $("#openBarBtn").css("display", "none");
        $("#closeBarBtn").css("display", "flex");
        
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    })

    $("#closeBarBtn").on("click", () => {
        $("#sideBar").animate({ left: `-${sidebarWidth}` }, 500);
        $("#closeBarBtn").css("display", "none");
        $("#openBarBtn").css("display", "flex");

        $(".links li").animate({
            top: 300
        }, 500)
    })

    /* SideBar animations */

    let submitBtn = document.getElementById("submitBtn");
    let name = document.getElementById("nameInput");
    let email = document.getElementById("emailInput");
    let phone = document.getElementById("phoneInput");
    let age = document.getElementById("ageInput");
    let password = document.getElementById("passwordInput");
    let rePassword = document.getElementById("repasswordInput");

    document.getElementById("nameInput").addEventListener("focus", () => {
        focusNameInput = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        focusEmailInput = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        focusAgeInput = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        focusPhoneInput = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        focusPasswordInput = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        focusRepasswordInput = true
    })


    let focusAgeInput = false;
    let focusRepasswordInput = false;
    let focusPasswordInput = false;
    let focusNameInput = false;
    let focusEmailInput = false;
    let focusPhoneInput = false;

    function inputsValidation() {
        if (focusAgeInput) {
            if (ageValidation()) {
                document.getElementById("ageError").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("ageError").classList.replace("d-none", "d-block")

            }
        }
        if (focusPasswordInput) {
            if (passwordValidation()) {
                document.getElementById("passwordError").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("passwordError").classList.replace("d-none", "d-block")

            }

        }

        if (focusRepasswordInput) {
            if (repasswordValidation()) {
                document.getElementById("rePasswordError").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("rePasswordError").classList.replace("d-none", "d-block")

            }
        }

        if (focusNameInput) {
            if (nameValidation()) {
                document.getElementById("nameError").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("nameError").classList.replace("d-none", "d-block")

            }
        }

        if (focusEmailInput) {
            if (emailValidation()) {
                document.getElementById("emailError").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("emailError").classList.replace("d-none", "d-block")

            }
        }
        if (focusPhoneInput) {
            if (phoneValidation()) {
                document.getElementById("phoneError").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("phoneError").classList.replace("d-none", "d-block")

            }
        }


        if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() &&
            repasswordValidation()) {
            submitBtn.removeAttribute("disabled")
        } else {
            submitBtn.setAttribute("disabled", true)
        }
    }


    function nameValidation() {
        return (/^[a-zA-Z ]+$/.test(name.value))
    }

    function emailValidation() {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value))
    }

    function phoneValidation() {
        return (/^01[0-2,5]{1}[0-9]{8}$/.test(phone.value))
    }

    function ageValidation() {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(age.value))
    }

    function passwordValidation() {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(password.value))
    }

    function repasswordValidation() {
        return rePassword.value == password.value
    }


    name.addEventListener("keyup", () => {
        inputsValidation()
    })
    email.addEventListener("keyup", () => {
        inputsValidation()
    })
    age.addEventListener("keyup", () => {
        inputsValidation()
    })
    phone.addEventListener("keyup", () => {
        inputsValidation()
    })
    password.addEventListener("keyup", () => {
        inputsValidation()
    })
    rePassword.addEventListener("keyup", () => {
        inputsValidation()
    })


});


