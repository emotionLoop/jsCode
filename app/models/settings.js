
// # settings

var _ = require( 'underscore' );

exports = module.exports = function() {

  var settings = [];

  settings.push({
    id: 1,
    name: 'indentation_tabs',
    label: 'Tabs',
    group: 'Indentation',
    sorting: 10,
    helper: '\n\
<h4>Pros:</h4>\n\
<ul>\n\
  <li>Tabs use only 1 character (smaller file sizes).</li>\n\
  <li>Tabs are flexible. Everyone can have different settings as to how many "spaces" a tab occupies.</li>\n\
</ul>\n\
<h4>Cons:</h4>\n\
<ul>\n\
  <li>Tabs when viewed in browsers, always take 8 spaces.</li>\n\
  <li>Tabs are harder to use when Instant Messaging, sharing code, etc.</li>\n\
</ul>'
  });

  settings.push({
    id: 2,
    name: 'indentation_spaces',
    label: 'Spaces',
    group: 'Indentation',
    sorting: 20,
    helper: '\n\
<h4>Pros:</h4>\n\
<ul>\n\
  <li>Spaces are consistent across different software and systems.</li>\n\
  <li>Spaces are easier to use when Instant Messaging, sharing code, etc.</li>\n\
</ul>\n\
<h4>Cons:</h4>\n\
<ul>\n\
  <li>Each space uses a character (bigger file sizes).</li>\n\
  <li>Spaces are not flexible. Everyone sees the same number of spaces for indentation, no matter their settings.</li>\n\
</ul>'
  });

  settings.push({
    id: 3,
    name: 'spacing_4_spaces',
    label: '4 Spaces',
    group: 'Spacing',
    sorting: 110,
    helper: '\n\
<h4>Pros:</h4>\n\
<ul>\n\
  <li>4 Spaces allow for improved readability.</li>\n\
</ul>\n\
<h4>Cons:</h4>\n\
<ul>\n\
  <li>4 Spaces can make code "grow sideways" faster.</li>\n\
  <li>4 Spaces make for bigger file sizes.</li>\n\
</ul>'
  });

  settings.push({
    id: 4,
    name: 'spacing_2_spaces',
    label: '2 Spaces',
    group: 'Spacing',
    sorting: 120,
    helper: '\n\
<h4>Pros:</h4>\n\
<ul>\n\
  <li>2 Spaces make code "grow sideways" slower.</li>\n\
  <li>2 Spaces make for smaller file sizes.</li>\n\
</ul>\n\
<h4>Cons:</h4>\n\
<ul>\n\
  <li>2 Spaces make the code less readable.</li>\n\
</ul>'
  });

  settings.push({
    id: 5,
    name: 'readability_jumbo',
    label: 'Jumbo',
    group: 'Readability',
    sorting: 210,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>Basically, add extra spaces and line breaks almost everywhere (between parenthesis, array items, object properties, etc.), to make the code more readable</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
module.exports = function( PackageService, SettingService ) {\n\
\n\
    return ( require(\'./../classes/Controller.js\') ).extend(\n\
        {\n\
            service: PackageService\n\
        },\n\
        {\n\
            // Get 3 most popular packages\n\
            popularAction: function() {\n\
                PackageService.find({\n\
                        limit: 3,\n\
                        order: \'views DESC\'\n\
                    })\n\
                    .then( this.proxy(\'send\') )\n\
                    .fail( this.proxy(\'handleException\') );\n\
            },\n\
\n\
            // Create a package\n\
            postAction: function() {\n\
                var data = this.req.body;\n\
\n\
                if ( data.id ) {\n\
                    return this.putAction();\n\
                }\n\
\n\
                PackageService\n\
                    .create( data )\n\
                    .then( this.proxy(\'send\') )\n\
                    .fail( this.proxy(\'handleException\') );\n\
            },\n\
\n\
            // Update a package\n\
            putAction: function() {\n\
                this.send( 403, \'Updates are not allowed\' );\n\
            }\n\
        }\n\
    );\n\
};\n\
</div>'
  });

  settings.push({
    id: 6,
    name: 'readability_normal',
    label: 'Normal',
    group: 'Readability',
    sorting: 220,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>Add spaces and line breaks when/where readability gets compromised otherwise.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
module.exports = function(PackageService, SettingService) {\n\
\n\
    return (require(\'./../classes/Controller.js\')).extend(\n\
        {\n\
            service: PackageService\n\
        },\n\
        {\n\
            // Get 3 most popular packages\n\
            popularAction: function() {\n\
                PackageService.find({\n\
                        limit: 3,\n\
                        order: \'views DESC\'\n\
                    })\n\
                    .then(this.proxy(\'send\'))\n\
                    .fail(this.proxy(\'handleException\'));\n\
            },\n\
            // Create a package\n\
            postAction: function() {\n\
                var data = this.req.body;\n\
\n\
                if (data.id) {\n\
                    return this.putAction();\n\
                }\n\
\n\
                PackageService\n\
                    .create(data)\n\
                    .then(this.proxy(\'send\'))\n\
                    .fail(this.proxy(\'handleException\'));\n\
            },\n\
            // Update a package\n\
            putAction: function() {\n\
                this.send(403, \'Updates are not allowed\');\n\
            }\n\
        }\n\
    );\n\
};\n\
</div>'
  });

  settings.push({
    id: 7,
    name: 'blocks_inline',
    label: 'Inline',
    group: 'Blocks',
    sorting: 310,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When you\'re writing blocks (or array items), you start them on the same line.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">define([\n\
\n\
        \'app\',\n\
        \'highlightjs\'\n\
    ],\n\
    function( app, hljs ) {\n\
        \'use strict\';\n\
\n\
        app.controller( \'Home\', [\n\
            \'$scope\',\n\
            ...\n\
            function( $scope, ... ) {\n\
\n\
                // Init $scope properties\n\
                // $scope helpers\n\
                $scope.helpers = {\n\
                    ...\n\
                };\n\
\n\
                // $scope data holders\n\
                $scope.data = {\n\
                    thePackage: {},\n\
                    ...\n\
                };\n\
\n\
                // $scope viewer helpers\n\
                $scope.viewers = {\n\
                    showPackageForm: function() {\n\
                        return $scope.helpers.packageStarted;\n\
                    },\n\
                    showSettingHelper: function( settingId ) {\n\
                        if ( $scope.helpers.settingsHelpersVisible.indexOf(settingId) !== -1 ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    },\n\
                    showPackageStep: function( step ) {\n\
                        if ( step === $scope.helpers.currentStep && $scope.viewers.showPackageForm() ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    }\n\
                };\n\
\n\
                // Fetch popular packages\n\
                PackageService.getPopular()\n\
                    .then( function( popularGuidelines ) {\n\
                        $scope.data.popularGuidelines = popularGuidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the popular packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
\n\
                // Fetch latest packages\n\
                PackageService.getLatest()\n\
                    .then( function( latestGuidelines ) {\n\
                        $scope.data.latestGuidelines = latestGuidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the latest packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
            }\n\
        ]);\n\
    }\n\
);\n\
</div>'
  });

  settings.push({
    id: 8,
    name: 'blocks_line_break',
    label: 'Line Break',
    group: 'Blocks',
    sorting: 320,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When you\'re writing blocks (or array items), you start them on the next line.</p>\n\
<p>Beware you can\'t do this with the "return" expression, otherwise you\'ll get a syntax error.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">define(\n\
    [\n\
        \'app\',\n\
        \'highlightjs\'\n\
    ],\n\
    function( app, hljs )\n\
    {\n\
        \'use strict\';\n\
\n\
        app.controller( \'Home\',\n\
        [\n\
            \'$scope\',\n\
            ...\n\
            function( $scope, ... )\n\
            {\n\
\n\
                // Init $scope properties\n\
                // $scope helpers\n\
                $scope.helpers =\n\
                {\n\
                    ...\n\
                };\n\
\n\
                // $scope data holders\n\
                $scope.data =\n\
                {\n\
                    thePackage: {},\n\
                    ...\n\
                };\n\
\n\
                // $scope viewer helpers\n\
                $scope.viewers =\n\
                {\n\
                    showPackageForm: function()\n\
                    {\n\
                        return $scope.helpers.packageStarted;\n\
                    },\n\
                    showSettingHelper: function( settingId )\n\
                    {\n\
                        if ( $scope.helpers.settingsHelpersVisible.indexOf(settingId) !== -1 )\n\
                        {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    },\n\
                    showPackageStep: function( step )\n\
                    {\n\
                        if ( step === $scope.helpers.currentStep && $scope.viewers.showPackageForm() )\n\
                        {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    }\n\
                };\n\
\n\
                // Fetch popular packages\n\
                PackageService.getPopular()\n\
                    .then( function( popularGuidelines )\n\
                    {\n\
                        $scope.data.popularGuidelines = popularGuidelines;\n\
                    }, function( error )\n\
                    {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the popular packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
\n\
                // Fetch latest packages\n\
                PackageService.getLatest()\n\
                    .then( function( latestGuidelines )\n\
                    {\n\
                        $scope.data.latestGuidelines = latestGuidelines;\n\
                    }, function( error )\n\
                    {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the latest packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
            }\n\
        ]);\n\
    }\n\
);\n\
</div>'
  });

  settings.push({
    id: 9,
    name: 'variables_naming_descriptive',
    label: 'Descriptive',
    group: 'Variables Naming',
    sorting: 410,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When writing variable names, you\'re not scared of variablesThatHaveALotOfCharacters.</p>\n\
<p>The variable names are also descriptive of what they\'re doing. Not just "tmp", or "obj".</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
module.exports = function( SettingService ) {\n\
\n\
    return ( require(\'./../classes/Controller.js\') ).extend(\n\
        {\n\
            service: SettingService,\n\
        },\n\
        {\n\
            groupedAction: function() {\n\
                SettingService.getSettingsGroupedAndSorted()\n\
                    .then( this.proxy( \'send\' ) )\n\
                    .fail( this.proxy( \'handleException\' ) );\n\
            },\n\
\n\
            postAction: function() {\n\
                var temporaryIdFromPost = 0,\n\
                    postedSettingObject = this.req.body;\n\
\n\
                ...\n\
            }\n\
        });\n\
};\n\
</div>'
  });

  settings.push({
    id: 10,
    name: 'variables_naming_normal',
    label: 'Normal',
    group: 'Variables Naming',
    sorting: 420,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>You don\'t write variables that are too big, but you don\'t like have very short variables.</p>\n\
<p>The variable names are also somewhat descriptive of what they\'re doing. They don\'t require a lot of thinking about what they are.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
module.exports = function( Service ) {\n\
\n\
    return ( require(\'./../classes/Controller.js\') ).extend(\n\
        {\n\
            service: Service,\n\
        },\n\
        {\n\
            groupedAction: function() {\n\
                Service.getSettingsGroups()\n\
                    .then( this.proxy( \'send\' ) )\n\
                    .fail( this.proxy( \'handleEx\' ) );\n\
            },\n\
\n\
            postAction: function() {\n\
                var tmpId = 0,\n\
                    settingObject = this.req.body;\n\
\n\
                ...\n\
            }\n\
        });\n\
};\n\
</div>'
  });

  settings.push({
    id: 11,
    name: 'variables_case_lower',
    label: 'lower_case',
    group: 'Variables Case',
    sorting: 510,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>Your variable names are lower_case.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">define([\n\
\n\
        \'app\',\n\
        \'highlightjs\'\n\
    ],\n\
    function( app, hljs ) {\n\
        \'use strict\';\n\
\n\
        app.controller( \'Home\', [\n\
            \'$scope\',\n\
            ...\n\
            function( $scope, ... ) {\n\
\n\
                // Init $scope properties\n\
                // $scope helpers\n\
                $scope.helpers = {\n\
                    ...\n\
                };\n\
\n\
                // $scope data holders\n\
                $scope.data = {\n\
                    the_package: {},\n\
                    ...\n\
                };\n\
\n\
                // $scope viewer helpers\n\
                $scope.viewers = {\n\
                    show_package_form: function() {\n\
                        return $scope.helpers.package_started;\n\
                    },\n\
                    show_setting_helper: function( setting_id ) {\n\
                        if ( $scope.helpers.settings_helpers_visible.indexOf(setting_id) !== -1 ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    },\n\
                    show_package_step: function( step ) {\n\
                        if ( step === $scope.helpers.current_step && $scope.viewers.show_package_form() ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    }\n\
                };\n\
\n\
                // Fetch popular packages\n\
                package_service.get_popular()\n\
                    .then( function( popular_guidelines ) {\n\
                        $scope.data.popular_guidelines = popular_guidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the popular packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
\n\
                // Fetch latest packages\n\
                package_service.get_latest()\n\
                    .then( function( latest_guidelines ) {\n\
                        $scope.data.latest_guidelines = latest_guidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the latest packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
            }\n\
        ]);\n\
    }\n\
);\n\
</div>'
  });

  settings.push({
    id: 12,
    name: 'variables_case_camel',
    label: 'camelCase',
    group: 'Variables Case',
    sorting: 520,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>Your variable names are in camelCase.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">define([\n\
\n\
        \'app\',\n\
        \'highlightjs\'\n\
    ],\n\
    function( app, hljs ) {\n\
        \'use strict\';\n\
\n\
        app.controller( \'Home\', [\n\
            \'$scope\',\n\
            ...\n\
            function( $scope, ... ) {\n\
\n\
                // Init $scope properties\n\
                // $scope helpers\n\
                $scope.helpers = {\n\
                    ...\n\
                };\n\
\n\
                // $scope data holders\n\
                $scope.data = {\n\
                    thePackage: {},\n\
                    ...\n\
                };\n\
\n\
                // $scope viewer helpers\n\
                $scope.viewers = {\n\
                    showPackageForm: function() {\n\
                        return $scope.helpers.packageStarted;\n\
                    },\n\
                    showSettingHelper: function( settingId ) {\n\
                        if ( $scope.helpers.settingsHelpersVisible.indexOf(settingId) !== -1 ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    },\n\
                    showPackageStep: function( step ) {\n\
                        if ( step === $scope.helpers.currentStep && $scope.viewers.showPackageForm() ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    }\n\
                };\n\
\n\
                // Fetch popular packages\n\
                PackageService.getPopular()\n\
                    .then( function( popularGuidelines ) {\n\
                        $scope.data.popularGuidelines = popularGuidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the popular packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
\n\
                // Fetch latest packages\n\
                PackageService.getLatest()\n\
                    .then( function( latestGuidelines ) {\n\
                        $scope.data.latestGuidelines = latestGuidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the latest packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
            }\n\
        ]);\n\
    }\n\
);\n\
</div>'
  });

  settings.push({
    id: 13,
    name: 'functions_naming_descriptive',
    label: 'Descriptive',
    group: 'Functions Naming',
    sorting: 610,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When writing function names, you\'re not scared of functionNamesThatHaveALotOfCharacters.</p>\n\
<p>The function names are also descriptive of what they\'re doing. Not just "tmp", or "obj".</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
module.exports = function( SettingService ) {\n\
\n\
    return ( require(\'./../classes/Controller.js\') ).extend(\n\
        {\n\
            service: SettingService,\n\
        },\n\
        {\n\
            groupedAction: function() {\n\
                SettingService.getSettingsGroupedAndSorted()\n\
                    .then( this.proxy( \'send\' ) )\n\
                    .fail( this.proxy( \'handleException\' ) );\n\
            },\n\
\n\
            postAction: function() {\n\
                var temporaryIdFromPost = 0,\n\
                    postedSettingObject = this.req.body;\n\
\n\
                ...\n\
            }\n\
        });\n\
};\n\
</div>'
  });

  settings.push({
    id: 14,
    name: 'functions_naming_normal',
    label: 'Normal',
    group: 'Functions Naming',
    sorting: 620,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>You don\'t write function names that are too big, but you don\'t like have very short function names.</p>\n\
<p>The function names are also somewhat descriptive of what they\'re doing. They don\'t require a lot of thinking about what they are.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
module.exports = function( Service ) {\n\
\n\
    return ( require(\'./../classes/Controller.js\') ).extend(\n\
        {\n\
            service: Service,\n\
        },\n\
        {\n\
            groupedAction: function() {\n\
                Service.getSettingsGroups()\n\
                    .then( this.proxy( \'send\' ) )\n\
                    .fail( this.proxy( \'handleEx\' ) );\n\
            },\n\
\n\
            postAction: function() {\n\
                var tmpId = 0,\n\
                    settingObject = this.req.body;\n\
\n\
                ...\n\
            }\n\
        });\n\
};\n\
</div>'
  });

  settings.push({
    id: 15,
    name: 'functions_case_lower',
    label: 'lower_case',
    group: 'Functions Case',
    sorting: 710,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>Your function names are lower_case.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">define([\n\
\n\
        \'app\',\n\
        \'highlightjs\'\n\
    ],\n\
    function( app, hljs ) {\n\
        \'use strict\';\n\
\n\
        app.controller( \'Home\', [\n\
            \'$scope\',\n\
            ...\n\
            function( $scope, ... ) {\n\
\n\
                // Init $scope properties\n\
                // $scope helpers\n\
                $scope.helpers = {\n\
                    ...\n\
                };\n\
\n\
                // $scope data holders\n\
                $scope.data = {\n\
                    the_package: {},\n\
                    ...\n\
                };\n\
\n\
                // $scope viewer helpers\n\
                $scope.viewers = {\n\
                    show_package_form: function() {\n\
                        return $scope.helpers.package_started;\n\
                    },\n\
                    show_setting_helper: function( setting_id ) {\n\
                        if ( $scope.helpers.settings_helpers_visible.indexOf(setting_id) !== -1 ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    },\n\
                    show_package_step: function( step ) {\n\
                        if ( step === $scope.helpers.current_step && $scope.viewers.show_package_form() ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    }\n\
                };\n\
\n\
                // Fetch popular packages\n\
                package_service.get_popular()\n\
                    .then( function( popular_guidelines ) {\n\
                        $scope.data.popular_guidelines = popular_guidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the popular packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
\n\
                // Fetch latest packages\n\
                package_service.get_latest()\n\
                    .then( function( latest_guidelines ) {\n\
                        $scope.data.latest_guidelines = latest_guidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the latest packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
            }\n\
        ]);\n\
    }\n\
);\n\
</div>'
  });

  settings.push({
    id: 16,
    name: 'functions_case_camel',
    label: 'camelCase',
    group: 'Functions Case',
    sorting: 720,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>Your function names are in camelCase.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">define([\n\
\n\
        \'app\',\n\
        \'highlightjs\'\n\
    ],\n\
    function( app, hljs ) {\n\
        \'use strict\';\n\
\n\
        app.controller( \'Home\', [\n\
            \'$scope\',\n\
            ...\n\
            function( $scope, ... ) {\n\
\n\
                // Init $scope properties\n\
                // $scope helpers\n\
                $scope.helpers = {\n\
                    ...\n\
                };\n\
\n\
                // $scope data holders\n\
                $scope.data = {\n\
                    thePackage: {},\n\
                    ...\n\
                };\n\
\n\
                // $scope viewer helpers\n\
                $scope.viewers = {\n\
                    showPackageForm: function() {\n\
                        return $scope.helpers.packageStarted;\n\
                    },\n\
                    showSettingHelper: function( settingId ) {\n\
                        if ( $scope.helpers.settingsHelpersVisible.indexOf(settingId) !== -1 ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    },\n\
                    showPackageStep: function( step ) {\n\
                        if ( step === $scope.helpers.currentStep && $scope.viewers.showPackageForm() ) {\n\
                            return true;\n\
                        }\n\
\n\
                        return false;\n\
                    }\n\
                };\n\
\n\
                // Fetch popular packages\n\
                PackageService.getPopular()\n\
                    .then( function( popularGuidelines ) {\n\
                        $scope.data.popularGuidelines = popularGuidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the popular packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
\n\
                // Fetch latest packages\n\
                PackageService.getLatest()\n\
                    .then( function( latestGuidelines ) {\n\
                        $scope.data.latestGuidelines = latestGuidelines;\n\
                    }, function( error ) {\n\
                        $scope.actions.notify( \'Oh, no! There was a problem fetching the latest packages. Please check your internet connection.\', \'error\' );\n\
                        console.log( error );\n\
                    });\n\
            }\n\
        ]);\n\
    }\n\
);\n\
</div>'
  });

  settings.push({
    id: 17,
    name: 'variable_declaration_comma_leading',
    label: 'Leading Comma',
    group: 'Comma in Variable Declaration',
    sorting: 810,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When declaring variables, you use a leading comma.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
// Get everything ready\n\
var config = require( \'./config\' )\n\
  , express = require( \'express\' )\n\
  , webPort = process.env.NODE_WWW_PORT || config.webPort || 8080\n\
  , env = process.env.NODE_ENV || config.environmentName || \'development\'\n\
  , initializeRoutes = require( \'./routes\' )\n\
  , modelInjector = require( \'./src/utils/modelInjector\' )\n\
  , Sequelize = require( \'sequelize\' )\n\
  , Injector = require( \'./src/utils/injector\' )\n\
  , passport = require( \'passport\' )\n\
  , app = express();\n\
\n\
// Setup ORM\n\
var sequelize = new Sequelize(\n\
    config.db.database\n\
  , config.db.username\n\
  , config.db.password\n\
  , config.db.options\n\
);\n\
\n\
app.configure( function() {\n\
\n\
    ...\n\
\n\
    // session management\n\
    app.use( express.cookieParser() );\n\
    app.use( express.session({\n\
        secret: config.secretKey\n\
      , cookie: { secure: false, maxAge: 86400000 }\n\
      , store: new RedisStore({\n\
          host: config.redis.host\n\
        , port: config.redis.port\n\
        , prefix: config.redis.prefix + process.env.NODE_ENV + \'_\'\n\
        , password: config.redis.key\n\
        })\n\
    }));\n\
\n\
    ...\n\
});\n\
</div>'
  });

  settings.push({
    id: 18,
    name: 'variable_declaration_comma_trailing',
    label: 'Trailing Comma',
    group: 'Comma in Variable Declaration',
    sorting: 820,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When declaring variables, you use a trailing comma.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
// Get everything ready\n\
var config = require( \'./config\' ),\n\
    express = require( \'express\' ),\n\
    webPort = process.env.NODE_WWW_PORT || config.webPort || 8080,\n\
    env = process.env.NODE_ENV || config.environmentName || \'development\',\n\
    initializeRoutes = require( \'./routes\' ),\n\
    modelInjector = require( \'./src/utils/modelInjector\' ),\n\
    Sequelize = require( \'sequelize\' ),\n\
    Injector = require( \'./src/utils/injector\' ),\n\
    passport = require( \'passport\' ),\n\
    app = express();\n\
\n\
// Setup ORM\n\
var sequelize = new Sequelize(\n\
    config.db.database,\n\
    config.db.username,\n\
    config.db.password,\n\
    config.db.options\n\
);\n\
\n\
app.configure( function() {\n\
\n\
    ...\n\
\n\
    // session management\n\
    app.use( express.cookieParser() );\n\
    app.use( express.session({\n\
        secret: config.secretKey,\n\
        cookie: { secure: false, maxAge: 86400000 },\n\
        store: new RedisStore({\n\
            host: config.redis.host,\n\
            port: config.redis.port\n\
            prefix: config.redis.prefix + process.env.NODE_ENV + \'_\',\n\
            password: config.redis.key\n\
        })\n\
    }) );\n\
\n\
    ...\n\
});\n\
</div>'
  });

  settings.push({
    id: 19,
    name: 'variable_concatenation_leading',
    label: 'Leading',
    group: 'Concatenation',
    sorting: 910,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When concatenating variables (or expressions), you use a leading operator.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
// Enable cache for css/js/img files\n\
app.use( function ( req, res, next ) {\n\
    var reqURL = req.url;\n\
\n\
    if (\n\
        reqURL.indexOf( \'/styles/\' ) === 0\n\
        || reqURL.indexOf( \'/scripts/\' ) === 0\n\
        || reqURL.indexOf( \'/images/\' ) === 0\n\
        || reqURL.indexOf( \'/fonts/\' ) === 0\n\
        || reqURL.indexOf( \'/components/\' ) === 0\n\
        || reqURL.indexOf( \'/views/\' ) === 0\n\
    ) {\n\
        res.setHeader( \'Cache-Control\', \'public, max-age=604800\' );// 7 days\n\
        res.setHeader( \'Expires\', new Date( Date.now() + 604800000 ).toUTCString() );\n\
\n\
        // This is just an example, it doesn\'t make sense to concatenate this\n\
        console.log( \'##\'\n\
            + \' Sending information\'\n\
            + \' to cache file:\',\n\
            reqURL,\n\
            \'##\'\n\
        );\n\
    }\n\
\n\
    next();\n\
});\n\
</div>'
  });

  settings.push({
    id: 20,
    name: 'variable_concatenation_trailing',
    label: 'Trailing',
    group: 'Concatenation',
    sorting: 920,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When concatenating variables (or expressions), you use a trailing operator.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
// Enable cache for css/js/img files\n\
app.use( function ( req, res, next ) {\n\
    var reqURL = req.url;\n\
\n\
    if (\n\
        reqURL.indexOf( \'/styles/\' ) === 0 ||\n\
        reqURL.indexOf( \'/scripts/\' ) === 0 ||\n\
        reqURL.indexOf( \'/images/\' ) === 0 ||\n\
        reqURL.indexOf( \'/fonts/\' ) === 0 ||\n\
        reqURL.indexOf( \'/components/\' ) === 0 ||\n\
        reqURL.indexOf( \'/views/\' ) === 0\n\
    ) {\n\
        res.setHeader( \'Cache-Control\', \'public, max-age=604800\' );// 7 days\n\
        res.setHeader( \'Expires\', new Date( Date.now() + 604800000 ).toUTCString() );\n\
\n\
        // This is just an example, it doesn\'t make sense to concatenate this\n\
        console.log( \'##\' +\n\
            \' Sending information\' +\n\
            \' to cache file:\',\n\
            reqURL,\n\
            \'##\'\n\
        );\n\
    }\n\
\n\
    next();\n\
});\n\
</div>'
  });

  settings.push({
    id: 21,
    name: 'quotes_single',
    label: 'Single',
    group: 'Quotes',
    sorting: 1010,
    helper: '<p>This is just a style preference.</p>'
  });

  settings.push({
    id: 22,
    name: 'quotes_double',
    label: 'Double',
    group: 'Quotes',
    sorting: 1020,
    helper: '<p>This is just a style preference.</p>'
  });

  settings.push({
    id: 23,
    name: 'semicolons_yes',
    label: 'Yes',
    group: 'Semicolons',
    sorting: 1110,
    helper: '<p>This is mostly a style preference.</p>'
  });

  settings.push({
    id: 24,
    name: 'semicolons_no',
    label: 'No',
    group: 'Semicolons',
    sorting: 1120,
    helper: '<p>This is mostly a style preference. <a href="http://stackoverflow.com/questions/12745743/automatic-semicolon-insertion-return-statements" target="_blank">Beware of special cases</a>.</p>'
  });

  settings.push({
    id: 25,
    name: 'var_once',
    label: 'Once',
    group: 'Variable Declaration',
    sorting: 1210,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When declaring variables, declare once for each scope.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
// Get everything ready\n\
var config = require( \'./config\' ),\n\
    express = require( \'express\' ),\n\
    webPort = process.env.NODE_WWW_PORT || config.webPort || 8080,\n\
    env = process.env.NODE_ENV || config.environmentName || \'development\',\n\
    initializeRoutes = require( \'./routes\' ),\n\
    modelInjector = require( \'./src/utils/modelInjector\' );\n\
\n\
function setupORM() {\n\
    var Sequelize = require( \'sequelize\' ),\n\
        Injector = require( \'./src/utils/injector\' ),\n\
        passport = require( \'passport\' ),\n\
        app = express();\n\
\n\
    ...\n\
}\n\
</div>'
  });

  settings.push({
    id: 26,
    name: 'var_needed',
    label: 'As needed',
    group: 'Variable Declaration',
    sorting: 1220,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When declaring variables, declare as needed for each scope.</p>\n\
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting" target="_blank">Beware of variable hoisting</a>.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
\'use strict\';\n\
\n\
// Get everything ready\n\
var config = require( \'./config\' );\n\
var express = require( \'express\' );\n\
var webPort = process.env.NODE_WWW_PORT || config.webPort || 8080;\n\
var env = process.env.NODE_ENV || config.environmentName || \'development\';\n\
var initializeRoutes = require( \'./routes\' );\n\
var modelInjector = require( \'./src/utils/modelInjector\' );\n\
\n\
function setupORM() {\n\
    var Sequelize = require( \'sequelize\' ),\n\
    var Injector = require( \'./src/utils/injector\' ),\n\
    var passport = require( \'passport\' ),\n\
    var app = express();\n\\n\
\n\
    ...\n\
}\n\
</div>'
  });

  settings.push({
    id: 27,
    name: 'brackets_always',
    label: 'Always',
    group: 'Require Brackets',
    sorting: 1310,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When doing one-line instructions with if\'s, for example, always require brackets.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
if ( returnEarly ) {\n\
    return true;\n\
}\n\
</div>'
  });

  settings.push({
    id: 28,
    name: 'brackets_needed',
    label: 'As needed',
    group: 'Require Brackets',
    sorting: 1320,
    helper: '\n\
<h4>What it means:</h4>\n\
<p>When doing one-line instructions with if\'s, for example, don\'t require brackets.</p>\n\
<h4>Example:</h4>\n\
<div class="sample-code">\n\
\n\
if ( returnEarly ) return true;\n\
\n\
</div>'
  });

  // Sort settings by .sorting
  var sortedSettings = _.sortBy( settings, function( setting ) {
    return setting.sorting;
  });

  return sortedSettings;
};

exports['@singleton'] = true;
