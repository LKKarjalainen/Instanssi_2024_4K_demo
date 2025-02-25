/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * @fileOverview This file "prod.js" is the graphical content of the intro.
 *
 * This initial example belongs to the starter package of "Let's make a demo
 * 1.x" party coding workshop. During 3 x 4 tutored hours and your own effort
 * between them, this file eventually becomes your own artistic production.
 * Additionally, you will replace song.js with your own music exported from
 * SoundBox as JavaScript, write your own README.txt and set up a few names in
 * Settings.mk.
 *
 * How to start:
 *
 * 1. Make a complete copy of the whole "example0" directory and rename it
 *    according to your planned concept or just "PaulsFirstIntro" or whatever
 *
 * 2. If you happen to know what it means, do your favorite flavor of 'git init;
 *    git add *.js *.txt *.mk Makefile; git commit -m "Start from the example"' 
 *
 *    If you don't know what it means, skip that one.
 *
 * 3. Make sure that you can build and preview the example without problems.
 *
 * 4. Explore and try to learn how the example works.
 *
 * 5. Gradually, piece by piece, make it your own. Ask help from a workshop
 *    tutor. I recommend starting from very small changes to the example that
 *    help your understanding - how you change a color, how you change a
 *    location, how you change a rotation, how you sync something with the song
 *    time, ...
 *
 * 6. At some point, when comfortable, you can let go of these how-to comments
 *    and make this code file completely yours. One thing I recommend is storing
 *    your SoundBox song URL in a comment so it doesn't get lost.
 *
 **/

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

http://sb.bitsnbites.eu/?data=U0JveAwC7dm9SsNQGMbx56RpBoeqizgGexWCuzeiWIoSxBIIRcwSQmiQlCKIeCdOjl6Nl6AnX5Dix5zo_5e-73vaLCfhTH1OD6SJfNc5izV6i2Ud7tp27BnnVc5040V2NXI9W3Z6jqNAS6Wdnm31lfouCL7f_6qat7rv-f6vFCnp9HSrZ71__7PZQrEWzYyrab9pHobzKEmivu__Qje66_RrndtT0_ZwwOd_qVyPX85_0cy1rY0AAAAAAAAAAPibulHZvtqoTH4ZlUmmuhrPT3oY8qPW-y__-C-qWKBYK1cZ8WVEAQAAAAAAAAAAAP_Sx8LYkpHrTetfnInkt7dNqV6m9vNb8S4BAAAAAAAAAAAwLHldJ-7OkV29jGXeU_mX4z23vGuarKxqZRr2Q6UkZQAAAAAAAAAAABiWTw

One older version, as an example of "keeping track of your song versions":

http://sb.bitsnbites.eu/?data=U0JveAwC7dk9SgNBGAbgd2MS0MKfSsvFnELwOJZCGhsRJN0SEiQhCCLexMrS03gE3c0aiKLWRp9n-L4ZdqaY2fa9Pky2U3Y7Z6NsPY9SO9qr20m_6DylM1j0L-tVO5JhrlKt9fGHPslvNxx-ff9J3ae5y82n87P3eV7XIgAAAAAAAPw16ynZQVYpWcomJUuK5Uge7nO7ya9s799kXrNlIjabZ5om3RtLwQAAAAAAAP6l14uirhTp9gftl85uUq62i0aqpPqp_EYAAAAAAAA2y7St0-7Ocb167KV4qVKe9_a7zW7RxmTLIOybqoRkAAAAAAAAbJY3

*/

// ----------------------------------------------------------------------------
// Global variables that you MUST define - they are used by the library code:

/** Song tempo; the library computes time in beats for easy sync. */
var songBeatsPerMinute = 116;

/** 
 * Frame producer function must be selected; this tutorial example depends on
 * the exact selection done here. In fact, everything after this selection could
 * be very different for different approaches of how to paint each graphics frame.
 *
 * TODO: In the future (maybe not yet in 2024) there could be a larger selection
 * of "demo type" choices here. So far there is the classic adaptation of course
 * exercise answers: You provide a scenegraph with objects, camera, and light.
 * The frame producer function traverses the graph and puts stuff to screen.
 */
var frameProducerFunction = frameProducerVanilla14;

