/*

    Copyright © 2016-2017 Dominique Climent, Florian Dubath

    This file is part of Monnaie-Leman Wallet.

    Monnaie-Leman Wallet is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Monnaie-Leman Wallet is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Monnaie-Leman Wallet.  If not, see <http://www.gnu.org/licenses/>.

*/
module.exports = function(ctx) {
    if (ctx.opts && ctx.opts.platforms && ctx.opts.platforms.indexOf('windows') > -1
        && ctx.opts.options) {
        var path = require('path');
        var shell = ctx.requireCordovaModule('shelljs');
        var nopt = ctx.requireCordovaModule('nopt');

        // parse and validate args
        var args = nopt({
            'archs': [String],
            'appx': String,
            'phone': Boolean,
            'win': Boolean,
            'bundle': Boolean,
            'packageCertificateKeyFile': String,
            'packageThumbprint': String,
            'publisherId': String,
            'buildConfig': String
        }, {}, ctx.opts.options.argv, 0);

        // Check if --appx flag is passed so that we have a project build version override:  
        var isWin10 = args.appx && args.appx.toLowerCase() === 'uap';

        // Else check "windows-target-version" preference:
        if (!isWin10) {
            var configXml = shell.ls(path.join(ctx.opts.projectRoot, 'config.xml'))[0];

            var reTargetVersion = /<preference\s+name="windows-target-version"\s+value="(.+)"\s*\/>/i;
            var targetVersion = shell.grep(reTargetVersion, configXml);

            var result = reTargetVersion.exec(targetVersion);
            if (result !== null) {
                var match = result[1];
                isWin10 = parseInt(match.split('.'), 10) > 8;
            }
        }

        // Non-AnyCPU arch is required for Windows 10 (UWP) projects only:
        if (isWin10) {
            var rawArchs = ctx.opts.options.archs || args.archs;
            var archs = rawArchs ? rawArchs.split(' ') : [];

            // Avoid "anycpu" arch:
            if (archs.length === 0 || archs.some(function (item) {
                return item.toLowerCase() === 'anycpu';
            })) {
                throw new Error('You must specify an architecture to include the proper ZXing library version.'
                + '\nUse \'cordova run windows -- --arch="x64"\' or \'cordova run windows -- --arch="arm" --phone --device\' for example.');
            }
        }
    }
}
