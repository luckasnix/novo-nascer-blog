import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { POSTS_PER_PAGE } from './constants'

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false
})

export async function getPostsByPage(page) {
  const start = (page - 1) * POSTS_PER_PAGE
  const end = page * POSTS_PER_PAGE
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

export async function getPost(slug) {
  const post = await client.fetch(`
    *[_type == 'post' && slug.current == $slug] {
      title,
      subtitle,
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

export async function getPostsSlugs() {
  const postSlugs = await client.fetch(`
    *[_type == 'post'] {
      'slug': slug.current
    }
  `)
  return postSlugs
}

export async function getAuthors() {
  const authors = await client.fetch(`
    *[_type == 'author'] {
      'slug': slug.current,
      profilePicture,
      name,
      bio
    }
  `)
  return authors
}

export async function getAuthorsSlugs() {
  const authorsSlugs = await client.fetch(`
    *[_type == 'author'] {
      'slug': slug.current
    }
  `)
  return authorsSlugs
}

export async function getAuthorBySlug(slug) {
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

export async function getPostsByAuthorSlug(authorSlug) {
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

export function urlFor(src) {
  return builder.image(src)
}

export default client
