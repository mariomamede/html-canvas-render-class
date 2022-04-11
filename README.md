<!-- ABOUT THE PROJECT -->
## About The Project


Rendering objects and images in HTML5 Canvas can be complicated for those who are not familiar with canvas, so I decided to create this render class that doesn't need dependencies to work, and make it simpler and more organized


![HTML Canvas with render class](https://i.imgur.com/JB4C7y8.png)

<!-- USAGE EXAMPLES -->
## Usage

Here are some examples of how you can use render class to draw some objects in canvas

   ```js
    const canvas_element = document.getElementById('canvas');
    const render = new Render(canvas_element);

    render.set_font('22px Arial');
    render.text(10, 50, 'Hello World!', 'darkolivegreen');

    render.set_font('42px Arial');
    render.outline_text(10, 100, 'Hello World!', 'white');

    render.rect(10, 120, 50, 50, 'red');
    render.fill_rect(80, 120, 50, 50, 'red');
    render.border_rect(150, 120, 50, 50, '#00ff0050', 'blue');

    render.circle(30, 210, 20, 'red');
    render.fill_circle(100, 210, 20, 'red');
    render.border_circle(170, 210, 20, '#00ff0050', 'blue');
   ```
   
<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mário Mamede - mariomamede@live.com

Project Link: [https://github.com/mariomamede/render-class](https://github.com/mariomamede/render-class)

<p align="right">(<a href="#top">back to top</a>)</p>
