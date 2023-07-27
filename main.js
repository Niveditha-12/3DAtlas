var viewer = new Cesium.Viewer("cesiumContainer",{
                 Geocoder: false,
                 Animation: true,
                 CreditsDisplay: false,
                 Timeline: false,
                 FullscreenButton: false,

  baseLayerPicker: false,
});


const scene = viewer.scene;
const clock = viewer.clock;
let referenceFramePrimitive;

const layers = viewer.scene.imageryLayers;

const blackMarble = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.IonImageryProvider.fromAssetId()
);
blackMarble.alpha = 0.5;
blackMarble.brightness = 2.0;
layers.add(blackMarble);

/*const cesiumLogo = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.SingleTileImageryProvider.fromUrl(
    "../images/Cesium_Logo_overlay.png",
    {
      rectangle: Cesium.Rectangle.fromDegrees(
        -75.0,
        28.0,
        -67.0,
        29.75
      ),
    }
  )
);
layers.add(cesiumLogo);*/

//viewer.scene.primitives.add(Cesium.createOsmBuildings());
// Add a WMS imagery layer
var imageryLayers = viewer.imageryLayers;
/*imageryLayers.addImageryProvider(
 new Cesium.WebMapServiceImageryProvider({
   url:"http://localhost:8082/geoserver/wms",
   layers: "topp:states",
   parameters: {
     transparent: true,
     format: "image/png",
   },
 })
);*/
imageryLayers.addImageryProvider(
   new Cesium.WebMapServiceImageryProvider({
       url: "http://localhost:8080/3d/india_state_geo.json",
       layers: "india:india_state",
       parameters: {
           transparent: true,
           format: "image/png",
       },
   })
);



// Start off looking at India.
viewer.camera.setView({
   destination: Cesium.Rectangle.fromDegrees(
       68.7,
       8.4,
       97.00,
       37.6
   ),
});

