/**
* Draw is a simple class composed of static methods and properties
* used for demonstration purpose. Is a simple API for 
* creating vector drawings programatically in the browser. It uses SVG. 
* Many of the comments are formatted to support automated 
* documentation creation using JSDoc.
* See https://jsdoc.app
* @author Michael Corrin <m.corrin@utoronto.ca>
* @version 0.0.3
* @hideconstructor
* @example
* // Create an artboard to draw on.
* Draw.Artboard();
* // Draw a line
* Draw.Line(10,10,100,300);
* // Draw a circle
* Draw.Circle(50,50,100);
*/
class Draw
{
    /**
    * Generates an artboard (SVG) where svg shapes can be placed. Returns an &lt;svg&gt;.
    * @static
    * @method
    * @param {number} [$width] The width of the artboard in pixels. If no value provided, the width is set to the width of the viewport.
    * @param {number} [$height] The height of the artboard in pixels. If no value provided, the height is set to the height of the viewport.
    * @returns {SVGSVGElement}
    * @example
    * // Create an artboard that is the current width and height of the browser viewport.
    * Draw.Artboard(window.innerWidth, window.innerHeight);
    */
    static Artboard($width = window.innerWidth, $height = window.innerHeight)
    {
        try 
        {
            if (Draw.ArtboardExists() == true) throw new Error("Cannot create a new Artboard. One already exists.");
        }
        catch(error)
        {
            console.error(error.message);
            return;
        }
        try
        {
            // if user supplies number as string with a suffix
            // for example "22%" or "100px", parseInt will strip %, em and px
            if (Number.isNaN(parseInt($width)) || Number.isNaN(parseInt($height))) throw new TypeError("The $width and $height parameters expect values of the number type. No artboard created.");
        }
        catch(error)
        {
            console.error(error.message);
            return;
        }
        try
        {
            if ($width <= 0 || $height <=0 || $width === undefined || $height === undefined) throw new Error("The width and height of the artboard must be greater than 0. No artboard created.");
        }
        catch(error)
        {
            console.error(error.message);
            return;
        }
        // 
        let _w =  (typeof $width === "string") ? parseInt($width) : $width;
        let _h =  (typeof $width === "string") ? parseInt($height) : $height;
        if (typeof $width === "string" && ($width.indexOf("%") != -1 || $width.indexOf("em")!= -1  || $width.indexOf("en")!= -1 ))
        {
            console.warn("The argument provided for the $width parameter of the Artboard method was a string with an invalid suffix (e.g., %, em, en). \nThe invalid suffix has been stripped to leave only the numerical component of the value provided.");
        }
        if (typeof $height === "string" && ($height.indexOf("%") != -1 || $height.indexOf("em")!= -1  || $height.indexOf("en")!= -1 ))
        {
            console.warn("The argument provided for the $height parameter of the Artboard method was a string with an invalid suffix (e.g., %, em, en). \nThe invalid suffix has been stripped to leave only the numerical component of the value provided.");
        }
        Draw._ArtboardDimensions.setHeight(_h);
        Draw._ArtboardDimensions.setWidth(_w);
        let svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgEl.setAttribute("width", _w + "px");
        svgEl.setAttribute("height", _h + "px");
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgEl.setAttribute("viewBox", "0 0 " + _w + " " + _h);
        Draw.ArtboardEl = svgEl;
        Draw.ArtboardExists(true);
        document.body.appendChild(svgEl);
    }
    /**
    * Generates a line (SVG) on the artboard. Returns an svg &lt;line&gt;.
    * @static
    * @method
    * @param {number} $x1 The x coordinate of the starting point of the line. In SVG units.
    * @param {number} $y1 The y coordinate of the starting point of the line. In SVG units.
    * @param {number} $x2 The x coordinate of the ending point of the line. In SVG units.
    * @param {number} $y2 The y coordinate of the ending point of the line. In SVG units.
    * @param {number} [$thickness = 1] The thickness of the line. In SVG units. Default is 1.
    * @param {string} [$colour = Draw.baseColour] The colour applied to the stroke of the line. Default value is the Draw.baseColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., "#FFFFFF").
    * @returns {SVGLineElement}
    * @example
    * // Create artboard
    * Draw.Artboard();
    * // Draw a line from coordinate x:10, y:10 to coordinate x:20, y:50
    * Draw.Line(10, 10, 20, 50);
    */
    static Line($x1, $y1, $x2, $y2, $thickness = 1, $colour = Draw.baseColour)
    {
        let SVGline = document.createElementNS("http://www.w3.org/2000/svg", "line");
        SVGline.setAttribute("x1", $x1);
        SVGline.setAttribute("x2", $x2);
        SVGline.setAttribute("y1", $y1);
        SVGline.setAttribute("y2", $y2);
        SVGline.setAttribute("stroke", $colour);
        SVGline.setAttribute("stroke-width", $thickness);
        Draw.ArtboardEl.appendChild(SVGline);
        //Draw.Map.set(SVGline, )
        Draw.Count++;
        return SVGline;
    }
    /**
    * Generates a circle (SVG) on the artboard. Returns an svg &lt;ellipse&gt;.
    * @static
    * @method
    * @param {number} $center_x The center of the circle on the x axis. In SVG units.
    * @param {number} $center_y The center of the circle on the y axis. In SVG units.
    * @param {number} $radius The radius of the circle in SVG units.
    * @param {number} [$stroke_thickness] The thickness of the stroke applied to the circle. Default value is 1. In SVG units.
    * @param {string} [$stroke_colour] The colour applied to the stroke of the circle. Default value is the Draw.baseColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., "#FFFFFF").
    * @param {string} [$fill_colour] The colour applied to the fill of the circle. Default value is the Draw.baseFillColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
    * @returns {SVGEllipseElement}
    */
    static Circle($center_x, $center_y, $radius, $stroke_thickness = 1, $stroke_colour = Draw.baseColour, $fill_colour = Draw.baseFillColour)
    {
        let SVGEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        SVGEllipse.setAttribute("cx", $center_x);
        SVGEllipse.setAttribute("cy", $center_y);
        SVGEllipse.setAttribute("rx", $radius);
        SVGEllipse.setAttribute("ry", $radius);
        SVGEllipse.setAttribute("stroke", $stroke_colour);
        SVGEllipse.setAttribute("fill", $fill_colour);
        SVGEllipse.setAttribute("stroke-width", $stroke_thickness);
        Draw.ArtboardEl.appendChild(SVGEllipse);
        Draw.Count++;
        return SVGEllipse;
    }
    /**
    * Generates a rectangle (SVG) on the artboard. Returns an svg &lt;rect&gt;.
    * @static
    * @method
    * @param {number} $x The x position of the rectangle on the artboard. In SVG units.
    * @param {number} $y The y position of the rectangle on the artboard. In SVG units.
    * @param {number} $width The width of the rectangle in SVG units.
    * @param {number} $height The height of the rectangle in SVG units.
    * @param {number} [$stroke_thickness=1] The thickness of the stroke applied to the rectangle. Default value is 1. In SVG units.
    * @param {string} [$stroke_colour] The colour applied to the stroke of the rectangle. Default value is the Draw.baseColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
    * @param {string} [$fill_colour] The colour applied to the fill of the rectangle. Default value is the Draw.baseFillColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
    * @returns {SVGRectElement}
    */
    static Rectangle($x, $y, $width, $height, $stroke_thickness = 1, $stroke_colour = Draw.baseColour, $fill_colour = Draw.baseFillColour)
    {
        let SVGRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        SVGRect.setAttribute("x", $x);
        SVGRect.setAttribute("y", $y);
        SVGRect.setAttribute("width", $width);
        SVGRect.setAttribute("height", $height);
        SVGRect.setAttribute("stroke", $stroke_colour);
        SVGRect.setAttribute("fill", $fill_colour);
        SVGRect.setAttribute("stroke-width", $stroke_thickness);
        Draw.ArtboardEl.appendChild(SVGRect);
        Draw.Count++;
        return SVGRect;
    }
    /**
    * Generates a square (SVG) on the artboard. Returns an svg &lt;rect&gt;.
    * @static
    * @method
    * @param {number} $x The x position of the rectangle on the artboard. In SVG units.
    * @param {number} $y The y position of the rectangle on the artboard. In SVG units.
    * @param {number} $width The width of the rectangle in SVG units.
    * @param {number} $height The height of the rectangle in SVG units.
    * @param {number} [$stroke_thickness] The thickness of the stroke applied to the square. Default value is 1. In SVG units.
    * @param {string} [$stroke_colour] The colour applied to the stroke of the square. Default value is the Draw.baseColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
    * @param {string} [$fill_colour] The colour applied to the fill of the square. Default value is the Draw.baseFillColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
    * @returns {SVGRectElement}
    */
    static Square($x, $y, $width, $stroke_thickness = 1, $stroke_colour = Draw.baseColour, $fill_colour = Draw.baseFillColour)
    {
        let SVGRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        SVGRect.setAttribute("x", $x);
        SVGRect.setAttribute("y", $y);
        SVGRect.setAttribute("width", $width);
        SVGRect.setAttribute("height", $width);
        SVGRect.setAttribute("stroke", $stroke_colour);
        SVGRect.setAttribute("fill", $fill_colour);
        SVGRect.setAttribute("stroke-width", $stroke_thickness);
        Draw.ArtboardEl.appendChild(SVGRect);
        Draw.Count++;
        return SVGRect;
    }
    /**
    * Generates text (SVG) on the artboard. Returns an SVG &lt;text&gt;.
    * @static
    * @method
    * @param {number} $x The x position of the rectangle on the artboard. In SVG units.
    * @param {number} $y The y position of the rectangle on the artboard. In SVG units.
    * @param {string} $textToDisplay The text that should be displayed in the text element.
    * @param {string} [$fill_colour] The fill colour of the text. Default value is the Draw.baseTextFillColour. Accepts
    *   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
    * @returns {SVGTextElement}
    */
    static Text($x, $y, $textToDisplay, $fill_colour = Draw.baseTextFillColour)
    {
        let SVGText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        SVGText.setAttribute("x", $x);
        SVGText.setAttribute("y", $y);
        SVGText.textContent = $textToDisplay;
        SVGText.setAttribute("fill", $fill_colour);
        Draw.ArtboardEl.appendChild(SVGText);
        Draw.Count++;
        return SVGText;
    }
    /**
    * This static method offsets the drawn content on the artboard. Positive values move the content of the artboard to the right and down, 
    * while negative values will move the content of the artboard up and to the left. If no arguments are supplied when the function is invoked,
    * the offset of the artboard content will not be adjusted and the method will return the current offset values.
    * @static
    * @method
    * @param {number} [$x=undefined] The amount to offset the content of the artboard to the right or left.
    * @param {number} [$y=undefined] The amount to offset the content of the artboard up or down.
    * @returns {object} Returns an object with x and y properties.
    */
    static ArtboardOffset($x=undefined, $y=undefined)
    {
        if ($x !== undefined || $y !== undefined)
        {
            Draw._OffsetArtboard.setOffset(-$x, -$y);
        }
        return Draw._OffsetArtboard.getOffset();
    }
    /**
    * This static method scales the content inside the artboard. The width and height of the artboard remain unchanged.
    * @static
    * @method
    * @param {number} [$num=1] A value that is greater than 0, where a value of 1 corresponds to the default unscaled state of the artboard.
    * @example
    * // create a default artboard that covers the entire viewport
    * Draw.Artboard();
    * // Draw a line from the upper left to lower right of the viewport.
    * Draw.Line(0,0,window.innerWidth, window.innerHeight); 
    * // scale the content inside the artboard; the artboard itself is same size.
    * Draw.SetArtboardScale(2);
    */
    static SetArtboardScale($num = 1)
    {
        Draw._ArtboardScale.setScale($num);
    }
    /**
    * This static method returns the scale of the artboard. This is a value that is greater than 0. A value of 1 corresponds to an unscaled artboard.
    * @static
    * @method
    * @returns {number}
    */
    static GetArtboardScale()
    {
        return Draw._ArtboardScale.getScale();
    }
    /**
    * Adds or removes an overlay that shows some key features of the artboard like the 0, 0 coordinate, as well as a grid that has a gridline every 100 units.
    * @static
    * @method
    * @param {boolean} [$bool=true] Pass a value of true to enable the debug view. Pass a value of false to disable it.
    * @returns {undefined}
    * @example
    * Draw.Artboard();
    * // Enable the debug view
    * Draw.DebugView();
    * // Disable the debug view
    * Draw.DebugView(false);
    */
    static DebugView($bool = true)
    {
        try
        {
            if (Draw.ArtboardExists() === false)
            {
                throw new Error("The debug view cannot be enabled until the artboard is created.");
            }
        }
        catch(err)
        {
            console.error(err.message);
            return;
        }
        if ($bool === true)
        {
            Draw._DebuggerView.show();
        }
        else
        {
            Draw._DebuggerView.hide();
        }
        
    }
}
/**
* Keeps track of the number of SVG elements drawn
* @static
* @type {number}
*/
Draw.Count = 0;

