"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Users, Activity } from "lucide-react";
import { Package, Thermometer, Shield, TrendingDown } from "lucide-react";

interface StatsCardsProps {
  activeShipments?: number;
  avgTemperature?: number;
  alertCount?: number;
}

export function StatsCards({ activeShipments = 12, avgTemperature = -18, alertCount = 0 }: StatsCardsProps) {
  const stats = [
    {
      icon: Package,
      label: "Active Shipments",
      value: activeShipments.toString(),
      description: "Currently monitored",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Thermometer,
      label: "Avg Temperature",
      value: `${avgTemperature}°C`,
      description: "Across all shipments",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      icon: Shield,
      label: "Compliance Rate",
      value: "98.5%",
      description: "Within safe range",
      gradient: "from-green-500/20 to-green-500/5",
    },
    {
      icon: TrendingDown,
      label: "Alerts",
      value: alertCount.toString(),
      description: "Temperature warnings",
      gradient: "from-orange-500/20 to-orange-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`p-6 bg-gradient-to-br ${stat.gradient} border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