/**
 * Shader selection; this tutorial example depends on the exact ones selected.
 * You better know what you do, if you change these. That said, why not ... The
 * library compiles the combination of shaders given here and uses that as the
 * shader program for everything that you draw.
 *
 * TODO: (Probably after 2024) This is related to the "demo type" choices which
 * I'd like to provide in the library. So far let's have one simple one: It has
 * a Phong shading model with exactly one light source. No white fog this year..
 */
var shaders = [vert_shader_vanilla14, frag_shader_vanilla14];

/** You must give an RGBA color; scene background is cleared by the library.*/
var clearColor = [0,0,0,1];

// ----------------------------------------------------------------------------
// Global variables that belong to your own production - the library does not
// use these, so you can change or add whatever you want here. They need to be
// global so they are available in your draw function below:

var objTile, objBackground, objBall;
// var frames_built = 0;
// ----------------------------------------------------------------------------
/**
 * Initialize the constant and pre-computed "assets" used in your own
 * production; the library calls this function once before entering the main
 * loop.
 *
 * Things like graphics primitives / building blocks can be generated
 * here. Basically anything that you want to compute once, before the
 * show starts. Due to the current library workings, this includes all
 * shapes that you're going to use - modifying shapes on-the-fly is not
 * yet supported.
 */
function initAssets(){
    // The library provides some elementary ways to create shapes, as per
    // the MIT OCW first course in computer graphics that was its inspiration.
    // Once a shape is created, any number of transformed copies can be placed
    // in the scene.

    // Here, we create the most elementary of the elementary building blocks as
    // an example: the box and the ball.

    // Now there is a box shape available in the library:
    objTile = new Box(1);

    // Ball can be built from circle curves:
    objBall = new GenCyl(new funCircle(1,10,.5), 32,
                         new funCircle(0,32));

    // Can make the radius negative to make an interior of a ball:
    objBackground = new GenCyl(new funCircle(-10,10,.5), 32,
                               new funCircle(0,32));


}


/**
 * Example of how you can structure your scene graph using functions that build
 * sub-graphs. Use names that are relevant to your production. Function
 * "snowman" builds a snowman for example. If you build a squirrel, you can call
 * the function "squirrel".
 *
 * Pro tip: Create meaningful and named parameters, too. Here, "handwave_amount"
 * would have been better than "t" etc. Do better than these examples..
 *
 */
