/**
 * myBookList Directive
 * @namespace Directives
 */
(function() {
  'use strict';

  angular.module('angularChallengeApp')
    .directive('myBookList', myBookList);

  /**
   * @namespace myBookList
   * @desc Shows a book list
   * @memberOf Directives
   */
  function myBookList() {
    var directive = {
      templateUrl: 'app/book-list/book-list.html',
      restrict: 'EA',
      link: link,
      controller: BookListController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

    function link(scope, el, attr, vm) {
      /**/
    }
  }

  BookListController.$inject = ['bookService'];

  /**
   * @namespace myBookList
   * @desc Book list logic
   * @memberOf Directives
   */
  function BookListController(bookService) {
    var vm = this;

    vm.books = [];
    vm.search = 'quilting';
    vm.loading = false;
    vm.limitBooks = 10;
    vm.useRealData = true;
    vm.updateBookList = updateBookList;

    updateBookList();

    ////////////

    /**
     * @name updateBookList
     * @desc Refresh book list
     * @returns {Array}
     * @memberOf Directives.myBookList
     */
    function updateBookList(){
      vm.books = [];
      vm.loading = true;

      var booksDataPromise = null;
      if (vm.useRealData) {
        var params = {
          search: vm.search,
          limit: vm.limitBooks
        };
        booksDataPromise = bookService.getRealData(params);
      } else {
        booksDataPromise = bookService.getMockData();
      }

      return booksDataPromise
        .then(function(books){
          vm.books = books;
          return vm.books;
        })
        .finally(function(){
          vm.loading = false;
        });
    }
  }

})();
