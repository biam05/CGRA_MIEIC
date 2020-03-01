/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayTriangle').name('(1) Display Triangle');
        this.gui.add(this.scene, 'displayDiamond').name('(1) Display Diamond');
        this.gui.add(this.scene, 'displayParallelogram').name('(1) Display Parallelogram');
        this.gui.add(this.scene, 'displayTriangleSmall').name('(2) Display Small Triangle');
        this.gui.add(this.scene, 'displayTriangleBig').name('(2) Display Big Triangle');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}