function snowman(t){

    /**
     * Example of a scene graph node. If you have any experience with JSON,
     * you'll get it that a node is and object with 3 properties named "f", "o",
     * and "c", and they all are lists. If this is your first encounter, you
     * learn some basic JSON syntax here. Ask your tutor to clarify.
     *
     * The names are short and carefully selected to have minimal footprint in a
     * demoscene intro. Here is the semantics and some mnemonics to help you
     * remember what they mean:
     *
     *   "f" stands for Frame transformations or Functions: a list of 4x4
     *   matrices that are right-multiplied to current scene transformation
     *   matrix before entering the node further.
     *
     *   "o" stands for Objects: a list of actual objects / shapes that are
     *   drawn using the current transformation, after applying all "f".
     *
     *   "c" stands for Children: a list of nodes that will be processed after
     *   applying "f" and drawing "o". If you have been wondering what recursive
     *   processing means, then here is a good example about it.
     *
     * All the lists f, o, and c must always exist (or there will be a runtime
     * error and crash) but any can be empty, marked with empty braces []. An
     * empty list just means that the particular processing step is not relevant
     * for that node.
     *
     * The current library version uses property "r" for special uses, but it is
     * not mandatory, and will be explained later, on a need-to-know basis.
     */
    var stuff = {
        f: [],
        o: [],
        c: []
    };

    /**
     * An example of a 4x4 matrix that is used in the default shading model
     * (currently the best one available; calendar looks a bit so-so whether new
     * models are coming at Instanssi 2024 or must be left to later time):
     *
     * First row:  [ Ambient  R,G,B = base color in shadowed region,      (unused) ]
     * Second row: [ Diffuse  R,G,B = diffuse reflectance in lit region,  (unused) ]
     * Third row:  [ Specular R,G,B = specular 'shiny' reflectance,      shininess ]
     * Fourth row: [ (unused), (unused), (unused), mesh brightness ]
     * 
     * I suppose shininess needs to be larger than 0. Unused ones can be anything,
     * they are unfortunate noise for our 4k.
     */

    // We made an empty node called "stuff", but now we start using it as a container
    // of more stuff, and do this by pushing new nodes in its child list:
    stuff.c.push({f: [translate_wi(0,1,0), scale_wi(1)],
                  o: [new Material(basic_color(.1, .7, .1)), objBall],
                  c: []
                 });
    

    // You can use such pushing for example for pushing multiple nodes in a for-loop ...

    // Pushing one-by-one makes it possible to manage combining parts without getting
    // into kilometer-deep and wide JSON structures that make you sick and get out of hands.

    // Middle ball and the arms as the children
    stuff.c.push({f: [translate_wi(0,2,0), scale_wi(.7)],
                  o: [new Material(basic_color(.1,.7,.1)), objBall],
                  c: [
                      {f: [rotY_wi(.2), rotZ_wi(.4*Math.sin(.8*t)), translate_wi(1,0,0), scaleXYZ_wi(.8,.3,.3)],
                       o: [new Material(basic_color(.1,.7,.1)),objBall],
                       c: []},
                      {f: [rotY_wi(-.2), rotX_wi(.4*Math.sin(.06*t)),rotZ_wi(3.14-.4*Math.sin(.1*t)), translate_wi(1,0,0), scaleXYZ_wi(.8,.3,.3)],
                       o: [new Material(basic_color(.1,.7,.1)), objBall],
                       c: []}
                     ]
                 });
    

    var small_cube_position = Math.max(Math.min(0.5*Math.tan(0.2*t), 3),-3);
    // Head and the disks
    stuff.c.push({f: [translate_wi(0,3,0), scale_wi(.4), rotX_wi(-.3)],
                  o: [new Material(basic_color(.1,.7,.1)), objBall],
                  c: [{f: [translate_wi(0,.5,0), scaleXYZ_wi(1.5,.1,1.5)],
                       o: [new Material(basic_color(.01,.07,.01)), objBall],
                       c: []
                      },
                      {f: [translate_wi(0,.2,0), scaleXYZ_wi(1.5,.1,1.5)],
                       o: [objBall],
                       c: []
                      },
                      {f: [translate_wi(0,-.1,0), scaleXYZ_wi(1.5,.1,1.5)],
                       o: [objBall],
                       c: []
                      }
                     ]
                 });
    

    if (small_cube_position.toFixed(2) < 0.15 && small_cube_position.toFixed(2) > -0.15){
        stuff.c[2].c.push({
                        f: [translate_wi(0,1.1,0), scaleXYZ_wi(0.3,0.3,0.3)],
                        o: [new Material(basic_color(.2, .5 + Math.sin(t), .4)), objTile],
                        c: []
                      })
    }
    else {
        stuff.c[2].c.push(
                      {
                        f: [translate_wi(small_cube_position,1.1,-small_cube_position), scaleXYZ_wi(0.1,0.1,0.1), rotX_wi(t), rotY_wi(t), rotZ_wi(t)],
                        o: [new Material(basic_color(.2+Math.cos(t), .5 + Math.sin(t), .4+Math.tan(t))), objTile],
                        c: []
                      },
                      {
                        f: [translate_wi(-small_cube_position,1.1,small_cube_position), scaleXYZ_wi(0.1,0.1,0.1),rotX_wi(t), rotY_wi(t), rotZ_wi(t)],
                        o: [objTile],
                        c: []
                      },
                      {
                        f: [translate_wi(small_cube_position,1.1,small_cube_position), scaleXYZ_wi(0.1,0.1,0.1),rotX_wi(t), rotY_wi(t), rotZ_wi(t)],
                        o: [objTile],
                        c: []
                      },
                      {
                        f: [translate_wi(-small_cube_position,1.1,-small_cube_position), scaleXYZ_wi(0.1,0.1,0.1),rotX_wi(t), rotY_wi(t), rotZ_wi(t)],
                        o: [objTile],
                        c: []
                      }
        );
    }
    return stuff;
}

/** 
 * Example of a function that returns a diffuse non-shiny basic coloring
 * compatible with the Vanilla 1.4 shader
 */
