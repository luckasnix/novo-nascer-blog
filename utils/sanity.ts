import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { postsPerPage } from './constants'
import { PostItemProps } from '../components/post-item'
import { AuthorItemProps } from '../components/author-item'

const clientOptions = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production'
}

const client = sanityClient(clientOptions)

const previewClient = sanityClient({
  ...clientOptions,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

const getClient = (preview: boolean) => preview ? previewClient : client

export const getPostsByPage = async (page: number): Promise<PostItemProps[]> => {
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
  return posts as PostItemProps[]
}

export const getRecentPosts = async (qty: number): Promise<PostItemProps[]> => {
  const start = 0
  const end = qty
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

export const getPost = async (slug: string, preview: boolean): Promise<PostItemProps> => {
  const curClient = getClient(preview)
  const post = await curClient.fetch(`
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
    .then(res => {
      if (preview) {
        if (res?.[1]) {
          return res?.[1]
        } else {
          return res?.[0]
        }
      } else {
        return res?.[0]
      }
    })
  return post
}

export const getPostsSlugs = async (): Promise<PostItemProps[]> => {
  const postSlugs = await client.fetch(`
    *[_type == 'post'] {
      'slug': slug.current
    }
  `)
  return postSlugs
}

export const getPostsMetadata = async (): Promise<PostItemProps[]> => {
  const postsMetadata = await client.fetch(`
    *[_type == 'post'] {
      _id,
      'slug': slug.current,
      _createdAt,
      _updatedAt
    }
  `)
  return postsMetadata
}

export const getAuthorsByPage = async (page: number): Promise<AuthorItemProps[]> => {
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

export const getAuthorSlugs = async (): Promise<AuthorItemProps[]> => {
  const authorSlugs = await client.fetch(`
    *[_type == 'author'] {
      'slug': slug.current
    }
  `)
  return authorSlugs
}

export const getAuthorBySlug = async (slug: string): Promise<AuthorItemProps> => {
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

export const getPostsByAuthorSlug = async (authorSlug: string): Promise<PostItemProps[]> => {
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

export interface ImageSource {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
  description?: string
  coverImageCaption?: string
  coverImageDescription?: string
}

export function urlFor(src: ImageSource) {
  return builder.image(src)
}

export default client
