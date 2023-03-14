const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Todo = require('./models/todo')
const User = require('./models/user')

const typeDefs = gql`
  type Query {
    todos(email: String!): [Todo!]!
    user(email: String!): User!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(data: UpdateUserInput!): User!
    createTodo(data: CreateTodoInput!): Todo!
    updateTodo(id: ID!, data: updateTodoInput): Todo!
    deleteTodo(id: ID!): Todo!
  }

  input CreateUserInput {
    name: String!
    email: String!
    profileImg: String!
  }
  input UpdateUserInput {
    name: String!
    email: String!
  }
  input CreateTodoInput {
    text: String!
    desc: String!
    dateAndTime: String!
    notifyBefore: String!
    author: String!
  }
  input updateTodoInput {
    text: String!
    desc: String!
    dateAndTime: String!
    notifyBefore: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    profileImg: String!
  }

  type Todo {
    _id: ID!
    text: String!
    desc: String!
    dateAndTime: String!
    notifyBefore: String!
    author: String!
  }
`

const resolvers = {
  Query: {
    async todos(parent, args) {
      try {
        const user = await User.findOne({ email: args.email })
        if (!user) {
          throw new Error('user does not exist')
        }
        const result = await Todo.find({ author: args.email })
        return result
      } catch (err) {
        throw new Error(err)
      }
    },
    async user(parent, args) {
      console.log(args)
      try {
        const result = await User.findOne({ email: args.email })
        if (!result) {
          throw new Error('user does not exist')
        }
        return result
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createUser(parent, args) {
      try {
        const userExist = await User.findOne({ email: args.data.email })
        if (!userExist) {
          const user = new User(args.data)
          const result = await user.save()
          return result
        } else {
          console.log('user is there')
        }
      } catch {
        throw new Error('cannot create user')
      }
    },
    async updateUser(parent, { data }) {
      try {
        const result = await User.findOneAndUpdate(
          { email: data.email },
          {
            name: data.name,
          }
        )
        if (!result) {
          throw new Error('user does not exist')
        }
        return result
      } catch (err) {
        throw new Error(err)
      }
    },
    async createTodo(parent, { data }) {
      try {
        const user = await User.findOne({ email: data.author })
        console.log(user)
        if (!user) {
          throw new Error('user does not exist')
        }
        const todo = new Todo(data)
        const result = await todo.save()
        return result
      } catch (err) {
        throw new Error(err)
      }
    },
    async updateTodo(parent, { id, data }) {
      try {
        const todo = await Todo.findById(id)
        console.log(todo)
        if (!todo) {
          throw new Error('todo does not exist')
        }
        console.log(id)
        const result = await Todo.findByIdAndUpdate(id, data)
        return result
      } catch (err) {
        throw new Error(err)
      }
    },
    async deleteTodo(parent, { id }) {
      try {
        const todo = await Todo.findById(id)
        // console.log(user)
        if (!todo) {
          throw new Error('todo does not exist')
        }
        const result = await Todo.findByIdAndDelete(id)
        return result
      } catch {
        throw new Error('cannot delete todo')
      }
    },
  },
}

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
})

mongoose
  .connect(
    'mongodb+srv://smitDB:7qa9wtpxyiH1kCjT@cluster0.vllkyx4.mongodb.net/todo?retryWrites=true&w=majority'
  )
  .then((result) => {
    console.log(result)
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
