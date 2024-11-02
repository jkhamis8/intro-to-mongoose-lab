const prompt = require('prompt-sync')();
const customerModel = require("./models/Customer.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config(); // Loads the environment variables from .env file


const create = async (customerData) => {
  console.log(customerData);

  await customerModel.create(customerData)
  restart()
}
const viewAll = async () => {
  let allCustomer = await customerModel.find()

  allCustomer.forEach((value) => {
    console.log(`id: ${value.id} -- Name:${value.name}, Age:${value.age}`);
  })
}

const updateCustomer = async (id, customerData) => {
  await customerModel.findByIdAndUpdate(id, customerData);
  restart()
};
const deleteCustomer = async (id) => {
  await customerModel.findByIdAndDelete(id);
  restart()
};

const restart = () => {
  const action = prompt('press any button to show the list or 5 to exit:')
  if (action == 5) {
    exitApp()
  } else {
    mainFunction()
  }
}

const exitApp = () => {
  console.log('exiting...')
  mongoose.connection.close()
}
const mainFunction = async () => {
  const action = prompt(`Welcome to the CRM

  What would you like to do?
  
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. quit
  
  Number of action to run: 
  `);

  if (action == 1) {
    const name = prompt('Please Enter the Customer Name: ')
    const age = prompt('Please Enter the Customer Age: ')
    const addCustomer = { name, age }
    create(addCustomer)
  } else if (action == 2) {
    await viewAll()
    restart()
  }
  else if (action == 3) {
    await viewAll()
    const _id = prompt('Please Enter the Customer id: ')
    const name = prompt('Please Enter the Customer Name: ')
    const age = prompt('Please Enter the Customer Age: ')
    const addCustomer = { name, age }
    updateCustomer(_id, addCustomer)
  }
  else if (action == 4) {
    await viewAll()
    const _id = prompt('Please Enter the Customer id: ')
    deleteCustomer(_id)
  }
  else {
    exitApp()
  }
}

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', async () => {
  console.log(`connected to mongodb ${mongoose.connection.name}`)
  mainFunction()
})