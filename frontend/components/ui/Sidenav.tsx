import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, BriefcaseBusiness } from 'lucide-react';
import { cn } from "@/lib/utils";
import UserManagement from '../users/UserManagement';
import RolesManagement from '../roles/RolesManagement';

// Navigation Item Interface
interface NavItem {
  icon: React.ElementType;
  label: string;
  component: JSX.Element;
}

// Animated Hamburger Component
const AnimatedHamburger = ({ onToggle }: { onToggle?: (isOpen: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onToggle?.(!isOpen);
  };

  return (
    <button
      onClick={handleClick}
      className="relative h-8 w-8 rounded-full transition-colors duration-200 lg:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-4">
        <span
          className={cn(
            "absolute h-0.5 w-6 bg-product-text1 transform transition-all duration-300 ease-in-out",
            isOpen ? "top-2.5 rotate-45" : "top-0"
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-6 bg-product-text1 top-2.5 transform transition-all duration-200 ease-in-out",
            isOpen ? "opacity-0" : "opacity-100"
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-6 bg-product-text1 transform transition-all duration-300 ease-in-out",
            isOpen ? "top-2.5 -rotate-45" : "top-5"
          )}
        />
      </div>
    </button>
  );
};

// Navigation Items
const navItems: NavItem[] = [
  { 
    icon: Users, 
    label: 'Users', 
    component: <UserManagement /> 
  },
  { 
    icon: BriefcaseBusiness, 
    label: 'Roles', 
    component: <RolesManagement /> 
  },
];

// SideNav Component
const SideNav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
    setIsExpanded(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Hamburger */}
      <div className="fixed top-4 left-4 z-50">
        <AnimatedHamburger 
          onToggle={(isOpen) => {
            setIsMobileMenuOpen(isOpen);
            setIsExpanded(isOpen);
          }} 
        />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-product-leftnav text-product-text1 p-6 transition-all duration-300 ease-in-out flex flex-col fixed top-0 left-0 z-40 h-full",
          "w-2/3 lg:w-64", // Increased mobile width to 2/3 of screen
          isExpanded ? "lg:w-64" : "lg:w-24",
          "lg:translate-x-0",
          !isMobileMenuOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:flex self-end mb-6 p-2 hover:bg-[#252235] rounded-full transition-colors"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </button>

        <nav className="mt-12 space-y-4 md:mt-0">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveIndex(index);
                if (window.innerWidth < 1024) {
                  setIsMobileMenuOpen(false);
                }
              }}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-lg transition-colors w-full text-left",
                "lg:p-3 lg:space-x-2", // Smaller padding on desktop
                "mobile:text-lg", // Larger text on mobile
                index === activeIndex
                  ? "bg-[#252235] text-product-text3"
                  : "hover:bg-[#252235] hover:text-product-text3"
              )}
            >
              <item.icon className="h-7 w-7 flex-shrink-0 lg:h-5 lg:w-5" />
              {isExpanded && (
                <span className="font-medium truncate text-lg lg:text-base">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 p-6 bg-product-bg text-product-text1 transition-all duration-300",
          "overflow-x-auto hide-scrollbar", // Enable horizontal scrolling and hide scrollbar
          "lg:ml-20",
          isExpanded ? "lg:ml-64" : "lg:ml-24"
        )}
      >
        {/* Content Wrapper */}
        <div className="min-w-[768px]"> {/* Minimum width to prevent squishing */}
          {navItems[activeIndex].component}
        </div>
      </div>
    </div>
  );
};

export default SideNav;