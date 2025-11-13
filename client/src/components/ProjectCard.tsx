import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ExternalLink, Github, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
  onDetailsClick: () => void;
}

export function ProjectCard({ project, onDetailsClick }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300"
      data-testid={`card-project-${project.id}`}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-[4/3] bg-muted">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="pixelated w-full h-full object-cover"
            loading="lazy"
          />
          {project.featured === 1 && (
            <Badge
              className="absolute top-3 right-3 bg-accent text-accent-foreground border-accent-border"
              data-testid={`badge-featured-${project.id}`}
            >
              ⭐ Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold font-heading line-clamp-1">
            {project.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {project.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs"
              data-testid={`badge-tech-${tech.toLowerCase()}`}
            >
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.techStack.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
        {project.liveUrl && (
          <Button
            variant="default"
            size="sm"
            asChild
            className="hover-elevate active-elevate-2"
            data-testid={`button-live-${project.id}`}
          >
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('projects.liveButton')}
            </a>
          </Button>
        )}
        {project.codeUrl && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hover-elevate active-elevate-2"
            data-testid={`button-code-${project.id}`}
          >
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              {t('projects.codeButton')}
            </a>
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onDetailsClick}
          className="hover-elevate active-elevate-2"
          data-testid={`button-details-${project.id}`}
        >
          <Info className="w-4 h-4 mr-2" />
          {t('projects.detailsButton')}
        </Button>
      </CardFooter>
    </Card>
  );
}
