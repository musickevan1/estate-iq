import React from 'react';

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

declare const Header: React.FC<HeaderProps>;
export default Header;
