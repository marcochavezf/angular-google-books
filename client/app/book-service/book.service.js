/**
 * BookService Factory
 * @namespace Factories
 */
(function(){
  'use strict';

  angular.module('angularChallengeApp')
    .factory('bookService', bookService);

  bookService.$inject = ['$http', '$q', '$log'];

  /**
   * @namespace BookService
   * @desc Retrieves book data (from Google API and Mock API)
   * @memberOf Factories
   */
  function bookService($http, $q, $log){

    var REAL_DATA_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';
    var MOCK_DATA_ENDPOINT = 'assets/volumes.json';

    var service = {
      getBooksData: getBooksData,
      getMockData: getMockData
    };

    return service;

    ////////////

    /**
     * @name getBooksData
     * @desc Get books data from Google API
     * @param {Object} params Search terms {search} and number of books to show {limit}
     * @returns {Array}
     * @memberOf Factories.BookService
     */
    function getBooksData(params) {
      params = params || {};
      var search = params.search || 'quilting';
      var limit = params.limit || 10;
      var querystring = '?q=' + search;

      return $http.get(REAL_DATA_ENDPOINT + querystring)
        .then(getBooks)
        .catch(getBooksFailed);

      function getBooks(response) {
        var items = response.data.items;
        var endPosition = items.length < limit ? items.length : limit;
        return items.slice(0, endPosition);
      }

      function getBooksFailed(error) {
        $log.error('XHR Failed for getBooks.' + error.data);
      }
    }

    /**
     * @name getMockData
     * @desc Get books data from Mock API
     * @returns {Array}
     * @memberOf Factories.BookService
     */
    function getMockData() {
      var deferred = $q.defer();

      $http.get(MOCK_DATA_ENDPOINT)
        .success(function(response) {
          deferred.resolve(response.items)
        })
        .catch(function(error){
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }

})();
