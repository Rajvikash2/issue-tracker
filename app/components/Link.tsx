import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props{
    href: string;
    children : string; // label we put between links
}

const Link = ({href,children} : Props) => {
  return (
   <NextLink href={href} passHref legacyBehavior>
    <RadixLink>{children}</RadixLink>
   </NextLink>
  )
}

export default Link