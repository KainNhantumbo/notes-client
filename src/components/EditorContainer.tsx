import {
  bold,
  italic,
  code,
  codeBlock,
  link,
  strikethrough,
  image,
  checkedListCommand,
  hr,
  unorderedListCommand,
  orderedListCommand,
  quote,
  divider,
  group,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
} from '@uiw/react-md-editor/lib/commands';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import actions from '../data/actions';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/src/styles/modules/_editor';
import dynamic from 'next/dynamic';
import { MDEditorProps } from '@uiw/react-md-editor';
import { DefaultTheme, useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';
import rehypeSanitize from 'rehype-sanitize';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const EditorContainer: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { darkmode } = useThemeContext();
  const { state, dispatch, fetchAPI } = useAppContext();
  const [value, setValue] = useState<string | undefined>(`
  This is an example note.
You can write notes in [GitHub-flavored Markdown](http://doc.inkdrop.info/manual/markdown-cheatsheet).

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Emphasis

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

#### Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

## Lists

1. First ordered list item
2. Another item
   * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.  
   Note that this line is separate, but within the same paragraph.  
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)


* Unordered list can use asterisks
- Or minuses
+ Or pluses

## Links

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

## Images

Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"



## Tables

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* |  | **nicely** 1 | 2 | 3

## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

## Horizontal Rule

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

## Line Breaks

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.

  `);

  const [innerHeight, setInnerHeight] = useState<number>(0);

  const computeInnerHeight = (): void => {
    setInnerHeight(() => {
      return Number(window.innerHeight.toFixed(1)) - 250;
    });
  };

  useEffect(() => {
    computeInnerHeight();
    window.addEventListener('resize', computeInnerHeight);
    return () => {
      window.removeEventListener('resize', computeInnerHeight);
    };
  }, []);

  return (
    <Container>
      <section className='header-container'>
        

      </section>
      <MDEditor
        value={value}
        onChange={(value) => setValue(() => value)}
        autoFocus={true}
        toolbarHeight={30}
        highlightEnable={true}
        height={innerHeight}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commands={[
          group([title1, title2, title3, title4, title5, title6], {
            groupName: 'Toggle title',
            name: 'Toggle Title',
            buttonProps: { 'aria-label': 'Insert title' },
          }),
          bold,
          italic,
          strikethrough,
          link,
          divider,
          checkedListCommand,
          unorderedListCommand,
          orderedListCommand,
          divider,
          image,
          quote,
          code,
          hr,
          codeBlock,
        ]}
      />
    </Container>
  );
};

export default EditorContainer;
