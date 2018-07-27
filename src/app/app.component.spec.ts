import { TestBed, async, getTestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

import { AppService } from './app.service';
import { BarObj } from './Bar'
import { not } from '../../node_modules/@angular/compiler/src/output/output_ast';

describe('AppComponent', () => {
  let injector;
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientTestingModule,
        NgbModule.forRoot(),
        FormsModule],
      providers: [AppService]
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(AppService);
    httpMock = injector.get(HttpTestingController);
  })

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title ''`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(undefined);
  }));

  it('should getBars from API and return an Observable<BarObj>', () => {
    service.getBarsApi().subscribe(bar => {
      expect(bar.bars.length).toBeGreaterThanOrEqual(1)
      expect(bar.buttons.length).toBeGreaterThanOrEqual(1)
    });
    const req = httpMock.expectOne(`${service.url}`);
    expect(req.request.method).toBe('GET');
  });
});
