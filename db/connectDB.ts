const {connect} = require('mongoose');


export function connectDB  (MONGO_URI:string) {
    return connect(MONGO_URI);
}