function basic_color(r,g,b){
    return [r/3, g/3, b/3, 0,
            r,   g,   b,   0,
            0,   0,   0,   1,
            0,   0,   0,   0]
}

/**
 * Your own creative "direction" happens here - this function will be called on every
 * screen update.
 *
 * You are expected to return a scene graph for any time step here.
 * Time is given as 'beats' according to song tempo that you have set above.
 *
 * This is an important function to re-write creatively to make your own entry.
 * 
 * You can start deleting and replacing parts of the example as soon as you start to
 * get an idea of how the structure is built. Exploring with small changes is a recommended
 * way of learning. You can also talk you a workshop tutor and explore the possibilities
 * available - they are limited, but can still be put together in a million ways or more.
 *
 */
function buildSceneAtTime(t){
    // console.log("FPS is: "+frames_built/(t/2));
    // Initialize empty scenegraph. Root node with nothing inside:
    var sceneroot = {f:[],o:[],c:[]};
    if (t > 40) {
        return sceneroot;
    }

    // Build animated contents step by step, in subgraphs
    var player_one_location = translate_wi(0,0,0);
    if (t > 22){
        player_one_location = translate_wi(0,(Math.min(-7+t/4, 3))+1,0);
    }
    var parivaljakko = {f:[],o:[],c:[
        {f:[player_one_location,  rotY_wi(1.6)],  o:[], c:[snowman(2*t)]},
        {f:[translate_wi(-5,0,0), rotY_wi(-1.6)], o:[], c:[snowman(2*t + 2)]}
    ]}

    // Generating colors can be put into functions just like anything - for convenience and brevity

    // Colors can be animated, as can anything. Use "t" for sync and innovate...

    // Names can be given to any nuts or bolts, to help you animate and manage your scene:




    // At times, surplus complexity tends to appear, and it could be refactored away.
    // For example, the following code pushes a useless node with children that could have
    // been pushed one-by-one more cleanly. Or, actually, the empty root node did not need
    // to be created in the first place... silly me... but this makes an instructional
    // example, so leave it like this..

    sceneroot.c.push({f:[],
                      o:[],
                      c:[
                              {f:[translate_wi(0,-3,0), scaleXYZ_wi(60,.2,60)],
                               o:[new Material(basic_color(.9, .6, .4)), objTile],
                               c:[]},

                              {f:[translate_wi(0,Math.min(-7 + t/4, 3),0), scaleXYZ_wi(2,2,2), rotY_wi(t)],
                               o:[new Material(basic_color(.2, .5 + Math.sin(t), .4)), objTile],
                               c:[]},

                              {f:[translate_wi(0,-3,0)],
                               o:[],
                               c:[parivaljakko]},

                              {f:[scaleXYZ_wi(3,3,3)],
                               o:[],
                               c:[{
        f:[],
        o:[new Material([.1, .1, .2, 1,
         .3, .3,  1, 1,
         .1, .1, .1, 2,
          0,  0,  0, 0 ]), objBackground],
        c:[]
    }]
                              },
                                
                              // The scene must have exactly one Camera. It doesn't work without.
                              {f:[translate_wi(0,3,0), rotY_wi(t/3), translate_wi(0,0,30), rotX_wi(.2)],
                               o:[],
                               c:[],
                               r:[new Camera()]
                              },

                              // With "Vanilla 1.4" intro, the scene must have exactly one Light.
                              // It doesn't work without.
                              {f:[translate_wi(9*Math.sin(t/9), 3+Math.sin(t), 0), scale_wi(.1)],
                                o:[new Material(basic_color(9,9,9)), objTile],
                                c:[],
                                r:[new Light()]
                              }
                        ]
                    }
                    );
    
    // frames_built += 1;
    
    return sceneroot;
}




// -----------------------------------------------------------------------------

/**
 * (Optionally) initialize additional HTML and CSS parts of the
 * document. This can be used, for example, for scrolling or flashing
 * text shown as usual HTML or hypertext. Not often used in actual
 * demoscene productions.
 */
function initDocument(){
}

/**
 * (Optionally) update the HTML and CSS parts of the document. This
 * can be used for scrolling or flashing text shown as usual HTML. Not
 * often used in actual demoscene productions.
 */
function updateDocument(t){
}
