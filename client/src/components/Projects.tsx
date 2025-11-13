import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { Project } from '@shared/schema';

export function Projects() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const categories = [
    { id: 'all', label: t('projects.filterAll') },
    { id: 'web', label: t('projects.filterWeb') },
    { id: 'art', label: t('projects.filterArt') },
    { id: 'game', label: t('projects.filterGame') },
    { id: 'uiux', label: t('projects.filterUiux') },
  ];

  const sortOptions = [
    { id: 'recent', label: t('projects.sortRecent') },
    { id: 'featured', label: t('projects.sortFeatured') },
    { id: 'viewed', label: t('projects.sortViewed') },
  ];

  const filteredProjects = projects
    ?.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') return (b.featured || 0) - (a.featured || 0);
      if (sortBy === 'viewed') return (b.views || 0) - (a.views || 0);
      return 0; // recent (default order from API)
    });

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-center mb-12">
          {t('projects.title')}
        </h2>

        {/* Filter & Search Bar */}
        <div className="mb-12 space-y-6">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3" dir="ltr">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`button-filter-${category.id}`}
                className="hover-elevate active-elevate-2"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('projects.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-projects"
              />
            </div>
            <div className="flex gap-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={sortBy === option.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy(option.id)}
                  data-testid={`button-sort-${option.id}`}
                  className="hover-elevate active-elevate-2"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDetailsClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">{t('projects.noProjects')}</p>
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
