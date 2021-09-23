const { gql } = require('apollo-server')

const typeDefs = gql`
  type Post {
    content: String
    id: ID!
    published: Boolean!
    title: String!
  }

  type Query {
    feed: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createDraft(content: String, title: String!): Post!
    publish(id: ID!): Post
  }
`

const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'hoge',
    published: true,
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'hoge',
    published: true,
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'hoge',
    published: false,
  },
]

const resolvers = {
  Query: {
    feed: (parent, args) => {
      return posts.filter((post) => post.published)
    },
    post: (parent, args) => {
      return posts.find((post) => post.id === Number(args.id))
    },
  },
  Mutation: {
    createDraft: (parent, args) => {
      posts.push({
        id: posts.length + 1,
        title: args.title,
        content: args.content,
        published: false,
      })
      return posts[posts.length - 1]
    },
    publish: (parent, args) => {
      const postToPublish = posts.find((post) => post.id === Number(args.id))
      postToPublish.published = true
      return postToPublish
    },
  },
  Post: {
    content: (parent) => parent.content,
    id: (parent) => parent.id,
    published: (parent) => parent.published,
    title: (parent) => parent.title,
  },
}

module.exports = {
  resolvers,
  typeDefs,
}

