import { TestBed } from '@angular/core/testing';

import { ExportFileService } from './export-file.service';

describe('ExportFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportFileService = TestBed.get(ExportFileService);
    expect(service).toBeTruthy();
  });
});
