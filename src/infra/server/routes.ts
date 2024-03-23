import { Router } from "express"
import { RequestEvaluateEssayController } from "../controllers/essay/request-evaluate-essay-controller"
import { RequestEvaluateEssayUsecase } from "@/domain/essay/application/usecases/request-evaluate-essay-usecase"
import { PrismaEssayAssessmentRepository } from "../database/prisma/repositories/prisma-essay-assessment-repository"
import { RedisQueue } from "../queue/redis/redis-queue"
import { RegisterStudentController } from "../controllers/account/register-student-controller"
import { RegisterStudentUsecase } from "@/domain/account/application/usecases/register-student-usecase"
import { PrismaStudentRepository } from "../database/prisma/repositories/prisma-student-repository"
import { Hasher } from "../cryptography/hasher"
import { ListEssaysByStudentIdController } from "../controllers/essay/list-essays-by-student-id-controller"
import { ListEssaysByStudentIdUsecase } from "@/domain/essay/application/usecases/list-essays-by-student-id-usecase"

// const aiGateway = new ChatptAiGateway()
const essayAssessmentRepository = new PrismaEssayAssessmentRepository()
const requestEvaluateEssayUsecase = new RequestEvaluateEssayUsecase(essayAssessmentRepository, RedisQueue.getInstance())
const requestEvaluateEssayController = new RequestEvaluateEssayController(requestEvaluateEssayUsecase)
const studentRepository = new PrismaStudentRepository()
const hasher = new Hasher()
const registerStudentUsecase = new RegisterStudentUsecase(studentRepository, hasher, RedisQueue.getInstance())
const registerStudentController = new RegisterStudentController(registerStudentUsecase)
const listEssaysByStudentIdUsecase = new ListEssaysByStudentIdUsecase(essayAssessmentRepository)
const listEssaysByStudentIdController = new ListEssaysByStudentIdController(listEssaysByStudentIdUsecase)

const essayRoutes = Router()

essayRoutes.post("/essays/evaluate", requestEvaluateEssayController.handler.bind(requestEvaluateEssayController))
essayRoutes.get("/essays/of/:student_id", listEssaysByStudentIdController.handler.bind(listEssaysByStudentIdController))
essayRoutes.post("/students", registerStudentController.handler.bind(registerStudentController))

export { essayRoutes }