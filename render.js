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
 class Render {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.ctx.font = '12px Arial';

        this.image_array = [];
    }
    /**
     * Clear the canvas rectangle
     * @return {void}
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Add imagem to array list
     * @param {string} image_name - A identification of image
     * @param {string} image_path - A path to the image
     * @return {void}
     */
    set_image(image_name, image_path) {
        img = new Image();

        img.src = image_path;

        this.image_array.push({ key: image_name, value: img });
    }
    /**
     * Get image object from array list
     * @param {string} image_name - A identification of image
     * @return {Object} - Return object Image()
     */
    get_image(image_name) {
        const img_obj = this.image_array.find(item => item.key === image_name);
        return img_obj['value'];
    }
    /**
     * Render the image
     * @param {string} image_name - A identification of image
     * @param {number} sx - The x coordinate where to start clipping
     * @param {number} sy - The y coordinate where to start clipping
     * @param {number} [sWidth] - The width of the clipped image
     * @param {number} [sHeight] - The height of the clipped image
     * @param {number} dx - The x coordinate where to place the image on the canvas
     * @param {number} dy - The y coordinate where to place the image on the canvas
     * @param {number} [dWidth] - The width of the image to use (stretch or reduce the image)
     * @param {number} [dHeight] - The height of the image to use (stretch or reduce the image)
     * @return {void}
     */
    draw_image(image_name, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        const img = this.get_image(image_name);

        const _width = sWidth || img.width;
        const _height = sHeight || img.height;

        if (arguments.length < 6) {
            this.ctx.drawImage(img, sx, sy, _width, _height);
        } else {
            this.ctx.drawImage(img, sx, sy, _width, _height, dx, dy, dWidth, dHeight);
        }
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
    set_font(font) {

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
    text(x, y, text, color, alignment = 'left') {
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
    outline_text(x, y, text, color, outline_color = 'black', alignment = 'left') {

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
    dot(x, y, color) {
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
    line(x1, y1, x2, y2, color, line_width = 1) {
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
    rect(x, y, w, h, color, line_width = 1) {
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
    fill_rect(x, y, w, h, color) {
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
    border_rect(x, y, w, h, background_color, border_color, line_width = 1) {
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
    circle(x, y, radius, color, line_width = 1) {
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
    fill_circle(x, y, radius, color) {
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
    border_circle(x, y, radius, background_color, border_color, line_width = 1) {
        //don't call Render.circle() function directly to reduce beginPath() calls
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = background_color;
        this.ctx.fill();
        this.ctx.lineWidth = line_width;
        this.ctx.strokeStyle = border_color;
        this.ctx.stroke();
    }
}