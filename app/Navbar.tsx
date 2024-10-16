'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { GiAutoRepair } from "react-icons/gi";
import classNames from 'classnames';
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const Navbar = () => {
    const pathname = usePathname();
    const { status, data: session } = useSession();
    
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ];

    return (
        <nav className='border-b mb-5 px-5 py-4'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><GiAutoRepair /></Link>
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
                    </Flex>

                    <Box>
                        {status === 'authenticated' && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar src={session.user!.image!} fallback='P' size='3' radius='full' className='cursor-pointer' />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size='3'>
                                        {session.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item>
                                        <Link href='/api/auth/signout'>Sign Out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}

                        {status === 'unauthenticated' && (
                            <Link href='/api/auth/signin'>Log In</Link>
                        )}
                    </Box>
                </Flex>       
            </Container>
        </nav>
    );
};

export default Navbar;
