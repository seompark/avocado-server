import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import * as config from '../config'
import { typeDefs, resolvers } from './graphql'

mongoose.connect(config.db.uri, {
  ...config.db.connectionOptions,
  useNewUrlParser: true
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: process.NODE_ENV === 'production'
})

server.listen({
  port: config.commons.port
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
