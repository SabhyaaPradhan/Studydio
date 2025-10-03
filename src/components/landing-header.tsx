"use client";

import StaggeredMenu from './StaggeredMenu';
import { Logo } from "@/components/icons";

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Pricing', ariaLabel: 'View our pricing', link: '#pricing' },
  { label: 'Login', ariaLabel: 'Login to your account', link: '/login' },
  { label: 'Sign Up', ariaLabel: 'Create a new account', link: '/signup' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];


export default function LandingHeader() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen={true}
      colors={['#B19EEF', '#5227FF']}
      accentColor="#ff6b6b"
      onMenuOpen={() => console.log('Menu opened')}
      onMenuClose={() => console.log('Menu closed')}
    />
  );
}
