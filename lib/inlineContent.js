const extractCss = require('extract-css');
const inlineCss = require('./inline-css');

module.exports = function inlineContent(src, options) {
    return new Promise((resolve, reject) => {
        let content;

        if (!options.url) {
            reject('options.url is required');
        }

        extractCss(src, options, (err, html, css) => {
            let extraCss;

            if (err) {
                if (options.failSilently) {
                    extraCss = options.extraCss;
                } else {
                return reject(err);
                }
            } else {
                extraCss = `${css}\n${options.extraCss}`;
            }

            try {
                content = inlineCss(html, extraCss, options);
            } catch (e) {
                return reject(e);
            }

            return resolve(content);
        });
    });

};
