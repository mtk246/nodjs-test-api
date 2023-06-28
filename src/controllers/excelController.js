const xlsx = require('xlsx');
// const { createPool, query } = require("../config/pg_connection");

exports.publicStock = async (req, res) => {
    // const pool = createPool('public');
  
    const workbook = xlsx.readFile(req.file.buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    for (const data of jsonData) {
        const values = [data.column1, data.column2];

        console.log(values);
    }

    // const queryText = 'INSERT INTO your_table (column1, column2) VALUES ($1, $2)';
  
    // try {
    //   for (const data of jsonData) {
    //     const values = [data.column1, data.column2];
    //     await query(pool, queryText, values);
    //   }
  
    //   res.sendStatus(200); // Send a success response
    // } catch (error) {
    //   console.error(error);
    //   res.sendStatus(500); // Send an error response
    // }

    console.log(res);
};