import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExternalLink, Github, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Project } from '@shared/schema';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  const { t } = useTranslation();

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
        data-testid="modal-project-details"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-heading flex items-center justify-between">
            {project.title}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label={t('aria.closeModal')}
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-lg">
            {project.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Thumbnail */}
          <div className="relative overflow-hidden rounded-md aspect-[4/3] bg-muted">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="pixelated w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t('projects.techStack')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  data-testid={`badge-modal-tech-${tech.toLowerCase()}`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Role & Timeframe */}
          <div className="grid sm:grid-cols-2 gap-4">
            {project.role && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('projects.role')}
                </h4>
                <p className="text-foreground">{project.role}</p>
              </div>
            )}
            {project.timeframe && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('projects.timeframe')}
                </h4>
                <p className="text-foreground">{project.timeframe}</p>
              </div>
            )}
          </div>

          {/* What I Learned */}
          {project.whatILearned && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {t('projects.whatILearned')}
              </h4>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {project.whatILearned}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {project.liveUrl && (
              <Button
                asChild
                size="lg"
                className="hover-elevate active-elevate-2"
                data-testid="button-modal-live"
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
                size="lg"
                asChild
                className="hover-elevate active-elevate-2"
                data-testid="button-modal-code"
              >
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  {t('projects.codeButton')}
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
