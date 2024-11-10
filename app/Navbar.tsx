'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { GiAutoRepair } from "react-icons/gi";
import classNames from 'classnames';
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Navbar = () => {
   

    return (
        <nav className='border-b mb-5 px-5 py-4'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><GiAutoRepair /></Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>                    
                </Flex>       
            </Container>
        </nav>
    );
};


const NavLinks = ()=>{
    const pathname = usePathname();
  
    
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' },
    ];
    return(
        <ul className='flex space-x-5'>
        {links.map(link => (
            <li key={link.href}>
            <Link 
            className={classNames({
            'text-zinc-900': link.href === pathname,
            'text-zinc-500': link.href !== pathname,
            'hover:text-zinc-800 transition-colors': true
        })}
        href={link.href}
        >
        {link.label}
    </Link>
    </li>
     ))}        
  </ul>
    )
}



const AuthStatus = () =>{
    const { status, data: session } = useSession();
    if(status==='loading') return <Skeleton width='3rem' height='3rem'/>;
    if(status==='unauthenticated') 
        return <Link href='/api/auth/signin'>Log In</Link>;
    return (
    <Box>   
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar src={session!.user!.image!} fallback='P' size='3' radius='full' className='cursor-pointer' referrerPolicy='no-referrer'/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size='3'>
                    {session!.user!.email}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <Link href='/api/auth/signout' className='hover:pl-2 transition-all duration-300'>Sign Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>   
</Box>
    )
}

export default Navbar;
