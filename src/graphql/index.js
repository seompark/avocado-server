import typeDefs from './schema.graphql'

export { typeDefs }
export const resolvers = {
  Query: {
    getUser: () => ({ id: 'testid' })
  },
  Mutation: {
    register: () => ({})
  }
}
