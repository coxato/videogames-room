const MongoClient = require("mongodb").MongoClient;
const { dev,
    offlineHost,
    offlinePort,
    offlineDatabase,
    dbUSer,
    dbNameOnline,
    dbPassword
} = require("../config/config");

let dbName, URI;
// is  development or production
if(dev){
    URI = `mongodb://${offlineHost}:${offlinePort}/${offlineDatabase}`;
    dbName = offlineDatabase;
}else{
    URI = `mongodb+srv://${dbUSer}:${dbPassword}@${dbNameOnline}-ydbgb.mongodb.net/test?retryWrites=true&w=majority`;
    dbName = dbNameOnline;
}

const mongoClientOptions = { useNewUrlParser: true,  useUnifiedTopology: true };
// mongoDB instance
// ###########################
let INSTANCE;
// ###########################

class MongoServices {
    constructor() {
        this.instance = INSTANCE;
        this.dbName = dbName;
        this.client = new MongoClient(URI, mongoClientOptions);
    }

    async connect(){
        try {
            const client = await this.client.connect();
            // set first connection
            this.instance = client;
            // use INSTANCE for others connections
            INSTANCE = client;
            console.log("db connected");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async disconnect(){
        try {
            if(this.instance) await this.instance.close();
            return true;
        } catch (err) {
            throw Error(err)
        }
    }

    // ===================   CRUD   ====================
    // ## create ##
    createOne(collection, query){
        const {instance, dbName} = this;
        return instance.db(dbName).collection(collection).insertOne(query);
    }

    createMany(collection, arr){
        const {instance, dbName} = this;
        return instance.db(dbName).collection(collection).insertMany(arr);
    }
    // ## find ##
    getAll(collection, query, projection = null){
        const {instance, dbName} = this;
        console.log("la proyeccion ", projection)
        return instance.db(dbName).collection(collection).find(query).project(projection).toArray();    
    }

    getOne(collection, query, projection = null){
        const {instance, dbName} = this;
        console.log("la proyeccion ", projection)
        return instance.db(dbName).collection(collection).findOne(query, { projection });

    }
    // ## update ##
    updateOne(collection, query, newValue){
        const {instance, dbName} = this;
        return instance.db(dbName).collection(collection).updateOne(query, newValue);
    }

    updateMany(collection, query){
        const {instance, dbName} = this;
        return instance.db(dbName).collection(collection).updateMany(query);
    }
    // ## delete ##
    deleteOne(collection, query){
        const {instance, dbName} = this;
        return instance.db(dbName).collection(collection).deleteOne(query);
    }

    deleteMany(collection, query){
        const {instance, dbName} = this;
        return instance.db(dbName).collection(collection).deleteMany(query);
    }
    // ## drop ##
    dropCollection(collection){
        const {instance, dbName} = this;
        return instance.db(dbName).collection(collection).drop();
    }
}

module.exports = MongoServices;