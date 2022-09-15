import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
// import ResponseModel from './dto/responseModel';
// import { Broker } from 'src/rmq/broker';

@Controller('student')
export class StudentController {
  // private broker = Broker.getInstance();
  //Topics We need for the controller
  private topicArray = ['STUDENT_ADD', 'STUDENT_UPDATE', 'STUDENT_DELETE'];
  private serviceName = [
    'STUDENT_SERVICE',
    'STUDENT_SERVICE',
    'STUDENT_SERVICE',
  ];
  constructor(private readonly studentService: StudentService) {
    // this.module_init();
  }

  // async module_init() {
  //   console.log('inside Employee Controller for the connection');
  //   for (var i = 0; i < this.topicArray.length; i++) {
  //     this.broker.listenToService(
  //       this.topicArray[i],
  //       this.serviceName[i],
  //       (() => {
  //         var value = this.topicArray[i];
  //         return async (result) => {
  //           console.log(
  //             'Params passed to listener callback in MS ' +
  //               JSON.stringify(result),
  //           );
  //           let responseModelwithDto: ResponseModel<CreateStudentDto>;
  //           try {
  //             switch (value) {
  //               case 'STUDENT_ADD':
  //                 this.studentService.create(result.message.name);
  //                 break;
  //               case 'STUDENT_UPDATE':
  //                 var uid = result.message.id;
  //                 // this.studentService.update(uid, result.message);
  //                 break;
  //               case 'STUDENT_DELETE':
  //                 var id = result.message;
  //                 // this.studentService.delete(id);
  //                 break;
  //             }
  //             responseModelwithDto = result;
  //             console.log('Sending data back to Api Gateway');
  //             for (var i = 0; i < result.OnSuccessTopicsToPush.length; i++) {
  //               const topicName = result.OnSuccessTopicsToPush[i];
  //               this.broker.PublicMessageToTopic(
  //                 topicName,
  //                 responseModelwithDto,
  //               );
  //             }
  //           } catch (error) {
  //             console.log('Error Occured while listening to queues');
  //             console.log(error, result);
  //             for (var i = 0; i < result.OnFailureTopicsToPush.length; i++) {
  //               const topicName = result.OnFailureTopicsToPush[i];
  //               this.broker.PublicMessageToTopic(
  //                 topicName,
  //                 responseModelwithDto,
  //               );
  //             }
  //           }
  //         };
  //       })(),
  //     );
  //   }
  // }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  // @Get('/:id')
  // findOne(@Param('id') id: string) {
  //   console.log('ji');
  //   return this.studentService.findOne(+id);
  // }

  @Put()
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(updateStudentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.studentService.remove(id);
  }
}
