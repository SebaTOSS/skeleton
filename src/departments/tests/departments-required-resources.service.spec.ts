import { DepartmentsRequiredResourcesService } from "../departments-required-resources.service";

describe('Departments Required Resources Service', () => {
    let service: DepartmentsRequiredResourcesService;

    beforeEach(() => {
        service = new DepartmentsRequiredResourcesService();
    });

    it('should get additional resources', async () => {
        const expected = {};
        const result = await service.getAdditionalResources();
        expect(result).toBeDefined();
        expect(result).toEqual(expected);
    });

    it('should get additional resources filter', () => {
        const result = service.getAdditionalResourcesFilter();
        expect(result).toBeUndefined();
    });
});
