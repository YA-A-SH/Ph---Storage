let medName =document.getElementById('medName');
let comName =document.getElementById('comName');
let count =document.getElementById('count');
let CPrice =document.getElementById('CPrice');
let price =document.getElementById('price');
let exp =document.getElementById('exp');
let submit = document.getElementById('submit');
let delAll = document.getElementById('delAll');
let s = document.getElementById('search');
let scrol = document.getElementById('scroll');

let mode  = 'create' ;
let ser = 'medecineName';
let q ;
let proarray ;

onload = function(){
    showItems();
    scrol.classList.add('class');
}
if(localStorage.items != null){
    proarray = JSON.parse(localStorage.items) ;
}
else{
    proarray = [];
}
submit.onclick = function(){    

    let currentYear = new Date().getFullYear(); 
    let minYear = 2000;
    let maxYear = currentYear + 50; 

    let expValue = exp.value;
    let expYear = parseInt(expValue.split('-')[0]); 
      if (expYear < minYear || expYear > maxYear) {
        alert(`Invalid expiration year! Please enter a year between ${minYear} and ${maxYear}.`);
        return;
    }

        let product = {
            medName : medName.value.toUpperCase(),
            comName : comName.value.toUpperCase(),
            count : count.value,
            CPrice : CPrice.value,
            price : price.value,
            exp : exp.value
        };
        
        if( medName.value != '' && comName.value != '' && count.value !='' && CPrice.value!='' && price.value !='' && exp.value!= '' ){
            if(count.value >5000){
                alert("Count Can't Be More Than 5000 ");
                return;
            }
            if(count.value <=0 || CPrice.value <= 0 || price.value <= 0){
                alert("WTF How You Give This Things (-) ???!!!!");
                return;
            }
        if (mode === 'create'){
        proarray.push(product);
        localStorage.setItem('items',JSON.stringify(proarray));
        removeInputs();
        showItems();
        }
        else {

            proarray[q]=product;
            showItems();
            localStorage.setItem('items',JSON.stringify(proarray));
            removeInputs();
            submit.innerHTML = 'Submit';
            mode = 'create';
      
        }
    }
    else{
        alert('Enter Right Values Pro ... ');
        return;
    }
}
    function removeInputs(){
    medName.value = '';
    comName.value = '';
    count.value = '';
    CPrice.value = '';
    price.value = '';
    exp.value = '';
}
    function showItems(){
    table = '';
    let tbody = document.querySelector("tbody");
    for(let i = 0 ; i< proarray.length ; i++){
        table += `
         <tr>
             <td>${i+1}</td>
             <td>${proarray[i].medName}</td>
             <td>${proarray[i].comName}</td>
             <td>${proarray[i].count}</td>
             <td>${proarray[i].CPrice} ILS </td>
             <td>${proarray[i].price} ILS</td>
             <td>${proarray[i].exp}</td>
             <td><button id="update" onclick="update(${i})">UP</button></td>
             <td><button id="delete" onclick='del(${i})'>DEL</button></td>
         </tr>`;
      
    }

     tbody.innerHTML = table;
     let x = document.getElementById('deleteAll');
     if(proarray.length>0){
         x.innerHTML = `
         <button id ="btnDeleteAll" onclick="delall()"> Delete All Item's (${proarray.length}) </button>
         `;
     }
     else{
         x.innerHTML = '';
     }
    
}   
    function delall(){
            proarray.splice(0);
            showItems();
            localStorage.clear();
}   
    function update(i){
    mode = 'update';
    medName.value = proarray[i].medName ;
    comName.value = proarray[i].comName;
    count.value =  proarray[i].count;
    CPrice.value = proarray[i].CPrice ;
    price.value = proarray[i].price ;
    exp.value =  proarray[i].exp ;

    q = i ;
    submit.innerHTML= 'UPDATE';


}
    function del(i){
    if(proarray[i].count <= 1){
        proarray.splice(i,1);
        localStorage.setItem('items',JSON.stringify(proarray));
        showItems();
    }
    else{
        proarray[i].count -= 1;
        localStorage.setItem('items',JSON.stringify(proarray));
        showItems();
    }

}   function search(value){
    let tbody = document.querySelector("tbody");
    let table = '';

    let searchValue = value.toLowerCase();

    for(let i = 0; i < proarray.length; i++){

        let medNameLower = proarray[i].medName.toLowerCase();
        let comNameLower = proarray[i].comName.toLowerCase();

        if(ser == 'medecineName' && medNameLower.includes(searchValue)){
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${proarray[i].medName}</td>
                <td>${proarray[i].comName}</td>
                <td>${proarray[i].count}</td>
                <td>${proarray[i].CPrice}</td>
                <td>${proarray[i].price}</td>
                <td>${proarray[i].exp}</td>
                <td><button id="update" onclick="update(${i})">UP</button></td>
                <td><button id="delete" onclick='del(${i})'>DEL</button></td>
            </tr>`;
        }
        else if(ser == 'companyName' && comNameLower.includes(searchValue)){
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${proarray[i].medName}</td>
                <td>${proarray[i].comName}</td>
                <td>${proarray[i].count}</td>
                <td>${proarray[i].CPrice}</td>
                <td>${proarray[i].price}</td>
                <td>${proarray[i].exp}</td>
                <td><button id="update" onclick="update(${i})">UP</button></td>
                <td><button id="delete" onclick='del(${i})'>DEL</button></td>
            </tr>`;
        }
    }
    
    tbody.innerHTML = table;
}
    function MedName(){
        ser='medecineName';
        s.focus();
        s.value ='';
        showItems();
}
    function ComName(){
        ser='companyName';
        s.focus();
        s.value ='';
        showItems();
}

scrol.onclick = function (){
   
    scroll ({
        left : 0 ,
        top : 0,
        behavior : "smooth"
    });
};

onscroll = function(){
    if(scrollY >=20){
        scrol.classList.remove('class');
    }
    else{
        scrol.classList.add('class');
    }
};