/**
* Bound to an instance of SVGSVGElement. This is the artboard.
* @static
* @type {SVGSVGElement}
*/
Draw.ArtboardEl;
/**
* Keeps track of whether the artboard has been created or not. Default value is false.
* Use Draw.Artboard method to instantiate the artboard.
* @static
* @method
* @param {boolean} $bool 
*/
Draw.ArtboardExists = (function(){
    _artboardExists = false;
    return function($bool=_artboardExists)
    {
        _artboardExists = $bool;
        return _artboardExists;
    }
})();
/**
* Example of an immediately invoked function expression
* @ignore
* @private
*/
Draw._ArtboardDimensions = (function() {
    let _width;
    let _height;
    //
    function setWidth($w)
    {
        _width = $w;
        return _width;
    }
    function getWidth()
    {
        return _width;
    }
    function setHeight($h)
    {
        _height = $h;
        return _height;
    }
    function getHeight()
    {
        return _height;
    }
    return {"setWidth":setWidth, "getWidth":getWidth, "setHeight":setHeight, "getHeight":getHeight};
})();
/**
* Sets the scale of the artboard.
* Example of an immediately invoked function expression.
* @ignore
* @private
*/
Draw._ArtboardScale = (function()
{
    let _scale = 1;
    function _getScale()
    {
        return _scale;
    }
    function _setScale($num)
    {
        try {
            if ($num <= 0) throw new RangeError("Number provided to set the scale of the artboard must be greater than 0. \nA value of 1 is unscaled. A value of 2 increases the area visible on the artboard by 4 times, and scales the content of the artboard to half its default size.");
        }
        catch(error)
        {
            console.error(error.message);
            return;
        }
        _scale = $num;
        let w = Draw._ArtboardDimensions.getWidth();
        let h = Draw._ArtboardDimensions.getHeight();
        let o = Draw._OffsetArtboard.getOffset();
        debugger;
        Draw.ArtboardEl.setAttribute("viewBox", o.x + " " + o.y + " " +  (w*_scale) + " " + (h * _scale));
        return _scale;
    }
    return {"getScale":_getScale, "setScale":_setScale};
})();
/**
* @ignore
* @private
*/
Draw._OffsetArtboard = (function()
{
    let _offsetX = 0;
    let _offsetY = 0;
    function _setOffset($x, $y)
    {
        _offsetX = $x;
        _offsetY = $y;
        let s = Draw._ArtboardScale.getScale();
        let w = Draw._ArtboardDimensions.getWidth();
        let h = Draw._ArtboardDimensions.getHeight();
        debugger;
        Draw.ArtboardEl.setAttribute("viewBox", _offsetX + " " + _offsetY + " " + (w*s) + " " + (h * s));
    }
    function _getOffset()
    {
        return {x:_offsetX, y:_offsetY};
    }
    return {setOffset: _setOffset, getOffset: _getOffset};
})();
/**
* The default stroke/outline colour for drawn svg elements. Accepts
*   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
* @static
* @type {string} 
*/
Draw.baseColour = "black";
/**
* The default fill colour for drawn svg elements. Accepts
*   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
* @static
* @type {string}
*/
Draw.baseFillColour = "none";
/**
* The default fill colour for text svg elements. Accepts
*   named colours (e.g., "blue", "black, "red") or hex values (e.g., #FFFFFF).
* @static
* @type {string}
*/
Draw.baseTextFillColour = "black";
/**
* IIFE that creates the debugger view functionality
* @ignore
*/
Draw._DebuggerView = (function() {
    _isEnabled = false;
    let _defaultVertZero = document.createElementNS("http://www.w3.org/2000/svg", "line");
        _defaultVertZero.setAttribute("x1", -4000);
        _defaultVertZero.setAttribute("x2", 4000);
        _defaultVertZero.setAttribute("y1", 0);
        _defaultVertZero.setAttribute("y2", 0);
        _defaultVertZero.setAttribute("stroke", "cyan");
        _defaultVertZero.setAttribute("stroke-dasharray", 10);
        _defaultVertZero.setAttribute("stroke-width", 6);
    let _defaultHorZero = document.createElementNS("http://www.w3.org/2000/svg", "line");
        _defaultHorZero.setAttribute("x1", 0);
        _defaultHorZero.setAttribute("x2", 0);
        _defaultHorZero.setAttribute("y1", -4000);
        _defaultHorZero.setAttribute("y2", 4000);
        _defaultHorZero.setAttribute("stroke", "cyan");
        _defaultHorZero.setAttribute("stroke-dasharray", 10);
        _defaultHorZero.setAttribute("stroke-width", 6);
    let _SVGText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        _SVGText.setAttribute("x", 10);
        _SVGText.setAttribute("y", "1em");
        _SVGText.textContent = "(0,0)";
        _SVGText.setAttribute("font-size", "2em");
        _SVGText.setAttribute("fill", "cyan");
    let _lines = [];
    for (let j = -50; j < 50; j++)
    {
        let _defaultVertMax = document.createElementNS("http://www.w3.org/2000/svg", "line");
        _defaultVertMax.setAttribute("x1", -4000);
        _defaultVertMax.setAttribute("x2", 4000);
        _defaultVertMax.setAttribute("y1", j * 100);
        _defaultVertMax.setAttribute("y2", j * 100);
        _defaultVertMax.setAttribute("stroke", "cyan");
        _defaultVertMax.setAttribute("stroke-dasharray", ((j*100)%1000 === 0 ? "3 5" : "3 10"));
        _defaultVertMax.setAttribute("stroke-width", ((j*100)%1000 === 0 ? 4 : 2));
        _lines.push(_defaultVertMax);
        let _defaultHorMax = document.createElementNS("http://www.w3.org/2000/svg", "line");
        _defaultHorMax.setAttribute("x1", j * 100);
        _defaultHorMax.setAttribute("x2", j * 100);
        _defaultHorMax.setAttribute("y1", -4000);
        _defaultHorMax.setAttribute("y2", 4000);
        _defaultHorMax.setAttribute("stroke", "cyan");
        _defaultHorMax.setAttribute("stroke-dasharray", ((j*100)%1000 === 0 ? "3 5" : "3 10"));
        _defaultHorMax.setAttribute("stroke-width", ((j*100)%1000 === 0 ? 4 : 2));
        _lines.push(_defaultHorMax);
    }
    
    function _show()
    {
        _isEnabled = true;
        Draw.ArtboardEl.appendChild(_defaultVertZero);
        Draw.ArtboardEl.appendChild(_defaultHorZero);
        Draw.ArtboardEl.appendChild(_SVGText);
        for (let line in _lines)
        {
            Draw.ArtboardEl.appendChild(_lines[line]);
        }
    }
    function _hide()
    {
        if (_isEnabled === true)
        {
            _isEnabled = false;
            Draw.ArtboardEl.removeChild(_defaultVertZero);
            Draw.ArtboardEl.removeChild(_defaultHorZero);
            Draw.ArtboardEl.removeChild(_SVGText);
            for (let line in _lines)
            {
                Draw.ArtboardEl.removeChild(_lines[line]);
            }
        }
        
    }
    return {show:_show, hide:_hide};
})();