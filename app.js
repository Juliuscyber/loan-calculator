// listen for submit on form

const cardCal = document.querySelector('#loan-form');

cardCal.addEventListener('submit', function(e){
    //hide results
    document.querySelector('#results').style.display = 'none';

    //show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(Calculate, 2000);

    e.preventDefault()
});


function Calculate(e){
    
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    
    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    //calculating
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*calculatedInterest*x)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments - principal)).toFixed(2);
        document.querySelector('#results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';
    }else{
        //display error message
        errorMessage('Please check you numbers');    
    } 
}

function errorMessage(error){

    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';

    //create error message
    const errorMessage = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorMessage.className = 'alert alert-danger';
    errorMessage.appendChild(document.createTextNode(error));

    card.insertBefore(errorMessage, heading);
    
    setTimeout(clearMessage, 3000);
}

function clearMessage(){
   document.querySelector('.alert').remove();
}


