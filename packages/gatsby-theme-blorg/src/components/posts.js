import React from 'react'
import { Link } from 'gatsby'
import Layout from './layout'
import Footer from './footer'
import { useSiteMetadata } from '../hooks'
import { compose, withTintedBackground } from '../utils/styles'

const Post = ({ title, date, category, slug, description }) => (
  <div key={slug}>
    <div css={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center' }}>
      <time css={theme => ({ color: theme.color.text })}>
        <small>{ date }</small>
      </time>
      <Link
        to={`/${category}`}
        css={compose({
          borderRadius: '0.3em',
          padding: '0 .2em',
          fontSize: '.8em',
        }, withTintedBackground)}>
        { category }
      </Link>
    </div>
    <h2 css={{ marginBottom: '.1em', marginTop: 0 }}>
      <Link to={slug} css={theme => ({
        color: 'inherit',
        '&:hover': {
          color: theme.color.primary,
        },
      })}>
        { title }
      </Link>
    </h2>
    <p css={theme => ({
      color: theme.color.gray,
    })}>{ description }</p>
  </div>
)

const PaginationLink = ({ url, children }) => {
  if (!url) return <div></div>
  return (
    <Link to={url}>{ children }</Link>
  )
}

export default ({ posts, prev, next, location }) => {
  const { author } = useSiteMetadata()
  return (
    <Layout location={location}>
      <main>
        { posts.map(Post) }
      </main>
      <div css={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '3em 1em 0 1em',
      }}>
        <PaginationLink url={prev}>
          ◄ more recent posts
        </PaginationLink>
        <PaginationLink url={next}>
          older posts ►
        </PaginationLink>
      </div>
      <Footer>
        © {new Date().getFullYear()} {author}
      </Footer>
    </Layout>
  )
}
