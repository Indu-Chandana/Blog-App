import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
      
    `

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
}

export const getPostDetails = async (slug) => { //we get slug. when we call it. under ($slug: String!) we are accepting a slug thats going to be a string. 1.45.13min
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }){
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
              content {
                raw
              }
            }
          }
    `

  const result = await request(graphqlAPI, query, { slug }); // we can pass slug and object as the third parameter

  return result.post;
}

// we can create new export const get RecentPosts. this create using manualy not using GraphCMS Playground.
export const getRecentPosts = async () => {
  const query = gql`
    query getPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last:3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query);

  return result.posts;
}

// This create using manualy not using GraphCMS Playground.
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
       posts(
         where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}}} 
         last: 3
       ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, { categories, slug });

  return result.posts;
}

// This create using manualy not using GraphCMS Playground.
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query);

  return result.categories;
}