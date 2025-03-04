const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const username = prompt('Whats your name? ');
const Customer = require('./models/customers.js');

let numOfAction = 0;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {  console.error('Error connecting to MongoDB', err);});


// Main menu function

 async function showMenu() {
      console.log("\nWelcome to the CRM");
      console.log("1. Create a customer");
      console.log("2. View all customers");
      console.log("3. Update a customer");
      console.log("4. Delete a customer");
      console.log("5. Quit");

     numOfAction = prompt("Number of action to run: ");
      console.log('numb of action', numOfAction);
      return numOfAction;
  } 

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
  customers.forEach(c => console.log(`id: ${c._id}  Name: ${c.name}, Age: ${c.age}`));
}

async function updateCustomer() {
await viewCustomers();
const customerId = prompt("Enter the ID of the customer to update: ");
const customerName = prompt("Enter new name: ");
const customerAge = parseInt(prompt("Enter new age: "), 10);

  // Check if there are any customers before updating
  const customers = await Customer.find();
  if (customers.length === 0) {
    console.log("No customers to update.");
    return;
  } await Customer.findByIdAndUpdate(customerId, { name: customerName, age: customerAge });
  console.log("Customer updated successfully.");
}

// Delete a customer
async function deleteCustomer() {
  await viewCustomers();
  const id = prompt("Enter the ID of the customer to delete: ");
  await Customer.findByIdAndDelete(id);
  console.log("Customer deleted successfully.");
}

// main function

      async function main() {
        let running = true;

        while (running) {
           showMenu();
           running = false;
          switch (numOfAction) {
            case '1':
              await createCustomer();

              break;
            case '2':
              await viewCustomers();
              break;
            case '3':
              await updateCustomer();
              break;
            case '4':
              await deleteCustomer();
              break;
            case '5':
              console.log("Exiting application....");
              running = false;
            default:
              console.log("Invalid choice. Please enter number between 1-5.");
          }
      }
      mongoose.connection.close();
    }
    main();
  
