angular.module('ng-ftscroller', []).directive('ngFtscroller', function ()
{
    return {
        replace: false,
        restrict: 'A',
        link: function (scope, element, attr)
        {

            var ngScrollerOptions = {
                scrollbars: false,
                scrollingX: false,
                bouncing: false
            };

            // ng-ftscroller-always-scroll
            if (attr.ngFtscrollerAlwaysScroll !== undefined && attr.ngFtscrollerAlwaysScroll == 'true') {
                ngScrollerOptions.alwaysScroll = true;
            }

            // ng-ftscroller-base-alignments
            // instead of using an object use x,y
            // example:
            // ng-ftscroller-base-alignments="-1,10"
            if (attr.ngFtscrollerBaseAlignments !== undefined) {
                if (attr.ngFtscrollerBaseAlignments.indexOf(',') > 0) {
                    var c = attr.ngFtscrollerBaseAlignments.split(',');
                    ngScrollerOptions.baseAlignments = {
                        x: parseInt(c[0], 10),
                        y: parseInt(c[1], 10)
                    };
                } else {
                    console.error('Invalid configuration for `ng-ftscroller-base-alignments`, it must be like x,y (example: -5,10)');
                }
            }

            // ng-ftscroller-bouncing
            if (attr.ngFtscrollerBouncing !== undefined && attr.ngFtscrollerBouncing == 'true') {
                ngScrollerOptions.bouncing = true;
            }

            // ng-ftscroller-content-width
            if (attr.ngFtscrollerContentWidth !== undefined) {
                ngScrollerOptions.contentWidth = attr.ngFtscrollerContentWidth;
            }
            // ng-ftscroller-content-height
            if (attr.ngFtscrollerContentHeight !== undefined) {
                ngScrollerOptions.contentHeight = attr.ngFtscrollerContentHeight;
            }


            // default timeout
            var ngiScroll_timeout = 5;
            // default options
            var ngiScroll_opts = {
                snap: true,
                momentum: true,
                hScrollbar: false
            };

            // scroll key /id
            var scroll_key = attr.ngIscroll;

            if (scroll_key === '') {
                scroll_key = attr.id;
            }

            if (scope.$parent.myScrollOptions) {
                for (var i in scope.$parent.myScrollOptions) {
                    if (i === scroll_key) {
                        for (var k in scope.$parent.myScrollOptions[i]) {
                            ngiScroll_opts[k] = scope.$parent.myScrollOptions[i][k];
                        }
                    } else {
                        ngiScroll_opts[i] = scope.$root.myScrollOptions[i];
                    }
                }
            }

            // initialize function
            function setScroll()
            {
                if (scope.$parent.myScroll === undefined) {
                    scope.$parent.myScroll = [];
                }

                scope.$parent.myScroll[scroll_key] = new FTScroller(element[0], ngiScroll_opts);
            }

            // new specific setting for setting timeout using: ng-iscroll-timeout='{val}'
            if (attr.ngIscrollDelay !== undefined) {
                ngiScroll_timeout = attr.ngIscrollDelay;
            }

            // watch for 'ng-iscroll' directive in html code
            scope.$watch(attr.ngIscroll, function ()
            {
                setTimeout(setScroll, ngiScroll_timeout);
            });
        }
    };
});
