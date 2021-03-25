import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProductsService } from './products.service';

import { environment } from './../../../../environments/environment';

describe('ProductsService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllProducts', () => {

    it('should return products', () => {
      //arrange (emular)
      const expectData = [
        {
          id: '1',
          title: 'title asdasda',
          description: 'bla bla asdasd',
          image: 'img/img.jpg'
        },
        {
          id: '2',
          title: 'title jlghjkghj',
          description: 'bla bla asdasd',
          image: 'img/img.jpg'
        }
      ];
      let dataError, dataResponse;
      //act
      service.getAllProducts()
      .subscribe(response => {
        dataResponse = response;
      }, error => {
        dataError = error;
      });
      const req = httpTestingController.expectOne(`${environment.url_api}/products`)
      req.flush(expectData);
      // assert
      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });
});
