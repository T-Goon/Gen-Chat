const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
    title: String,
    body: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports =  model('Post', PostSchema);