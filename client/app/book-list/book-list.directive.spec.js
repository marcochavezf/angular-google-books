'use strict';

describe('Directive: myBookList', function () {

  // load the directive's module and view
  beforeEach(module('angularChallengeApp'));
  beforeEach(module('app/book-list/book-list.html'));

  var element, scope, $httpBackend;

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=quilting')
      .respond({
        items: [{
          volumeInfo: {
            title: 'Quilting',
            authors: ['Mary Jo Hiney'],
            description: 'description'
          }
        }]
      });
  }));

  it('should contain the "Quilting" title in the compiled directive', inject(function ($compile) {
    element = angular.element('<my-book-list></my-book-list>');
    element = $compile(element)(scope);
    $httpBackend.flush();
    scope.$apply();
    expect(element.html()).toContain('Quilting');
  }));
});
