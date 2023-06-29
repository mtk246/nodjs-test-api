const { createPool, query } = require("../config/pg_connection");
const { response } = require("../helper/response");

exports.get = async (req, res) => {
    const { user_id } = req.query;

    if (user_id) {
        const pool = createPool('neondb');

        const rows = `SELECT * FROM user WHERE user_id = '${user_id}'`;

        const result = await query(
            pool,
            rows,
        );

        response(res, result);
    } else {
        const pool = createPool('neondb');

        const rows = 'SELECT * FROM user';
    
        const result = await query(
            pool,
            rows,
        );
    
        response(res, result);
    }
    
};
