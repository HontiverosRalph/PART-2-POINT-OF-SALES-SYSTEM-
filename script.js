// Selecting elements
const menuItems = document.querySelectorAll('.menu li');
const orderedItemsTextarea = document.getElementById('orderedItems');
const totalPriceDiv = document.getElementById('totalPrice');
const paymentAmountInput = document.getElementById('paymentAmount');
const paymentConfirmationDiv = document.getElementById('paymentConfirmation');
const totalCollectedSpan = document.getElementById('totalCollected');

// Function to handle adding items to the order
function addToOrder(event) {
    const selectedItem = event.target.parentElement;
    const itemName = selectedItem.dataset.value;
    const itemPrice = parseFloat(selectedItem.innerText.match(/₱(\d+\.\d+)/)[1]);
    const itemQuantity = parseFloat(selectedItem.querySelector('.item-quantity').value);

    const orderedItemText = `${itemName} - ₱${(itemPrice * itemQuantity).toFixed(2)}`;
    orderedItemsTextarea.value += orderedItemText + '\n';

    updateTotalPrice(itemPrice * itemQuantity);
}

// Function to update the total price
function updateTotalPrice(itemPrice) {
    totalPriceDiv.textContent = `₱${(parseFloat(totalPriceDiv.textContent.match(/₱(\d+\.\d+)/)[1]) + itemPrice).toFixed(2)}`;
}

// Function to handle payment
function pay() {
    const totalAmount = parseFloat(totalPriceDiv.textContent.match(/₱(\d+\.\d+)/)[1]);
    const paymentAmount = parseFloat(paymentAmountInput.value);

    if (paymentAmount >= totalAmount) {
        paymentConfirmationDiv.classList.remove('hidden');
        totalCollectedSpan.textContent = `₱${(parseFloat(totalCollectedSpan.textContent.match(/₱(\d+\.\d+)/)[1]) + totalAmount).toFixed(2)}`;
        clearOrder();
    } else {
        alert('Insufficient payment amount!');
    }
}

// Function to clear the order after payment
function clearOrder() {
    orderedItemsTextarea.value = '';
    totalPriceDiv.textContent = '₱0.00';
    paymentAmountInput.value = '';
}

// Adding event listeners
menuItems.forEach(item => {
    item.querySelector('.add-to-order').addEventListener('click', addToOrder);
});

// Function to handle payment
function pay() {
    const totalAmount = parseFloat(totalPriceDiv.textContent.match(/₱(\d+\.\d+)/)[1]);
    const paymentAmount = parseFloat(paymentAmountInput.value);

    if (paymentAmount >= totalAmount) {
        const change = paymentAmount - totalAmount;
        paymentConfirmationDiv.classList.remove('hidden');
        totalCollectedSpan.textContent = `₱${(parseFloat(totalCollectedSpan.textContent.match(/₱(\d+\.\d+)/)[1]) + totalAmount).toFixed(2)}`;
        clearOrder();
        
        // Display a pop-up message showing the change
        alert(`Your change is ₱${change.toFixed(2)}. Thank you for your purchase!`);
    } else {
        alert('Insufficient payment amount!');
    }
}