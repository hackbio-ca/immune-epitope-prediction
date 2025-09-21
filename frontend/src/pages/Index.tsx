import { useState } from "react";
import { Header } from "@/components/Header";
import { InputSection } from "@/components/InputSection";
import { SummaryCards } from "@/components/SummaryCards";
import { PopulationCoverage } from "@/components/PopulationCoverage";
import { EpitopeTable, EpitopeData } from "@/components/EpitopeTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState<{
    epitopeCount: number;
    optimalHLA: string;
    coverageData: {
      european: number;
      african: number;
      asian: number;
      hispanic: number;
    };
    epitopeData: EpitopeData[];
  } | null>(null);
  
  const { toast } = useToast();

  const handleAnalyze = async (sequence: string, threshold: number) => {
    setIsLoading(true);
    setHasResults(false);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results for demo
      const mockResults = {
        epitopeCount: Math.floor(Math.random() * 15) + 5,
        optimalHLA: `HLA-A*${(Math.random() * 99).toFixed(0).padStart(2, '0')}:${(Math.random() * 99).toFixed(0).padStart(2, '0')}`,
        coverageData: {
          european: Math.random() * 40 + 60,
          african: Math.random() * 50 + 30,
          asian: Math.random() * 45 + 45,
          hispanic: Math.random() * 35 + 50,
        },
        epitopeData: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
          hla: `HLA-${'ABC'[Math.floor(Math.random() * 3)]}*${(Math.random() * 99).toFixed(0).padStart(2, '0')}:${(Math.random() * 99).toFixed(0).padStart(2, '0')}`,
          length: Math.floor(Math.random() * 6) + 8,
          sequence: Array.from({ length: Math.floor(Math.random() * 6) + 8 }, () => 
            'ACDEFGHIKLMNPQRSTVWY'[Math.floor(Math.random() * 20)]
          ).join(''),
          bindingScore: Math.random() * 0.5 + threshold,
        })),
      };
      
      setResults(mockResults);
      setHasResults(true);
      
      toast({
        title: "Analysis Complete",
        description: `Found ${mockResults.epitopeCount} potential epitopes for vaccine design.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the peptide sequence. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        <InputSection onAnalyze={handleAnalyze} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner />}
        
        {hasResults && results && !isLoading && (
          <div className="space-y-8">
            <SummaryCards 
              epitopeCount={results.epitopeCount}
              optimalHLA={results.optimalHLA}
            />
            
            <PopulationCoverage coverageData={results.coverageData} />
            
            <EpitopeTable data={results.epitopeData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;