'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { GiAutoRepair } from "react-icons/gi";
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';
const Navbar = () => {
    const {status, data : session} = useSession();
    const pathname = usePathname();
    const links =[
        {label:'Dashboard', href:'/'},
        {label:'Issues', href:'/issues'},
    ]
  return (
   
    <nav className=' space-x-6 border-b mb-5 px-5 py-4'>
        <Container>
        <Flex justify='between'>
            <Flex gap='3' align='center'>
            <Link href="/"><GiAutoRepair /></Link>
        <ul className='flex space-x-5'>
            {links.map(link=>
            <li key={link.href}>
            <Link 
            className={ classNames({
                'text-zinc-900' : link.href===pathname,
                'text-zinc-500': link.href!==pathname,
                'hover:text-zinc-800 transition-colors' : true
            })}
            href={link.href}>{link.label}
            </Link>
            </li>)}  
        </ul>
            </Flex>
            <Box>
            {status === 'authenticated' ? (
                <Link href='/api/auth/signout'>Log Out</Link>
            ) : (
                <Link href='/api/auth/signin'>Login</Link>
            )}
          </Box>
        </Flex>
        </Container>
          
    </nav>
  )
}

export default Navbar