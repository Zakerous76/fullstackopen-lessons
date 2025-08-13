const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const { v1: uuid } = require("uuid")
const mongoose = require("mongoose")
const Person = require("./models/person")
require("dotenv").config()
mongoose.set("strictQuery", false)

const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to:", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MONGODB")
  })
  .catch((error) => {
    console.log("error:", error.message)
  })

const typeDefs = `
enum YesNo {
  YES
  NO
}

type Address {
  street: String!
  city: String! 
}

type Person {
  name: String!
  phone: String
  address: Address!
  id: ID!
}

type Query {
  personCount: Int!
  allPersons(phone: YesNo): [Person!]!
  findPerson(name: String!): Person

}

type Mutation{
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!  
  ): Person
  editNumber(
    name: String!
    phone: String!
  ):Person
}
`

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments,
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }
      // RETURN ONLY THE PERSONS THAT HAVE A PHONE NUMBER
      // const byPhone = (person) =>
      //   args.phone === "YES" ? person.phone : !person.phone
      // return Person.find({}).filter(byPhone)
      return Person.find({ phone: { $exists: args.phone === "YES" } })
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    },
  },
  Mutation: {
    addPerson: async (root, args) => {
      const isExist = (await Person.find({ name: args.name })).length
      if (isExist) {
        throw new GraphQLError("Name must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        })
      }

      const person = new Person({ ...args })

      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }

      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (!person) {
        return null
      }

      person.phone = args.phone

      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError("Saving number failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }

      return person
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
