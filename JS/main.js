let title = document.getElementById('title') ;
let price = document.getElementById('Price') ;
let taxes = document.getElementById('taxes') ;
let ads = document.getElementById('ads') ; 
let discount = document.getElementById('discount') ;
let total = document.getElementById('total') ;
let count = document.getElementById('count') ;
let category = document.getElementById('category') ;
let create = document.getElementById('creat-btn') ;
let DeleteAllBtn = document.getElementById('deleteAll') ;
let searchBtn = document.getElementById('search');

let mood = "create";
let tmp

//total function 

function gettotal() {
    if(price.value){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result ;  
    }else {
        total.innerHTML = ' ' ;
    }
}

//create function 

let dataArr ;

if (localStorage.product != null) {
    dataArr = JSON.parse(localStorage.product)
} else {
    dataArr = [] ;
}

create.onclick= function(){

    let newObject = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category :category.value.toLowerCase(),
    };

    //counter
    if(title.value != '' && price.value != '' && category.value != '')
    {
        if(mood === 'create')
        {
            if(newObject.count > 1){

                for(let j = 0 ; j < newObject.count ; j++){
                dataArr.push(newObject);
                }

            }
            else {
            dataArr.push(newObject);
            }

        }
        else 
        {
        dataArr[tmp] = newObject ;
        mood = 'create';
        create.innerHTML = 'creat';
        count.style.display = 'block'
        }
        ClearData()
    }
    localStorage.setItem('product',JSON.stringify(dataArr));

    ClearData()
    ShowData()
};


//clear inputs

function ClearData() {

    title.value = ' '
    price.value = ' '
    taxes.value = ' '
    ads.value = ' '
    discount.value = ' '
    total.innerHTML = ' '
    count.value = ' '
    category.value = ' '

}; 

// show function 

function ShowData() {
    let table = '';
    for(let i = 0 ; i < dataArr.length ; i++){ 
        table += `
        <tr>
            <td>${[i+ 1]}</td>               
            <td>${dataArr[i].title}</td>
            <td>${dataArr[i].price}</td>
            <td>${dataArr[i].taxes}</td>
            <td>${dataArr[i].ads}</td>
            <td>${dataArr[i].discount}</td>
            <td>${dataArr[i].total}</td>
            <td>${dataArr[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="DeleteItem(${i})" id="delet">delete</button></td>
        </tr>`
    }
    if(dataArr.length > 0) {
        DeleteAllBtn.innerHTML = `<button onclick="DeleteAll()">delete All (${dataArr.length})</button>`;
    }else {
        DeleteAllBtn.innerHTML = ' '
    };
    document.getElementById('tbody').innerHTML = table;
} ;

ShowData();

// Delete function

function DeleteItem(item) {
    dataArr.splice(item,1);
    localStorage.product = JSON.stringify(dataArr);
    ShowData();
};

function DeleteAll(){
    dataArr.splice(0);
    localStorage.clear();
    ShowData();
}

//update function 

function updateData(ele){
    title.value = dataArr[ele].title ;
    price.value = dataArr[ele].price ;
    taxes.value = dataArr[ele].taxes ;
    ads.value = dataArr[ele].ads ;
    discount.value = dataArr[ele].discount ;
    category.value = dataArr[ele].category
    gettotal() ;
    create.innerHTML = 'Update' ;
    count.style.display = 'none' ;
    mood = 'update'
    tmp = ele ;
    scroll({
        top :0,
        behavior:"smooth",
    }) ;
};

//search 


let searchMood = 'title'

function GetSearch(id) {
    if(id === 'Title') {
        searchMood = 'title' ;
        searchBtn.placeholder = 'Search By Title' ;
        searchBtn.focus()
    }else {
        searchMood = 'category' ;
        searchBtn.placeholder = 'Search By Category' ;
        searchBtn.focus()
    }
    searchBtn.value = ''
    ShowData()
}

function SearchData(value) {

    let table = ' ';

    if(searchMood === 'title'){

        for ( let i = 0 ; i < dataArr.length ; i++ ){

            if(dataArr[i].title.includes(value)) {

                table += `
                            <tr>
                                    <td>${[i+ 1]}</td>               
                                    <td>${dataArr[i].title}</td>
                                    <td>${dataArr[i].price}</td>
                                    <td>${dataArr[i].taxes}</td>
                                    <td>${dataArr[i].ads}</td>
                                    <td>${dataArr[i].discount}</td>
                                    <td>${dataArr[i].total}</td>
                                    <td>${dataArr[i].category}</td>
                                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                                    <td><button onclick="DeleteItem(${i})" id="delet">delete</button></td>
                                </tr>`

            }

        }
    } else {

        for ( let i = 0 ; i < dataArr.length ; i++ ){

            if(dataArr[i].category.includes(value.toLowerCase())) {

                table += `
                            <tr>
                                    <td>${[i+ 1]}</td>               
                                    <td>${dataArr[i].title}</td>
                                    <td>${dataArr[i].price}</td>
                                    <td>${dataArr[i].taxes}</td>
                                    <td>${dataArr[i].ads}</td>
                                    <td>${dataArr[i].discount}</td>
                                    <td>${dataArr[i].total}</td>
                                    <td>${dataArr[i].category}</td>
                                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                                    <td><button onclick="DeleteItem(${i})" id="delet">delete</button></td>
                                </tr>`

            }

        }

    }
    document.getElementById('tbody').innerHTML = table;
}