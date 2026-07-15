import React from 'react';
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';

const DataVisualization = () => {
  const stats = [
    { icon: DollarSign, value: '$30B+', label: 'Unclaimed Assets', color: 'from-electric-blue to-cyber-teal' },
    { icon: Users, value: '3.4M', label: 'Annual Deaths in the US', color: 'from-cyber-teal to-neon-purple' },
    { icon: TrendingUp, value: '87%', label: 'Have Digital Accounts', color: 'from-neon-purple to-electric-blue' },
    { icon: Clock, value: '6+', label: 'Months to Discover', color: 'from-electric-blue to-success-green' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative"
        >
          {/* Card content — deliberately a solid light card (not the translucent
              glass-morphism token) since this component always needs to read
              as a light card with dark text, including when placed directly
              on the dark hero background. */}
          <div className="relative bg-white/95 p-4 md:p-6 rounded-2xl border border-border shadow-soft">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-electric-blue" />
              <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-electric-blue to-cyber-teal rounded-full" />
            </div>
            
            <div className="space-y-1">
              <div className="text-xl md:text-2xl font-black text-navy-deep">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-navy-light font-medium">
                {stat.label}
              </div>
            </div>
            
            {/* Animated progress indicator */}
            <div className="mt-3 md:mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.color} rounded-full transform origin-left transition-transform duration-1000 delay-${index * 200} group-hover:scale-x-100 scale-x-0`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataVisualization;