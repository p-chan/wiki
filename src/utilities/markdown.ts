import unified from 'unified'
import remarkParse from 'remark-parse'
// @ts-ignore
import remarkRehype from 'remark-rehype'
// @ts-ignore
import rehypeStringify from 'rehype-stringify'

export const markdown = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
