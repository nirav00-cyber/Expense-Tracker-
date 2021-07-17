const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransaction = [
//     {id:1,text:'flower',amount:-20},
//     {id:2,text:'salary',amount:300},
//     {id:3,text:'Book',amount:-10},
//     {id:4,text:'Camera',amount:150}

// ];
const localStorageTransaction = JSON.parse(localStorage.getItem('transaction'));

let transaction = localStorage.getItem('transaction')!==null ? localStorageTransaction:[];

//add transaction 
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim()==='')
        alert('please enter a text and amount');
    else{
        const transactionx = {
            id:generateID(),
            text:text.value,
            amount:+amount.value
        };
        transaction.push(transactionx);
        addTransactionDOM(transactionx);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}
//generate random ID
function generateID(){
    return Math.floor(Math.random()*100000000)
}


// add transaction to DOM list
function addTransactionDOM(transaction){
    //get sign 
    const sign = transaction.amount < 0 ? '-':'+';
    const item = document.createElement('li');

    // add class based on values

    item.classList.add(transaction.amount < 0 ?'minus' : 'plus');
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);
}



//update the balance, income and expense
function updateValues(){
    const amounts = transaction.map(transaction => transaction.amount);

    const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);
    
    const income  = amounts
                    .filter(item => item>0)
                    .reduce((acc,item)=>(acc+=item),0).toFixed(2);
    
    const expense = 
    (amounts
    .filter(item =>item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);
        balance.innerHTML = `$${total}`;
        money_plus.innerText = `$${income}`;
        money_minus.innerText = `$${expense}`;

    
}
//remove transaction by id

function removeTransaction(id){
    transaction = transaction.filter(transaction => transaction.id!==id);
    updateLocalStorage();
    init();
}

//update local storage transaction

function updateLocalStorage(){
    localStorage.setItem('transaction',JSON.stringify(transaction));
    updateValues();
}


//Init app 
function init(){
    list.innerHTML = '';
    transaction.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit',addTransaction);