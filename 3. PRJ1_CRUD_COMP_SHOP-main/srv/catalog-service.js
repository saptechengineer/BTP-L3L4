const cds = require('@sap/cds');

const { Customers } = cds.entities("ACG_PRJ1_CRUD.db");

module.exports = cds.service.impl(async function () {


    // this.on('READ', "GetCustomers", function(req, res){

    //     console.log("Im in READ operation");

    //     let result1 = SELECT.from('Customers').where({email: "partha@acloudguruji.com"});

    //     console.log("result1");

    //     return(result1);


    // })


    // this.on('READ', "GetCustomers", async function(req, res){

    //     console.log("Im in READ operation");

    //     let result1 = await SELECT.from('Customers').where({email: "partha@acloudguruji.com"});

    //     console.log(result1);

    //     return(result1);


    // })    


    // this.on('READ', "GetCustomers", async (req, res)=>{

    //     console.log("Im in READ operation");

    //     let result1 = await SELECT.from('Customers').where({email: "partha@acloudguruji.com"});

    //     console.log(result1);

    //     return(result1);


    // })       


    this.on('READ', "GetCustomers", async (req, res) => {

        console.log("Im in READ operation");
        var result1;

        try {
            let { ID, email } = req.data;

            if (ID !== undefined) {
                result1 = await SELECT.from('Customers').where({ ID: ID, email: email });
            } else {
                result1 = await SELECT.from('Customers');
            }

            console.log(result1);

            return (result1);
        }
        catch (e) {
            return req.error({ code: 500, message: e.message });
        }


    })




    this.after('READ', "GetCustomers", resData => {

        if (resData !== []) {
            try {

                let custArrRet = resData.map((data) => {

                    data.firstName = data.firstName + " " + data.lastName;

                    return (data);

                })

                return (custArrRet);
            }

            catch (e) {
                return req.error({ code: 500, message: e.message });
            }


        }

    })


    this.on('UPDATE', "UpdateCustomers", async (req, res) => {

        try {

            let { ID, email } = req.data;

            await cds.tx(req).run(
                [
                UPDATE(Customers).set({
                    city: "Amsterdam"
                }).where({ ID: ID }),


                UPDATE(Customers).set({
                    city: "London"
                }).where({ ID: 2 })

            ]
            ).then((resolve, reject)=>{
            
                console.log(resolve);
                console.log(reject);

                if(resolve!==undefined && resolve[0] === 1 && resolve[1] === 1){

                    return(req.data);
                
                }else{
                    req.error(500, "Partial operation not supported");
                }
            
            }).catch((e)=> {return req.error({ code: 500, message: e.message })});
        }
        catch (e) {
            return req.error({ code: 500, message: e.message });
        }


    })


    ////www.guruji.cloud=======================>>> [UNIT-8]        
    ////***** INSERT method -- PUT*/

    this.on('INSERT', "InsertCustomers", async (req) => {
        // let { ID, email } = req.data;

        var resultsss;

        let insertArr = [];

        let obj = {
            "ID": req.data.ID,
            "email": req.data.email,
            "firstName": req.data.firstName,
            "lastName": req.data.lastName,
            "city": req.data.city
        }
        insertArr.push(obj);

        try {
            let query = INSERT.into("Customers", insertArr);
            let resultsss = await cds.tx(req).run(query).catch((error) => {
                return req.error({ code: 501, message: error.message })
            });
            //console.log(result);
            if (resultsss.results) {
                return 'Data inserted';
            } else {
                console.log('in else');
                return 'error';
            }
        } catch (error) {
            console.log(error);
            return error.message;
        }
    })    


  ////www.guruji.cloud=======================>>> [UNIT- 9]        
    ////***** DELETE method*/

    this.on('DELETE', "DeleteCustomers", async (req, res) => {
        let { ID, email } = req.data;

        // let updateQueryArr = [];

        await cds.tx(req).run(
            DELETE.from(Customers)
                .where({ ID: ID })
        ).then((resolve, reject) => {
            console.log("resolve:", resolve);
            console.log("reject:", reject);

            if (typeof resolve !== "undefined") {
                return req.data;
            } else {
                req.error(409, "Record Not Found");
            }
        }).catch((error) => {
            return req.error({ code: 501, message: error.message })
        });
    })


        ////www.guruji.cloud=======================>>> [UNIT-10]        
    ////***** CDS Before event for INSERT method*/
    this.before('INSERT', "InsertCustomers", async (req) => {

        if (typeof req.data.email === undefined) req.error(500, "Email missing");

        if (req.data.email.toLowerCase().indexOf("gmail") !== -1) {
            req.error(500, "Personal email not allowed");
        }

    })



})

