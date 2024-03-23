import DomainEvent from "@/core/domain/domain-event"
import { EssayAssessment } from "../../enterprise/entities/essay-assessment"
import { EssayAssessmentRepository } from "../repositories/essay-assessment-repository"
import { Queue } from "../queue/queue"
import { EntityId } from "@/core/domain/entity-id"

export class RequestEvaluateEssayUsecase {
  constructor(
    private essayAssessmentRepository: EssayAssessmentRepository,
    private queue: Queue
  ) { }

  async execute(props: Input): Promise<Output> {
    const essayAssessment = EssayAssessment.create({
      student_id: new EntityId(props.student_id),
      essay_title: props.title,
      essay_content: props.content,
      essay_kind: props.kind,
    })
    essayAssessment.register(async (event: DomainEvent) => {
      await this.queue.publish(event.name, JSON.stringify(event))
    })
    essayAssessment.process()
    await this.essayAssessmentRepository.create(essayAssessment)
    return { id: essayAssessment.id.value }
  }
}

type Input = {
  student_id: string,
  kind: 'enem',
  title: string,
  content: string,
}

type Output = {
  id: string
}