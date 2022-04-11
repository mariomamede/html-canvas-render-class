/**
* Native canvas render class
* @author Mário Mamede <mariomamede@live.com>
* @file render.js
* Github: https://github.com/mariomamede
*/

/**
 * Class constructor
 * @param {Object} canvas - Canvas HTML object
 */
function Render(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.width = canvas.width;
    this.height = canvas.height;

    this.ctx.font = '12px Arial'

    this.image_array = [];
}

/**
 * Clear the canvas rectangle
 * @return {void}
 */
Render.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

/**
 * Add imagem to array list
 * @param {string} image_name - A identification of image
 * @param {string} image_path - A path to the image
 * @return {void}
 */
Render.prototype.set_image = function (image_name, image_path) {
    img = new Image();

    img.src = image_path;

    this.image_array.push({ key: image_name, value: img });
}

/**
 * Render the image
 * @param {string} image_name - A identification of image
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {number} [Width] - Image width size in pixels
 * @param {number} [Height] - Image height size in pixels
 * @return {void}
 */
Render.prototype.draw_image = function (image_name, x, y, Width, Height) {
    const img_obj = this.image_array.find(item => item.key === image_name);
    const _width = Width || img_obj['value'].width;
    const _height = Height || img_obj['value'].height;
    this.ctx.drawImage(img_obj['value'], x, y, _width, _height);
}

/**
 * Set the font
 * @param {string} font - Font name and size
 * @return {void}
 * 
 * @example
 *
 *     set_font('12px Arial')
 */
Render.prototype.set_font = function (font) {

    if (font == this.ctx.font)
        return;

    this.ctx.font = font;
}

/**
 * Render the text
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {string} text - A string text to render
 * @param {string} color - A color to text
 * @param {string} [alignment=left] - Text alignment
 * @return {void}
 * 
 * @example
 *
 *     text(100, 100, 'Iam a text', 'white', 'left');
 */
Render.prototype.text = function (x, y, text, color, alignment = 'left') {
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, x, y);
}

/**
 * Render the outline text
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {string} text - A string text to render
 * @param {string} color - A color to text
 * @param {string} [outline_color=black] - A color to outline
 * @param {string} [alignment=left] - Text alignment
 * @return {void}
 */
Render.prototype.outline_text = function (x, y, text, color, outline_color = 'black', alignment = 'left') {

    const font_size = this.ctx.font.match(/\d+/);

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = outline_color;

    this.ctx.lineWidth = font_size / 10;
    this.ctx.lineJoin = 'miter';
    this.ctx.miterLimit = 2;
    this.ctx.textAlign = alignment;

    this.ctx.strokeText(text, x, y);
    this.ctx.fillText(text, x, y);
}

/**
 * Render dot
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {string} color - A color to dot
 * @return {void}
 */
Render.prototype.dot = function (x, y, color) {
    this.fill_rect(x, y, 1, 1, color);
}

/**
 * Render line
 * @param {number} x1 - Horizontal start position in pixels
 * @param {number} y1 - Vertical start position in pixels
 * @param {number} x2 - Horizontal end position in pixels
 * @param {number} y2 - Vertical end position in pixels
 * @param {string} color - A line color
 * @param {number} [line_width=1] - Line width
 * @return {void}
 */
Render.prototype.line = function (x1, y1, x2, y2, color, line_width = 1) {
    this.ctx.beginPath();
    this.ctx.lineWidth = line_width;
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
}

/**
 * Render rectangle
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {number} w - Rectangle width in pixels
 * @param {number} h - Rectangle height in pixels
 * @param {string} color - Rectangle color
 * @param {number} [line_width=1] - Line width of rectangle
 * @return {void}
 */
Render.prototype.rect = function (x, y, w, h, color, line_width = 1) {
    this.ctx.lineWidth = line_width;
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(x, y, w, h);
}

/**
 * Render filled rectangle
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {number} w - Rectangle width in pixels
 * @param {number} h - Rectangle height in pixels
 * @param {string} color - Rectangle color
 * @return {void}
 */
Render.prototype.fill_rect = function (x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
}

/**
 * Render filled rectangle with border
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {number} w - Rectangle width in pixels
 * @param {number} h - Rectangle height in pixels
 * @param {string} background_color - Rectangle filled color
 * @param {string} border_color - Rectangle border color
 * @param {number} [line_width=1] - Line width of rectangle
 * @return {void}
 */
Render.prototype.border_rect = function (x, y, w, h, background_color, border_color, line_width = 1) {
    this.fill_rect(x, y, w, h, background_color);
    this.rect(x, y, w, h, border_color, line_width);
}

/**
 * Render circle
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {number} radius - Circle radius in pixels
 * @param {string} color - Circle color
 * @param {number} [line_width=1] - Line width of circle
 * @return {void}
 */
Render.prototype.circle = function (x, y, radius, color, line_width = 1) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = line_width;
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.stroke();
}

/**
 * Render filled circle
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {number} radius - Circle radius in pixels
 * @param {string} color - Circle color
 * @return {void}
 */
Render.prototype.fill_circle = function (x, y, radius, color) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
}

/**
 * Render circle with border
 * @param {number} x - Horizontal position in pixels
 * @param {number} y - Vertical position in pixels
 * @param {number} radius - Circle radius in pixels
 * @param {string} background_color - Circle filled color
 * @param {string} border_color - Circle border color
 * @param {number} [line_width=1] - Line width of circle
 * @return {void}
 */
Render.prototype.border_circle = function (x, y, radius, background_color, border_color, line_width = 1) {
    //don't call Render.circle() function directly to reduce beginPath() calls
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = background_color;
    this.ctx.fill();
    this.ctx.lineWidth = line_width;
    this.ctx.strokeStyle = border_color;
    this.ctx.stroke();
}