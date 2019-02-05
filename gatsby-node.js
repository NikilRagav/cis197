/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const html = require('remark-html')
const crypto = require('crypto')

exports.onCreateNode = ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  reporter,
}) => {
  const { createNode } = actions

  if (
    node.internal.mediaType !== `text/markdown` &&
    node.internal.mediaType !== `text/x-markdown`
  ) {
    return
  }

  return new Promise(async (resolve, reject) => {
    const content = await loadNodeContent(node)
    const slides = content.split('---\n').map(body => body.trim())

    slides.forEach((slide, index) => {
      remark()
        .use(recommended)
        .use(html)
        .process(slide, (err, file) => {
          if (err) return

          const digest = crypto
            .createHash(`md5`)
            .update(String(file))
            .digest(`hex`)

          createNode({
            id: createNodeId(`${node.id}_${index + 1} >>> Slide`),
            parent: node.id,
            children: [],
            internal: {
              type: `Slide`,
              contentDigest: digest,
            },
            html: String(file),
            index: index + 1,
          })
        })
    })

    resolve()
  })
}

// Remove trailing slash
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise((resolve, reject) => {
    // Remove trailing slash
    const newPage = Object.assign({}, page, {
      path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``),
    })

    if (newPage.path !== page.path) {
      // Remove the old page
      deletePage(page)
      // Add the new page
      createPage(newPage)
    }

    resolve()
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/Markdown.js`)

  const slidePostTemplate = path.resolve(`src/templates/slide.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      allSlide {
        edges {
          node {
            html
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const slides = result.data.allSlide.edges

    slides.forEach((slide, index) => {
      createPage({
        path: `/slides/${index + 1}`,
        component: slidePostTemplate,
        context: {
          index: index + 1,
          absolutePath: process.cwd() + `/src/slides#${index + 1}`,
        },
      })
    })

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
