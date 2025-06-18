const {connect} = require('mongoose');


export function connectDB  (MONGO_URI) {
    return connect(MONGO_URI);
}