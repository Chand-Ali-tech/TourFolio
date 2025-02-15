// This app is for query filtering and all of that stuff to reduce file size.
class APIFeatures {
  constructor(query, queryString) { // query = All tours . queryString = URL
    this.query = query;
    this.queryString = queryString;
  }
  
  // /api/tours?duration[gte]=5&difficulty=easy
  filter() {
    const queryObj = { ...this.queryString }; //Make shallow copy
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // /api/tours?sort=price,ratingsAverage
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  
  // /api/tours?fields=name,duration,price
  Fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //- means exclude.
    }
    return this;
  }

  // /api/tours?page=2&limit=10
  Pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;