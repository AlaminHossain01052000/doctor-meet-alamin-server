class ApiFeatures {
    constructor(query, queryStr) { // queryStr: keyword=product
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        // queryStr: keyword=product
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        /*
        here console.log(keyword) expected output
        { name: { '$regex': 'product', '$options': 'i' } } 
        */

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // queryStr like: keyword=product
        const queryCopy = { ...this.queryStr };

        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        /*
       for example:
       before removeFields result like -> { keyword: "product", category: "male"}
       after removeFields result like --> { category: "male" }
       */

        //now Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);  //as its JSON
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        /*
        before regularExpression queryStr be like --> {price:{ gt: "1200", lt: "100" }}
        after regularExpression queryStr be like --> {price:{ $gt: "1200", $lt: "100" }}
        */
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;
