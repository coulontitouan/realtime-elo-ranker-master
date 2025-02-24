import { Controller, Get } from '@nestjs/common';

const URL = '/api';

@Controller(URL)
export class AppController {
    static readonly URL: string = URL;

    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}
