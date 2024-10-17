const cds = require('@sap/cds');

// const { Customers } = cds.entities("ACG_PRJ1_CRUD.db");

module.exports = cds.service.impl(async function () {



    this.on('deepInsert', async (req, res) => {
        try {
            // let data = JSON.parse(req.data.data);
            let data = req.data.data;
            let tableName = "Orders";
            let result = await insertData(req, data, tableName);
            return result;
        } catch (error) {
            return req.error({ code: 501, message: error.message });
        }
    });

    async function insertData(req, data, tableName) {
        try {
            let query = INSERT.into(tableName, data);
            let result = await cds.tx(req).run(query).catch((error) => {
                return req.error({ code: 501, message: error.message })
            });
            //console.log(result);
            if (result.results) {
                return 'Data inserted';
            } else {
                console.log('in else');
                return 'error';
            }
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }


})