const seeder = require('mongoose-seed')

const db = 'mongodb://localhost:27017/project-3am'

seeder.connect(db, function () {
    seeder.loadModels(['./src/models/InternalUser'])
    seeder.clearModels(['interalusers'])
    seeder.populateModels(data, function() {
        if(err) {
            return console.log('seed err', err)
        }
        if(done) {
            return console.log('seed complete', done)
        }
        seeder.disconnect()
    })
})

const data = [{
    'model': 'InternalUser',
    'documents': [{
        '_id': '5fa9d7bcb486b22294e4df8c',
        'name': 'admin',
        'email': 'admin@admin.com',
        'role': 'admin',
        'password': '$2b$12$sqaQ0M7MxyC5JqUjZ0Bh3edihlnEesnOnwsbl8aSzvZfP.1YARZ8q'
    }]
}]