import {
  type Project,
  type InsertProject,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  incrementProjectViews(id: string): Promise<void>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.projects = new Map();
    this.contactMessages = new Map();
    this.seedProjects();
  }

  // Seed with sample projects
  private seedProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Pixel Portfolio",
        tagline: "A cute pixel-art portfolio website with Spotify integration",
        description: "Built with React, TypeScript, and Tailwind CSS. Features animated pixel sprites, bilingual i18n support, and integrated Spotify Web Playback SDK.",
        thumbnail: "/assets/generated_images/Sample_project_thumbnail_1_0e79a7c5.png",
        category: "web",
        techStack: ["React", "TypeScript", "Tailwind CSS", "Spotify SDK"],
        liveUrl: "https://example.com",
        codeUrl: "https://github.com/example",
        role: "Full Stack Developer & Designer",
        timeframe: "2 weeks",
        whatILearned: "Learned how to integrate Spotify Web Playback SDK, create pixel-perfect designs, and implement comprehensive i18n support with RTL languages.",
        featured: 1,
      },
      {
        title: "Pixel Adventure Game",
        tagline: "A nostalgic pixel-art platformer game",
        description: "Classic platformer with smooth physics, collectibles, and charming pixel-art visuals. Built with Phaser.js and modern web technologies.",
        thumbnail: "/assets/generated_images/Sample_project_thumbnail_2_28b1a5b0.png",
        category: "game",
        techStack: ["Phaser.js", "JavaScript", "Canvas API"],
        liveUrl: "https://example.com/game",
        role: "Game Developer",
        timeframe: "1 month",
        whatILearned: "Mastered game physics, sprite animations, and level design principles.",
        featured: 0,
      },
      {
        title: "Design System",
        tagline: "Comprehensive UI component library",
        description: "A complete design system with reusable components, design tokens, and documentation. Features pixel-art inspired aesthetics with modern accessibility.",
        thumbnail: "/assets/generated_images/Sample_project_thumbnail_3_69fa7938.png",
        category: "uiux",
        techStack: ["React", "Storybook", "Figma"],
        codeUrl: "https://github.com/example/design-system",
        role: "UI/UX Designer",
        timeframe: "3 weeks",
        whatILearned: "Created a scalable design system, established design tokens, and documented components comprehensively.",
        featured: 1,
      },
    ];

    sampleProjects.forEach((project) => {
      const id = randomUUID();
      const fullProject: Project = {
        ...project,
        id,
        views: Math.floor(Math.random() * 100),
      };
      this.projects.set(id, fullProject);
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      views: 0,
    };
    this.projects.set(id, project);
    return project;
  }

  async incrementProjectViews(id: string): Promise<void> {
    const project = this.projects.get(id);
    if (project) {
      project.views = (project.views || 0) + 1;
      this.projects.set(id, project);
    }
  }

  async createContactMessage(
    insertMessage: InsertContactMessage
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
