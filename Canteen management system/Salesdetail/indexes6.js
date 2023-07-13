console.log('This is ES6 version of Project');

class Sale {
    constructor(Name, Item, Quantity, Price) {
        this.Name = Name;
        this.Item = Item;
        this.Quantity = Quantity;
        this.Price = Price * Quantity;
    }
}

class Display {
    add(Sale) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${Sale.Name}</td>
                            <td>${Sale.Item}</td>
                            <td>${Sale.Quantity}</td>
                            <td>${Sale.Price}</td>
                            <td><a href="#" class="delete-item" data-item="${Sale.Item}">Delete</a></td>
                        </tr>`;
        tableBody.innerHTML += uiString;

        this.updateTotalPrice();
    }

    clear() {
        let CanteenForm = document.getElementById('CanteenForm');
        CanteenForm.reset();
    }

    validate(Sale) {
        if (Sale.Name.length < 2 || Sale.Item.length < 2 || Sale.Quantity < 1 || Sale.Price < 2) {
            return false;
        } else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        } else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }

    updateTotalPrice() {
        let tableBody = document.getElementById('tableBody');
        let totalPriceElement = document.getElementById('totalPrice');
        let total = 0;
        for (let i = 0; i < tableBody.rows.length; i++) {
            total += parseFloat(tableBody.rows[i].cells[3].innerText);
        }
        totalPriceElement.innerText = total;
    }

    deleteItem(item) {
        let tableBody = document.getElementById('tableBody');
        for (let i = 0; i < tableBody.rows.length; i++) {
            if (tableBody.rows[i].cells[1].innerText === item) {
                tableBody.deleteRow(i);
                this.updateTotalPrice();
                break;
            }
        }
    }
}

let CanteenForm = document.getElementById('CanteenForm');
CanteenForm.addEventListener('submit', CanteenFormSubmit);

function CanteenFormSubmit(e) {
    console.log('You have submitted Canteen form');
    let Name = document.getElementById('CustomerName').value;
    let Item = document.getElementById('Item').value;
    let Quantity = parseInt(document.getElementById('Quantity').value);
    let Price = parseInt(document.getElementById('Price').value);

    let sale = new Sale(Name, Item, Quantity, Price);
    console.log(sale);

    let display = new Display();

    if (display.validate(sale)) {
        display.add(sale);
        display.clear();
        display.show('success', 'Your item has been successfully added');

        let sales = [];
        if (localStorage.getItem('sales')) {
            sales = JSON.parse(localStorage.getItem('sales'));
        }
        sales.push(sale);
        localStorage.setItem('sales', JSON.stringify(sales));
    } else {
        display.show('danger', 'Sorry, your item cannot be added');
    }

    e.preventDefault();
}
window.addEventListener('DOMContentLoaded', () => {
    let sales = [];
    if (localStorage.getItem('sales')) {
        sales = JSON.parse(localStorage.getItem('sales'));
    }

    let display = new Display();
    for (let i = 0; i < sales.length; i++) {
        display.add(sales[i]);
    }

    let tableBody = document.getElementById('tableBody');
    tableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-item')) {
            let item = e.target.dataset.item;
            display.deleteItem(item);

            let sales = JSON.parse(localStorage.getItem('sales'));
            for (let j = 0; j < sales.length; j++) {
                if (sales[j].Item === item) {
                    sales.splice(j, 1);
                    break;
                }
            }
            localStorage.setItem('sales', JSON.stringify(sales));
        }
    });
});
