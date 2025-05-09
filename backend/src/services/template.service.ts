import {
  AppError,
  TemplateError,
  TemplateNotFoundError,
} from "../modules/error";
import { PrismaClient, User } from "@prisma/client";
import TemplateRepository from "../repository/templates.repo";

export default class TemplateService {
  private prisma: PrismaClient;
  private templateRepo: TemplateRepository;

  constructor() {
    this.prisma = new PrismaClient();
    this.templateRepo = new TemplateRepository();
  }

  public async createTemplate(user: User, template: any) {
    try {
      const data = await this.prisma.$transaction(async (tx) => {
        const templateData = await tx.template.create({
          data: {
            userId: user.id,
            preTemplateId: template.data.preTemplateId || "",
            name: template.data.name,
            actions: {
              create: template.data.actions.map(
                (
                  item: {
                    availableActionId: string;
                    sortingOrder: number;
                    actionMetadata: any;
                  },
                  index: number
                ) => ({
                  actionId: item.availableActionId,
                  sortingOrder: index,
                  metadata: item.actionMetadata,
                })
              ),
            },
          },
          include: {
            actions: true,
          },
        });

        return templateData;
      });

      return data;
    } catch (error) {
      if (error instanceof TemplateError) {
        throw error;
      }

      console.error("Error fetching templates:", error);
      throw new AppError(
        "Failed to fetch templates",
        500,
        "TEMPLATES_FETCH_ERROR"
      );
    }
  }

  public async fetchAllTemplates(user: any) {
    try {
      const templates = await this.templateRepo.getAllUserTemplates(user.id);

      if (!templates || templates.length === 0) {
        throw new TemplateNotFoundError();
      }

      return templates;
    } catch (error) {
      if (error instanceof TemplateError) {
        throw error;
      }

      console.error("Error fetching templates:", error);
      throw new AppError(
        "Failed to fetch templates",
        500,
        "TEMPLATES_FETCH_ERROR"
      );
    }
  }

  public async fetchTemplateById(id: string) {
    try {
      const template = await this.templateRepo.getUserTemplateById(id);

      if (!template) {
        throw new TemplateNotFoundError();
      }

      return template;
    } catch (error) {
      if (error instanceof TemplateError) {
        throw error;
      }

      console.error("Error fetching template:", error);
      throw new AppError(
        "Failed to fetch template",
        500,
        "TEMPLATE_FETCH_ERROR"
      );
    }
  }
}
