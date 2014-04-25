/******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var slideMenu = angular.module('slideMenu', []);
	
	slideMenu.factory('asmService', ['$rootScope', function($rootScope) {
	  // This object tracks the status of each window and whether or not
	  // it must be the only active window at a given time 
	  var asmStates = {
	      'slideLeft': {active: false, exclusive: false}
	    , 'slideRight': {active: false, exclusive: false}
	    , 'slideTop': {active: false, exclusive: false}
	    , 'slideBottom': {active: false, exclusive: false}
	    , 'pushLeft': {active: false, exclusive: true}
	    , 'pushRight': {active: false, exclusive: true}
	    , 'pushTop': {active: false, exclusive: true}
	    , 'pushBottom': {active: false, exclusive: true}
	  };
	
	  // This object tracks whether or not to push the asm-wrapper
	  var asmPush = null;
	
	  /** This function toggles one of the menus listed in asmStates from 
	   *  active to inactive and vice-versa based on certain criteria.
	   *  @param menuKey the menu to attempt to toggle
	   */
	  var toggle = function(menuKey) {
	    if (asmStates.hasOwnProperty(menuKey)) {
	      var menuValue = asmStates[menuKey];
	      var canToggle = true;
	      var key = null
	      for (key in asmStates) {
	        var value = asmStates[key];
	        // Ensure that no other exclusive menus are active, and do not 
	        // activate an exclusive menu if any other menu is active.
	        if ((key !== menuKey) && ((value.exclusive && value.active) || menuValue.exclusive)) {
	          canToggle = false;
	          break;
	        }
	      }
	      if (canToggle) {
	        asmStates[menuKey].active = !asmStates[menuKey].active;
	        // Update asm-wrapper on whether it needs pushing aside
	        asmPush = asmStates[menuKey].exclusive ? menuKey : null;
	        console.log(menuKey + ' active: ' + asmStates[menuKey].active);
	        // Emit event
	        $rootScope.active = asmStates.slideLeft.active;
	        $rootScope.$emit('asmEvent', null)
	      }
	      else {
	        console.log('Cannot toggle!');
	      }
	    } 
	    else {
	      console.log('Unknown menu!');
	    }
	  };
	
	  // Return Service object
	  return {
	      asmStates: asmStates
	    , asmPush: asmPush
	    , toggle: toggle
	  };
	}]);
	
	slideMenu.directive('asmSlideLeft', ['$rootScope', 'asmService', function($rootScope, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.slideLeft.active;
	          console.log('New active: ' + $scope.active);
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-horizontal asm-left');
	        attrs.$set('data-ng-class', '{"asm-left-open: active"}');
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {}
	        }
	      }
	  }
	}]);
	
	slideMenu.directive('asmPushLeft', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.pushLeft.active;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-horizontal asm-left');
	        attrs.$set('data-ng-class', '{asm: true, "asm-horizontal": true, "asm-left": true, "asm-left-open": active}');
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmSlideRight', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.slideRight.active;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-horizontal asm-right');
	        attrs.$set('data-ng-class', '{asm: true, "asm-horizontal": true, "asm-right": true, "asm-right-open": active');
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmPushRight', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.pushRight.active;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-horizontal asm-right');
	        attrs.$set('data-ng-class', '{asm: true, "asm-horizontal": true, "asm-right": true, "asm-right-open": active');
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmSlideTop', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.slideTop.active;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-vertical asm-top');
	        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-top": true, "asm-top-open": active}"');
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmPushTop', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.pushTop.active;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-vertical asm-top');
	        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-top": true, "asm-top-open": active}"');
	         return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmSlideBottom', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.slideBottom.active;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-vertical asm-bottom');
	        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-bottom": true, "asm-bottom-open": active');
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmPushBottom', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.active = asmService.asmStates.pushBottom.active;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('class', 'asm asm-vertical asm-bottom');
	        attrs.$set('data-ng-class', '{asm: true, "asm-vertical": true, "asm-bottom": true, "asm-bottom-open": active');
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmWrapper', ['$rootScope', '$compile', 'asmService', function($rootScope, $compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , scope: {}
	    , controller: function($scope) {
	        $rootScope.$on('asmEvent', function(event, prop) {
	          $scope.asmPush = asmService.asmPush;
	        });
	      }
	    , compile: function(element, attrs) {
	        attrs.$set('ng-class', '{"asm-wrapper": true, "asm-body-closed": !asmPush, ' + 
	          '"asm-body-push-left": asmPush === "pushLeft", "asm-body-push-right": asmPush === "pushRight", ' + 
	          '"asm-body-push-top": asmPush === "pushTop", "asm-body-push-bottom": asmPush === "pushBottom"}'); 
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {}
	          , post: function postLink(scope, iElement, iAttrs) {
	              //$compile(iElement.contents())(scope);
	            }
	        }
	      }
	  };
	}]);
	
	slideMenu.directive('asmControl', ['$compile', 'asmService', function($compile, asmService) {
	  return {
	      restrict: 'AEC'
	    , compile: function(element, attrs) {
	        element[0].innerHTML = '<a href="#">' + element[0].innerHTML + '</a>';
	        return {
	            pre: function preLink(scope, iElement, iAttrs) {
	            }
	          , post: function postLink(scope, iElement, iAttrs) {
	              iElement.find('a').on('click', function(ev) {
	                ev.preventDefault();
	                asmService.toggle(attrs.menu);
	              });
	            }
	        };
	      }
	  };
	}]);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(4)
		// The css code:
		(__webpack_require__(3))
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		".asm-wrapper {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 10;\n}\n#asm-mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 15;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.8);\n}\n.asm {\n  position: fixed;\n  z-index: 20;\n  overflow: hidden;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-horizontal {\n  top: 0;\n  width: 300px;\n  height: 100%;\n}\n.asm-vertical {\n  left: 0;\n  width: 100%;\n  height: 100px;\n}\n.asm-body-closed {\n  left: 0;\n  top: 0;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-left {\n  left: -300px;\n}\n.asm-left-open {\n  left: 0;\n}\n.asm-body-push-left {\n  left: 300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-right {\n  right: -300px;\n}\n.asm-right-open {\n  right: 0;\n}\n.asm-body-push-right {\n  left: -300px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-top {\n  top: -100px;\n}\n.asm-top-open {\n  top: 0;\n}\n.asm-body-push-top {\n  top: 100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n.asm-bottom {\n  bottom: -100px;\n}\n.asm-bottom-open {\n  bottom: 0;\n}\n.asm-body-push-bottom {\n  top: -100px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n}\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		return function() {
			head.removeChild(styleElement);
		};
	}

/***/ }
/******/ ])
/*
//@ sourceMappingURL=angular-slide-menu.js.map
*/