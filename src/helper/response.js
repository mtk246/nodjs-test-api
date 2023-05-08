const response = (res, queryData) => {
    if (queryData) {
        return res.status(200).json({
            message: "Success",
            result: queryData,
        })
    } else {
        return res.status(400).json({
            message: "Not Found!",
        })
    }
}

exports.response = response;