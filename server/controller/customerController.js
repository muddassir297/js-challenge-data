const Customer = require('../model/customerModel');
const flash = require('connect-flash');
// Handle index actions
exports.index = function (req, res) {
    Customer.get(function (err, customers) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        //console.log(customers);
        res.json({
            status: "success",
            message: "Customers retrieved successfully",
            data: allCustomers(customers)
        });
    });
};
// Handle create customer actions
exports.new = function (req, res) {
    var customer = new Customer();
    //console.log(req.body)
    const fname = req.body.fname;
    const lname = req.body.lname;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const lastContact = req.body.lastContact;
    const customerLifetimeValue = req.body.customerLifetimeValue;
   
    req.checkBody('fname', 'Name is required').notEmpty();
    req.checkBody('lname', 'Name is required').notEmpty();
    let errors = req.validationErrors();

    if(errors){
        res.send(errors);
        return;
      } else {
        customer.name.first = fname,
        customer.name.last = lname,
        customer.gender = gender,
        customer.birthday = birthday,
        customer.lastContact = lastContact,
        customer.customerLifetimeValue = customerLifetimeValue
        customer.save(function(err){
            if(err){
                res.json({
                    success: false,
                    error: err
                });
               // res.send(err);
                return;
            }
            //console.log(customer);
            Customer.find({}, function(err, customers){
                if (err)
                    res.send(err);
                res.json({
                    status: "200",
                    success:true,
                    message: "Customer saved succefully",
                    data: allCustomers(customers)
                });  
            })
            
          });
      }    
    };

   
// Handle view customer info
exports.view = function (req, res) {
    Customer.findById(req.params.customer_id, function (err, customer) {
        if (err)
            res.send(err);
        res.json({
            message: 'Customer details loading..',
            data: customerDataFilter(customer)
        });
    });
};
// Handle update Customer info
exports.update = function (req, res) {
    Customer.findById(req.params.customer_id, function (err, customer) {
        if (err){
            res.send(err);
        }            
        const fname = req.body.fname;
        const lname = req.body.lname;
        const gender = req.body.gender;
        const birthday = req.body.birthday;
        const lastContact = req.body.lastContact;
        const customerLifetimeValue = req.body.customerLifetimeValue;

        req.checkBody('fname', 'Name is required').notEmpty();
        req.checkBody('lname', 'Name is required').notEmpty();
       

        let errors = req.validationErrors();

        if(errors){
            console.log(`Error! ${errors}`);
            res.send(errors);
            return;
        } else {
            customer.name.first = fname,
            customer.name.last = lname,
            customer.gender = gender,
            customer.birthday = birthday,
            customer.lastContact = lastContact,
            customer.customerLifetimeValue = customerLifetimeValue
            customer.save(function(err){
                if(err){
                    console.log(err);
                    return;
                } else {
                    Customer.find({}, function(err, users){
                        if (err)
                            res.send(err);
                        res.json({
                            status: "200",
                            success:true,
                            message: "Customer saved succefully",
                            data: allCustomers(users)
                        });  
                    }) 
                }
            });
      }
    });
};


// Handle delete customer
exports.delete = function (req, res) {
    Customer.findOneAndDelete({_id: req.params.customer_id},
        function (err, customers) {
        if (err)
            res.send(err);
        //console.log(customers)
        Customer.find({}, function(err, customers){
            if (err)
                res.send(err);
            res.json({
                status: "200",
                success:true,
                message: "Customer deleted succefully",
                data: allCustomers(customers)
            });  
        })        
    });
};

function allCustomers(customers){
    return customer = customers.map(person => ({
        customerID:person._id,
        fname: person.name.first, 
        lname: person.name.last,
        birthday: person.birthday,        
        gender: person.gender,
        lastContact: person.lastContact,
        customerLifetimeValue: person.customerLifetimeValue
    }));
}

function customerDataFilter(myObject){
    return respData = {
        customerID:myObject._id,
        fname: myObject.name.first, 
        lname: myObject.name.last,
        birthday: myObject.birthday,        
        gender: myObject.gender,
        lastContact: myObject.lastContact,
        customerLifetimeValue: myObject.customerLifetimeValue
    }
}