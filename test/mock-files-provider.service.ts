/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilesService } from "../src/files";

export class MockFilesService implements FilesService {
    upload(filename: string, file: any, folder?: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    get(filename: string, query: any): string {
        throw new Error('Method not implemented.');
    }
    delete(filename: string): string {
        throw new Error('Method not implemented.');
    }
}
