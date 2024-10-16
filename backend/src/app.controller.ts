import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    // Controller method which handles POST requests to / with a JSON body of the following format:
    // { matrix: string }
    // and then processes the matrix using the methods from app.service.ts and returns the result as JSON response.
    @Post('/')
    processMatrix(
        @Body() { matrix }: { matrix: string; }
    ) {
        const parsedMatrix = this.appService.parseAndRotateMatrix(matrix);
        const neighborhoods = this.appService.matrixToNeighborhoods(parsedMatrix);

        return neighborhoods;
    }
}
