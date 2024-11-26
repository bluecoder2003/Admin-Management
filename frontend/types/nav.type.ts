export interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    component: React.ReactNode;
  }