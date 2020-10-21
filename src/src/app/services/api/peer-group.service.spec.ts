import { PeerGroupService } from './peer-group.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AssetUrlPipe } from 'src/app/common/pipes';
import { environment } from '../../../environments/environment';
import { TestBed } from '@angular/core/testing';

describe('PeerGroupService', () => {

  let httpTestingController: HttpTestingController;

  

  const mockSurvey = {
    results: [
      {
        id: '1',
        name: 'Survey A', code: 'abc', displayOrder: true, regions: [], effectiveDate: '020173'
        
      }
    ]
  }



  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],

      providers: [
        { provide: AssetUrlPipe, useValue: {} }, PeerGroupService
      ]

    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('returns list of surveys with matching value', () => {

    // Get a reference to the service constructed with mocked http client
    let service = TestBed.inject(PeerGroupService);

    service.getSurveys().subscribe(
      srv => {
        expect(srv.length).toEqual(1), fail;
        expect(srv[0].name).toEqual(mockSurvey.results[0].name)
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/survey`);

    expect(req.request.method).toBe("GET");

    req.flush(mockSurvey);

  });
})