function createBasicUKStyling()
{
  Sandcastle.declare(createBasicUKStyling);
  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/UK_boundary.json",
      {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.RED.withAlpha(0.5),
        strokeWidth: 3,
      }
    )
  );
  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/NI_boundary.json",
      {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: 3,
      }
    )

  );
  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/Wales.json",
      {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.YELLOW.withAlpha(0.5),
        strokeWidth: 3,
      }
    )
  );
  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/scotland.json",
      {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.BLUE.withAlpha(0.5),
        strokeWidth: 3,
      }
    )
  );
  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/UKRegions.json",
      {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: 3,
      }
    )
  );
  Cesium.Math.setRandomNumberSeed(0);

  const promise = Cesium.GeoJsonDataSource.load(
    "http://localhost:8080/3d/UK_boundary.json"

  );
  const promise1 = Cesium.GeoJsonDataSource.load(
    "http://localhost:8080/3d/UKRegions.json"
  );
  promise1.then(function (dataSource)
  {
      viewer.dataSources.add(dataSource);
      //Get the array of entities
      //Get the array of entities
      const entities = dataSource.entities.values;
      for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      //var name = entity.Country.name;
      var name2 = entity.Country;
      entity.label= new Cesium.LabelGraphics({
              position : Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
              text : entity['_properties'].Country,
              font : '18px Helvetica',
              fillColor : Cesium.Color.BLACK,
              outlineColor : Cesium.Color.BLACK,
              outlineWidth : 2,


          })
}
   })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
}
function createBasicStyling()
{
  Sandcastle.declare(createBasicStyling);
/*  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/india_state_geo_pop.json",
      {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: 3,
      }
    )
  );*/
  Cesium.Math.setRandomNumberSeed(0);
  const promise1 = Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/capitol_indianstates.json"
    );
    promise1.then(function (dataSource)
    {
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        //var name = entity.Country.name;
        var name2 = entity.Country;
        entity.label= new Cesium.LabelGraphics({
                position : Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                text : entity['_properties'].State,
                font : '18px Helvetica',
                fillColor : Cesium.Color.BLACK,
                outlineColor : Cesium.Color.BLACK,
                outlineWidth : 2,


            })
}

     })
      .catch(function (error) {
        //Display any errrors encountered while loading.
        window.alert(error);
      });
  const promise = Cesium.GeoJsonDataSource.load(
    "http://localhost:8080/3d/india_state_geo_pop.json"
  );

  promise
    .then(function (dataSource) {
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash = {};
      for (let i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        const entity = entities[i];
        entity.label= new Cesium.LabelGraphics({
                //position : Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                text : entity['_properties'].STATE,
                font : '18px Helvetica',
                fillColor : Cesium.Color.BLACK,
                outlineColor : Cesium.Color.BLACK,
                outlineWidth : 2,


            })

        const name = entity.STATE;
      /*  let color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha: 1.0,
          });
          console.log(color);
          colorHash[name] = color;
        }*/
        const color = Cesium.Color.fromRandom({alpha:.8});
              colorHash[name] = color;
        //Set the polygon material to our random color.
        entity.polygon.material = color;
        //Remove the outlines.
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Cesium.Color.BLACK.withAlpha(1);
        //Extrude the polygon based on the state's population.  Each entity
        //stores the properties for the GeoJSON feature it was created from
        //Since the population is a huge number, we divide by 50.

      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
}
function createCapStyling()
{
  Sandcastle.declare(createCapStyling);
/*  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/india_state_geo_pop.json",
      {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: 3,
      }
    )
  );*/
  Cesium.Math.setRandomNumberSeed(0);
  const promise1 = Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/capitol_indianstates.json"
    );
    promise1.then(function (dataSource)
    {
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        //var name = entity.Country.name;
        var name2 = entity.Country;
        entity.label= new Cesium.LabelGraphics({
                position : Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                text : entity['_properties'].City,
                font : '18px Helvetica',
                fillColor : Cesium.Color.BLACK,
                outlineColor : Cesium.Color.BLACK,
                outlineWidth : 2,


            })
}

     })
      .catch(function (error) {
        //Display any errrors encountered while loading.
        window.alert(error);
      });
  const promise = Cesium.GeoJsonDataSource.load(
    "http://localhost:8080/3d/india_state_geo_pop.json"
  );

  promise
    .then(function (dataSource) {
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash = {};
      for (let i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        const entity = entities[i];
        entity.label= new Cesium.LabelGraphics({
                //position : Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                text : entity['_properties'].STATE,
                font : '18px Helvetica',
                fillColor : Cesium.Color.BLACK,
                outlineColor : Cesium.Color.BLACK,
                outlineWidth : 2,


            })

        const name = entity.STATE;
      /*  let color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha: 1.0,
          });
          console.log(color);
          colorHash[name] = color;
        }*/
        const color = Cesium.Color.fromRandom({alpha:.8});
              colorHash[name] = color;
        //Set the polygon material to our random color.
        entity.polygon.material = color;
        //Remove the outlines.
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Cesium.Color.BLACK.withAlpha(1);
        //Extrude the polygon based on the state's population.  Each entity
        //stores the properties for the GeoJSON feature it was created from
        //Since the population is a huge number, we divide by 50.

      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
}
function createUKStyling()
{
  Sandcastle.declare(createUKStyling);
/*  viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/india_state_geo_pop.json",
      {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK.withAlpha(0.5),
        strokeWidth: 3,
      }
    )
  );*/
  Cesium.Math.setRandomNumberSeed(0);
  const promise1 = Cesium.GeoJsonDataSource.load(
    "http://localhost:8080/3d/NI_boundary.json"
  );
  promise1
    .then(function (dataSource) {
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash = {};
      for (let i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        const entity = entities[i];
        const name = entity.PC_NAME;

      /*  let color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha: 1.0,
          });
          console.log(color);
          colorHash[name] = color;
        }*/
        const color = Cesium.Color.fromRandom({alpha:.8});
              colorHash[name] = color;
        //Set the polygon material to our random color.
        entity.polygon.material = color;
        //Remove the outlines.
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Cesium.Color.BLACK.withAlpha(1);
        //Extrude the polygon based on the state's population.  Each entity
        //stores the properties for the GeoJSON feature it was created from
        //Since the population is a huge number, we divide by 50.

      }
    })
    const promise2 = Cesium.GeoJsonDataSource.load(
      "http://localhost:8080/3d/Wales.json"
    );
    promise2
      .then(function (dataSource) {
        viewer.dataSources.add(dataSource);

        //Get the array of entities
        const entities = dataSource.entities.values;

        const colorHash = {};
        for (let i = 0; i < entities.length; i++) {
          //For each entity, create a random color based on the state name.
          //Some states have multiple entities, so we store the color in a
          //hash so that we use the same color for the entire state.
          const entity = entities[i];
          const name = entity.EER13NM;
        /*  let color = colorHash[name];
          if (!color) {
            color = Cesium.Color.fromRandom({
              alpha: 1.0,
            });
            console.log(color);
            colorHash[name] = color;
          }*/
          const color = Cesium.Color.fromRandom({alpha:.8});
                colorHash[name] = color;
          //Set the polygon material to our random color.
          entity.polygon.material = color;
          //Remove the outlines.
          entity.polygon.outline = true;
          entity.polygon.outlineColor = Cesium.Color.BLACK.withAlpha(1);
          //Extrude the polygon based on the state's population.  Each entity
          //stores the properties for the GeoJSON feature it was created from
          //Since the population is a huge number, we divide by 50.

        }
      })
      const promise3 = Cesium.GeoJsonDataSource.load(
        "http://localhost:8080/3d/scotland.json"
      );
      promise3
        .then(function (dataSource) {
          viewer.dataSources.add(dataSource);

          //Get the array of entities
          const entities = dataSource.entities.values;

          const colorHash = {};
          for (let i = 0; i < entities.length; i++) {
            //For each entity, create a random color based on the state name.
            //Some states have multiple entities, so we store the color in a
            //hash so that we use the same color for the entire state.
            const entity = entities[i];
            const name = entity.EER13NM;
          /*  let color = colorHash[name];
            if (!color) {
              color = Cesium.Color.fromRandom({
                alpha: 1.0,
              });
              console.log(color);
              colorHash[name] = color;
            }*/
            const color = Cesium.Color.fromRandom({alpha:.8});
                  colorHash[name] = color;
            //Set the polygon material to our random color.
            entity.polygon.material = color;
            //Remove the outlines.
            entity.polygon.outline = true;
            entity.polygon.outlineColor = Cesium.Color.BLACK.withAlpha(1);
            //Extrude the polygon based on the state's population.  Each entity
            //stores the properties for the GeoJSON feature it was created from
            //Since the population is a huge number, we divide by 50.

          }
        })
  const promise = Cesium.GeoJsonDataSource.load(
    "http://localhost:8080/3d/UK_boundary.json"
  );
  promise
    .then(function (dataSource) {
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash = {};
      for (let i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        const entity = entities[i];
        const name = entity.EER13NM;
      /*  let color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha: 1.0,
          });
          console.log(color);
          colorHash[name] = color;
        }*/
        const color = Cesium.Color.fromRandom({alpha:.8});
              colorHash[name] = color;
        //Set the polygon material to our random color.
        entity.polygon.material = color;
        //Remove the outlines.
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Cesium.Color.BLACK.withAlpha(1);
        //Extrude the polygon based on the state's population.  Each entity
        //stores the properties for the GeoJSON feature it was created from
        //Since the population is a huge number, we divide by 50.

      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
}
function createCustomStyling()
{
  Sandcastle.declare(createCustomStyling);
  //Seed the random number generator for repeatable results.
  Cesium.Math.setRandomNumberSeed(0);

  const promise = Cesium.GeoJsonDataSource.load(
    "http://localhost:8080/3d/india_state_geo_pop.json"
  );
  promise
    .then(function (dataSource) {
      viewer.dataSources.add(dataSource);

      //Get the array of entities
      const entities = dataSource.entities.values;

      const colorHash = {};
      for (let i = 0; i < entities.length; i++) {
        //For each entity, create a random color based on the state name.
        //Some states have multiple entities, so we store the color in a
        //hash so that we use the same color for the entire state.
        const entity = entities[i];
        const name = entity.STATE;
      /*  let color = colorHash[name];
        if (!color) {
          color = Cesium.Color.fromRandom({
            alpha: 1.0,
          });
          console.log(color);
          colorHash[name] = color;
        }*/
        const color = Cesium.Color.fromRandom({alpha:1});
              colorHash[name] = color;
        //Set the polygon material to our random color.
        entity.polygon.material = color;
        //Remove the outlines.
        entity.polygon.outline = false;

        //Extrude the polygon based on the state's population.  Each entity
        //stores the properties for the GeoJSON feature it was created from
        //Since the population is a huge number, we divide by 50.
        entity.polygon.extrudedHeight =
          entity.properties.POPULATION /250.0;
      }
    })
    .catch(function (error) {
      //Display any errrors encountered while loading.
      window.alert(error);
    });
}


Sandcastle.addToolbarMenu(
  [{
      text: "Styling options",
        onselect: function () {}
    },
    {
    text: "Indian States",
    onselect: function () {
      reset();
      createBasicStyling();
      Sandcastle.highlight(createBasicStyling);
    },
  },
  {
  text: "India Capitals",
  onselect: function () {
    reset();
    createCapStyling();
    Sandcastle.highlight(createCapStyling);
  },
},
{
  text: "India Population",
  onselect: function () {
    reset();
    createCustomStyling();
    Sandcastle.highlight(createCustomStyling);
  },
},

  {
  text: "UK Electoral Region",
  onselect: function () {
    reset();
    createUKStyling();
    Sandcastle.highlight(createUKStyling);
  },
},
{
text: "UK Regions",
onselect: function () {
  reset();
  createBasicUKStyling();
  Sandcastle.highlight(createBasicUKStyling);
},
},

  ],
  "toolbar"
);

function icrf(scene, time) {
  if (scene.mode !== Cesium.SceneMode.SCENE3D) {
    return;
  }

  const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
  if (Cesium.defined(icrfToFixed)) {
    const camera = viewer.camera;
    const offset = Cesium.Cartesian3.clone(camera.position);
    const transform = Cesium.Matrix4.fromRotationTranslation(
      icrfToFixed
    );
    camera.lookAtTransform(transform, offset);
  }
}

function viewInICRF() {
  Sandcastle.declare(viewInICRF);

  viewer.camera.flyHome(0);

  clock.multiplier = 3 * 60 * 60;
  scene.postUpdate.addEventListener(icrf);
  scene.globe.enableLighting = true;
}

const viewChanged = document.getElementById("viewChanged");

let removeStart;
let removeEnd;

function cameraEvents() {
  Sandcastle.declare(cameraEvents);

  const camera = viewer.camera;
  removeStart = camera.moveStart.addEventListener(function () {
    viewChanged.style.display = "block";
  });
  removeEnd = camera.moveEnd.addEventListener(function () {
    viewChanged.style.display = "none";
  });
}

const cameraChanged = document.getElementById("cameraChanged");

let removeChanged;

function cameraChanges() {
  Sandcastle.declare(cameraChanges);

  let i = 0;
  removeChanged = viewer.camera.changed.addEventListener(function (
    percentage
  ) {
    ++i;
    cameraChanged.innerText = `Camera Changed: ${i}, ${percentage.toFixed(
      6
    )}`;
    cameraChanged.style.display = "block";
  });
}

function flyToSanDiego() {
  Sandcastle.declare(flyToSanDiego);
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
  });
  
}

function flyToRectangle() {
  Sandcastle.declare(flyToRectangle);
  const west = 68.7;
  const south = 8.0;
  const east = 97.0;
  const north = 37.0;
  const rectangle = Cesium.Rectangle.fromDegrees(
    west,
    south,
    east,
    north
  );

  viewer.camera.flyTo({
    destination: rectangle,
  });

}
function flyToUK() {
  Sandcastle.declare(flyToUK);
  const west = -10;
  const south = 48.7;
  const east = -.05;
  const north = 58.7;
  const rectangle = Cesium.Rectangle.fromDegrees(
    west,
    south,
    east,
    north
  );

  viewer.camera.flyTo({
    destination: rectangle,
  });

}
Sandcastle.addToolbarMenu(
  [{
      text: "Camera Options",
        onselect: function () {}
    },
    {
    text: "Fly to San Diego",
    onselect: function () {
      reset();
      flyToSanDiego();
      Sandcastle.highlight(flyToSanDiego);

    },
  },
  {
  text: "Fly to UK",
  onselect: function () {
    reset();
    flyToUK();
    Sandcastle.highlight(flyToUK);
  },
},
  {
    text: "Fly to India",
    onselect: function () {
      console.log("calling");
      reset();
      flyToRectangle();
      Sandcastle.highlight(flyToRectangle);
    },
  },

  ],
  "toolbar"
);

Sandcastle.reset = function() {
   viewer.dataSources.removeAll();
   viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
   viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
};

function reset() {
  scene.completeMorph();
  viewer.entities.removeAll();
  scene.primitives.remove(referenceFramePrimitive);
  scene.tweens.removeAll();

  if (Cesium.defined(removeStart)) {
    removeStart();
    removeEnd();

    viewChanged.style.display = "none";

    removeStart = undefined;
    removeEnd = undefined;
  }

  if (Cesium.defined(removeChanged)) {
    removeChanged();
    removeChanged = undefined;

    cameraChanged.style.display = "none";
  }

  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

  clock.multiplier = 1.0;
  scene.postUpdate.removeEventListener(icrf);
  scene.globe.enableLighting = false;
}

scene.morphComplete.addEventListener(function () {
  reset();
});c
