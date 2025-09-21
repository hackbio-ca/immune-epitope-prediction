import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PopulationCoverageProps {
  coverageData?: {
    european?: number;
    african?: number;
    asian?: number;
    hispanic?: number;
  };
}

export const PopulationCoverage = ({ coverageData }: PopulationCoverageProps) => {
  const populations = [
    { name: "European", key: "european" as const },
    { name: "African", key: "african" as const },
    { name: "Asian", key: "asian" as const },
    { name: "Hispanic", key: "hispanic" as const },
  ];

  const getGradientClass = (percentage?: number) => {
    if (!percentage) return "bg-muted";
    if (percentage >= 80) return "bg-gradient-to-br from-success-dark to-success";
    if (percentage >= 60) return "bg-gradient-to-br from-success to-success-light";
    if (percentage >= 40) return "bg-gradient-to-br from-success-light to-success";
    return "bg-gradient-to-br from-muted to-success-light";
  };

  const getTextClass = (percentage?: number) => {
    if (!percentage) return "text-muted-foreground";
    return percentage >= 40 ? "text-white" : "text-foreground";
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Regional Population Coverage
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {populations.map((population) => {
          const percentage = coverageData?.[population.key];
          return (
            <Card
              key={population.key}
              className={`shadow-[var(--shadow-card)] overflow-hidden ${getGradientClass(percentage)}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className={`text-base font-medium ${getTextClass(percentage)}`}>
                  {population.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getTextClass(percentage)}`}>
                  {percentage !== undefined ? `${percentage.toFixed(1)}%` : "—"}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};