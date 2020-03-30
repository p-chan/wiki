import unified from 'unified'
import remarkParse from 'remark-parse'
// @ts-ignore
import remarkRehype from 'remark-rehype'
// @ts-ignore
import rehypeStringify from 'rehype-stringify'
// @ts-ignore
import remarkBreaks from 'remark-breaks'

export const markdown = unified()
  .use(remarkParse)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeStringify)
