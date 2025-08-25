import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Grid, List, Sparkles } from "lucide-react";

interface ProjectFiltersProps {
  categories: string[];
  selectedCategory: string;
  searchTerm: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (term: string) => void;
}

const ProjectFilters = ({
  categories,
  selectedCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange,
}: ProjectFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("all");
  };

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all";

  // Popular/Featured categories to show first
  const featuredCategories = ["react", "javascript", "typescript", "nodejs", "python", "css", "html"];
  const sortedCategories = [
    ...featuredCategories.filter(cat => categories.includes(cat)),
    ...categories.filter(cat => !featuredCategories.includes(cat)).sort()
  ];

  const getFilterCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== "all") count++;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects by name, description, or tech stack..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background border-border focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 sm:hidden"
          >
            <Filter className="w-4 h-4" />
            Categories
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                {getFilterCount()}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </Button>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div className={`space-y-4 transition-all duration-300 ${isFilterOpen ? 'block' : 'hidden sm:block'}`}>
        {/* Featured Categories */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>Featured Technologies</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange("all")}
              className="rounded-full font-medium"
            >
              All Projects
              <Badge variant="secondary" className="ml-2 text-xs">
                {categories.length + 1}
              </Badge>
            </Button>
            
            {featuredCategories.filter(cat => categories.includes(cat)).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="rounded-full capitalize font-medium"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* All Categories */}
        {categories.filter(cat => !featuredCategories.includes(cat)).length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Grid className="w-4 h-4" />
              <span>Other Technologies</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.filter(cat => !featuredCategories.includes(cat)).sort().map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                  className="rounded-full capitalize font-medium"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-foreground">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  "{searchTerm}"
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors" 
                    onClick={() => onSearchChange("")}
                  />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-2 capitalize">
                  <Filter className="w-3 h-3" />
                  {selectedCategory}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors" 
                    onClick={() => onCategoryChange("all")}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-border pt-4">
        <span>
          {categories.length > 0 ? (
            <>
              {sortedCategories.length} technologies • 
              {hasActiveFilters ? " Filtered view" : " All projects"}
            </>
          ) : (
            "Loading project categories..."
          )}
        </span>
        
        {categories.length > 0 && (
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Live GitHub sync
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;