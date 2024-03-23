import { Competence } from "@/domain/essay/enterprise/entities/competence";
import { Competence as PrismaCompetence } from "@prisma/client";

export class PrismaCompetenceMapper {
  static toPrisma(competence: Competence): PrismaCompetence {
    return {
      id: competence.id.value,
      name: competence.name,
      possible_score: competence.possibleScore,
      score_achieved: competence.scoreAchieved,
      essay_assessment_id: competence.essayAssessmentId.value
    }
  }
}