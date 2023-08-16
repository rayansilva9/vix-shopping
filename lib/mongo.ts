import { MongoClient } from 'mongodb'

const uri =
  'mongodb+srv://teste:teste1234@cluster0.a95wca5.mongodb.net/?retryWrites=true&w=majority'
//@ts-ignore
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
export default client
