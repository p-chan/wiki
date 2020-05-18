import { Node, Parent } from 'unist'
import unified from 'unified'
import remarkParse from 'remark-parse'
// @ts-ignore
import remarkRehype from 'remark-rehype'
// @ts-ignore
import rehypeStringify from 'rehype-stringify'
// @ts-ignore
import remarkBreaks from 'remark-breaks'
// @ts-ignore
import remarkFrontmatter from 'remark-frontmatter'

import mdast from 'mdast'

export const processer = unified()
  // Markdown to mdast
  .use(remarkParse)
  .use(remarkBreaks)
  // mdast to hast
  .use(remarkRehype)
  // hast to HTML
  .use(rehypeStringify)
  // Frontmatter
  .use(remarkFrontmatter)

export const parse = (markdown: string): mdast.Parent => {
  return processer.parse(markdown) as mdast.Parent
}

export const runSync = (ast: Node) => {
  return processer.runSync(ast)
}

export const stringify = (ast: Node) => {
  return processer.stringify(ast)
}
