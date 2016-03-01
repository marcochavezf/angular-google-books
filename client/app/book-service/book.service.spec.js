'use strict';

describe('Service: bookService', function () {

  // load the service's module
  beforeEach(module('angularChallengeApp'));

  // instantiate service
  var bookService;
  var $httpBackend;

  beforeEach(inject(function (_bookService_, _$httpBackend_) {
    bookService = _bookService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should retrieve real books data', function (done) {
    $httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=quilting')
      .respond({
        items: ['book1', 'book2', 'book3', 'book4']
      });

    bookService.getRealData().then(function(books){
      expect(books.length).toEqual(4);
      done();
    });

    $httpBackend.flush();
  });

  it('should retrieve mock books data', function (done) {
    $httpBackend.expectGET('assets/volumes.json')
      .respond({
        items: ['book4', 'book3', 'book2', 'book1', 'book0']
      });

    bookService.getMockData().then(function(books){
      expect(books.length).toEqual(5);
      done();
    });

    $httpBackend.flush();
  });

});
