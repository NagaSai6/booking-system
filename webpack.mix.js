let mix = require('laravel-mix');
mix.disableSuccessNotifications();
mix.js('src/admin.js', 'public/js/admin.js');
mix.js('src/home.js','public/js/home.js');
mix.js('src/admin-1.js','public/js/admin-1.js');



