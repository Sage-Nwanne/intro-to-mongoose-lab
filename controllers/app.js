const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const username = prompt('Whats your name? ');
const Customer = require('../models/customers.js');




// get route welcome page (/), 
// get & post route to create a new customer (/customers), // get route to view all customers (/customers), 
 // put route to update a customer (/customers/:id), // delete route to delete a customer (/customers/:id), 











 async function mainMenu() {
    while (true) {
      console.log("\nWelcome to the CRM");
      console.log("1. Create a customer");
      console.log("2. View all customers");
      console.log("3. Update a customer");
      console.log("4. Delete a customer");
      console.log("5. Quit");

      let choice = prompt("Number of action to run: ");
      return choice;} }

//CRUD OPERATIONS
async function createCustomer() {
  const name = prompt("Enter customer name: ");
  const age = parseInt(prompt("Enter customer age: "), 10);

  const customer = new Customer({ name, age });
  await customer.save();
  console.log("Customer added successfully!");
}

async function viewCustomers() {
  const customers = await Customer.find();
  if (customers.length === 0) {
    console.log("No customers found.");
    return;
  }
  customers.forEach(c => console.log(`${c._id}: ${c.name}, Age: ${c.age}`));
}

async function updateCustomer() {

  const customers = await Customer.find();
  if (customers.length === 0) {
    console.log("No customers to update.");
    return;
  }

  console.log("Customers:");
  customers.forEach(c => console.log(`${c._id}: ${c.name}, Age: ${c.age}`));



//user Idd
  const id = prompt("Enter the ID of the customer to update: ");

  //new details
  const name = prompt("Enter new name: ");
  const age = parseInt(prompt("Enter new age: "), 10);

  await Customer.findByIdAndUpdate(id, { name, age });
  console.log("Customer updated successfully.");
}

async function deleteCustomer() {
  const id = prompt("Enter the ID of the customer to delete: ");
  await Customer.findByIdAndDelete(id);
  console.log("Customer deleted successfully.");
}




// main function

      async function main() {
        let running = true;

        while (running) {
          const choice = await mainMenu();
          switch (choice) {
            case "1":
              await createCustomer();
              break;
            case "2":
              await viewCustomers();
              break;
            case "3":
              await updateCustomer();
              break;
            case "4":
              await deleteCustomer();
              break;
            case "5":
              console.log("Exiting application....");
              mongoose.connection.close();
              running = false;
            default:
              console.log("Invalid choice. Please enter number between 1-5.");
          }
      }
      
    }

    main();
  
















console.log(`Your name is ${username}`);
