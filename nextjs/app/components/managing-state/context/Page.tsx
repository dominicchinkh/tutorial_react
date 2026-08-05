import Heading from './Heading';
import Section from './Section';

/*
 * Alternatives you should consider before using context:
 *
 * 1. Start by passing props
 * 2. Extract components and pass JSX as children to them
 * 
 *    For example, maybe you pass data props like posts to visual components that 
 *    don’t use them directly, like <Layout posts={posts} />. Instead, make Layout
 *    take children as a prop, and render <Layout><Posts posts={posts} /></Layout>
 * 
 * Use cases for context:
 * 
 * 1. Theming
 * 2. Current account
 * 3. Routing
 * 4. Managing state
 * 
 *    As your app grows, you might end up with a lot of state closer to the top of 
 *    your app. Many distant components below may want to change it. It is common 
 *    to use a reducer together with context to manage complex state and pass it 
 *    down to distant components without too much hassle
 * 
 */

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
