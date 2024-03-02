'use client'
import React from 'react';
import {
    Box,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Flex,
    Stack,
    Link,
    Text,
    Spacer,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
} from '@chakra-ui/react';
import { NavGroup, NavItem, Navbar, NavbarItem, NavbarLink } from '@saas-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '@/components/utils/Logo';
import { useUserContext } from "@/lib/user/UserProvider";
import { useRouter } from 'next/navigation'; // Corrected from 'next/navigation' to 'next/router'
// import SignOut from './Auth/SignOut';
// import ViewModeSwitch from './ViewModeSwitch';

const NavbarComponent = () => {
    const router = useRouter();
    const { supabase } = useUserContext();
    const { userProfile } = useUserContext();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

    const userName = userProfile.full_name;
    const userId = userProfile?.id; // Ensure userProfile is accessed safely

    const UserMenu = () => {

        return (
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <IconButton
                        icon={<Image src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"} borderRadius="full" boxSize="40px" />}
                        aria-label="User menu"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>
                        <p>{userName}</p>
                {/*        <ViewModeSwitch />   */}
                    </PopoverHeader>
                    <PopoverBody>
                        {userId ? (
                            <Stack>
                                <Link href="/gallery">Gallery</Link>
                                <Link href="/account">Account</Link>
                  {/*              <SignOut /> */}
                            </Stack>
                        ) : (
                            <Link href="/signin">Login / Signup</Link>
                        )}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
    };

    return (
        <Box>

            <Navbar
                position="sticky"
                borderBottomWidth="1px"
                background="transparent"
                backdropFilter="blur(10px)"
            >
                <IconButton
                    display={{ base: "inline-flex", md: "none" }} // Only show on mobile
                    icon={<Logo width="50px" height="50px" />}
                    onClick={onDrawerOpen}
                    aria-label="Open Menu"
                />
                <Box display={{ base: "none", md: "flex" }}>
                    <Logo width="50" height="50" />
                </Box>
                <Spacer />
                <Stack direction="row" spacing={4} align="center">
                    <NavbarItem>
                        <NavbarLink href="/">Home</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink href="/dashboard/images/create">Create</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink href="/dashboard/images/edit">Edit</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink href="/dashboard/video">Video</NavbarLink>
                    </NavbarItem>
                </Stack>
                <Spacer />
                <Box display={{ base: "none", md: "flex" }}>
                    <UserMenu />
                </Box>
            </Navbar>
            <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader><Logo width="50" height="50" /></DrawerHeader>
                    <DrawerBody>
                        <Stack as="nav" spacing={4}>
                        <NavGroup title="Images">
          <NavItem icon={<HamburgerIcon />} href="/dashboard/images/create">Create</NavItem>
          <NavItem icon={<HamburgerIcon />} href="/dashboard/images/edit">Edit</NavItem>
        </NavGroup>

        <NavGroup title="Video">
          <NavItem icon={<HamburgerIcon />} href="/dashboard/video/clone-voice">Clone Voice</NavItem>
          <NavItem icon={<HamburgerIcon />} href="/dashboard/video/create-avatar">Create Avatar</NavItem>
          <NavItem icon={<HamburgerIcon />} href="/dashboard/video/create-script">Create Script</NavItem>
        </NavGroup>

        <NavGroup title="Model Training">
          <NavItem icon={<HamburgerIcon />} href="/dashboard/avatar/create-avatar">Create Avatar</NavItem>
          <NavItem icon={<HamburgerIcon />} href="/dashboard/avatar/train-model">Train Model</NavItem>
        </NavGroup>

                           

                            {/* Add more links as needed */}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
            {/*            <ViewModeSwitch />   */}
                        {userId ? (
                            <Stack>
                                <Link href="/gallery">Gallery</Link>
                                <Link href="/account">Account</Link>
         {/*                       <SignOut />   */}
                            </Stack>
                        ) : (
                            <Link href="/signin">Login / Signup</Link>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default NavbarComponent;
