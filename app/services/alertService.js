/**
 * Created by kris on 13/10/15.
 */

module.exports = function(title, description) {

	return `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`;
};