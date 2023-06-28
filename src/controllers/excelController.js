const xlsx = require('xlsx');
const multer = require('multer');
const uuid = require('uuid');
const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single('file');

exports.publicStock = async (req, res) => {
    const table_name = req.params.table_name;

    const pool = createPool('public_db');

    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).send('Error uploading file');
        }

        const filePath = req.file.path;
      
        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
        try {
            for (const data of jsonData) {
                const product_id = uuid.v4();
                const packaging_type_id = uuid.v4();

                const values = {
                    "product_id": product_id,     // uuid
                    "product_name": data.__EMPTY_1, // product_name
                    "unit_qty": data.__EMPTY_2, // qty in each package
                    "packaging_type_id": packaging_type_id, // uuid
                    "packaging_type_name": data.__EMPTY_3, // type of packaging name
                    "buy_price": data.__EMPTY_4, // buy_price / purchase_price
                    "sell_price": data.__EMPTY_6, // sell_price / sale_price
                };
                const queryText = 'INSERT INTO ' + table_name + ' (product_id, product_name, unit_qty, packaging_type_id, packaging_type_name, buy_price, sell_price) VALUES ($1, $2, $3, $4, $5, $6, $7)';

                await query(
                    pool,
                    queryText,
                    [
                        values.product_id,
                        values.product_name,
                        values.unit_qty,
                        values.packaging_type_id,
                        values.packaging_type_name,
                        values.buy_price,
                        values.sell_price,
                    ]
                );
            }

            response(res, {
                result: 'Successful importing excel file',
            })
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });
};