'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, BriefcaseBusiness } from 'lucide-react';
import { cn } from "@/lib/utils";
import UserManagement from '@/components/users/UserManagement';
import RolesManagement from '@/components/roles/RolesManagement';
import { NavItem } from '@/types/nav.type';

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

const SideNav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(
    navItems[0].component 
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-gray-100 p-4 transition-all duration-300 ease-in-out flex flex-col",
          isExpanded ? "w-64" : "w-20"
        )}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-end mb-6 p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </button>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveComponent(item.component)}
              className={cn(
                "flex items-center space-x-2 p-3 rounded-lg transition-colors w-full text-left",
                "hover:bg-gray-200 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isExpanded && (
                <span className="font-medium truncate">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {activeComponent}
      </div>
    </div>
  );
};

export default SideNav;
