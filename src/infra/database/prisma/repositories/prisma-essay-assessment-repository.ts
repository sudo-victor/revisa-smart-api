import { EssayAssessmentRepository } from "@/domain/essay/application/repositories/essay-assessment-repository";
import { EssayAssessment } from "@/domain/essay/enterprise/entities/essay-assessment";
import { prismaClient } from "../client";
import { PrismaEssayAssessmentMapper } from "../mappers/prisma-essay-assessment-mapper";
import { EntityId } from "@/core/domain/entity-id";
import { EssayAssessmentStatusValues } from "@/domain/essay/enterprise/value-objects/essay-assessment-status";

export class PrismaEssayAssessmentRepository extends EssayAssessmentRepository {
  async getByStudentId(studentId: string): Promise<EssayAssessment[]> {
    const essays = await prismaClient.essayAssessment.findMany({
      where: { user_id: studentId}
    })
    return essays.map(PrismaEssayAssessmentMapper.toDomain)
  }

  async create(essayAssessment: EssayAssessment): Promise<void> {
    await prismaClient.essayAssessment.create({
      data: PrismaEssayAssessmentMapper.toPrisma(essayAssessment)
    })
  }

  async save(essayAssessment: EssayAssessment): Promise<void> {
    await prismaClient.essayAssessment.update({
      where: {
        id: essayAssessment.id.value,
      },
      data: PrismaEssayAssessmentMapper.toPrisma(essayAssessment)
    })
  }

  async getById(id: string): Promise<EssayAssessment | null> {
    const essay = await prismaClient.essayAssessment.findUnique({
      where: { id },
    })

    return essay ? PrismaEssayAssessmentMapper.toDomain(essay) : null
  }

}