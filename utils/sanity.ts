import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { postsPerPage } from './constants'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false
})

export const getPostsByPage = async (page: number) => {
  const start = (page - 1) * postsPerPage
  const end = page * postsPerPage
  const posts = await client.fetch(`
    *[_type == 'post'] | order(date desc) [$start...$end] {
      'slug': slug.current,
      title,
      description,
      date,
      coverImage
    }
  `, { start, end })
  return posts
}

export const getPost = async (slug: string) => {
  const post = await client.fetch(`
    *[_type == 'post' && slug.current == $slug] {
      title,
      description,
      date,
      coverImage,
      content[] {
        ...,
        'asset': asset->
      },
      'author': author->{
        'slug': slug.current,
        profilePicture,
        name,
        bio
      }
    }
  `, { slug })
    .then(res => res[0])
  return post
}

export const getPostsSlugs = async () => {
  const postSlugs = await client.fetch(`
    *[_type == 'post'] {
      'slug': slug.current
    }
  `)
  return postSlugs
}

export const getPostsMetadata = async () => {
  const postSlugs = await client.fetch(`
    *[_type == 'post'] {
      _id,
      'slug': slug.current,
      _createdAt,
      _updatedAt
    }
  `)
  return postSlugs
}

export const getAuthorsByPage = async (page: number) => {
  const start = (page - 1) * postsPerPage
  const end = page * postsPerPage
  const authors = await client.fetch(`
    *[_type == 'author'] | order(name desc) [$start...$end] {
      'slug': slug.current,
      profilePicture,
      name,
      bio
    }
  `, { start, end })
  return authors
}

export const getAuthorsSlugs = async () => {
  const authorsSlugs = await client.fetch(`
    *[_type == 'author'] {
      'slug': slug.current
    }
  `)
  return authorsSlugs
}

export const getAuthorBySlug = async (slug: string) => {
  const author = await client.fetch(`
    *[_type == 'author' && slug.current == $slug] {
      profilePicture,
      name,
      bio
    }
  `, { slug })
    .then(res => res[0])
  return author
}

export const getPostsByAuthorSlug = async (authorSlug: string) => {
  const posts = await client.fetch(`
    *[_type == 'post' && author->slug.current == $authorSlug] | order(date desc) {
      'slug': slug.current,
      title,
      description,
      date,
      coverImage
    }
  `, { authorSlug })
  return posts
}

const builder = imageUrlBuilder(client)

export function urlFor(src: any) {
  return builder.image(src)
}

export default client
