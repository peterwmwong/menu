(function(){
  var fbRecipes =  new Firebase("https://menudev.firebaseio.com/recipes");

  function clone(arr){ return Array.prototype.slice.call(arr) }

  function Recipe(fb, createData){
    this._initData(createData);
    this._fb = fb;

    if(!createData){
      fb.on("value", function(snap){
        this._initData(snap.val());
      }.bind(this));
    } else {
      this.isNew = true;
    }
  }

  Recipe.prototype = {
    _initData: function(data){
      data             = data || {};
      this.name        = data.name;
      this.ingredients = data.ingredients || [];
      this.directions  = data.directions || [];
    },
    save: function(){
      this._fb.set({
        name: this.name,
        ingredients: clone(this.ingredients),
        directions: clone(this.directions)
      });
      this.isNew = false;
    }
  };

  Recipe.create = function(){
    var data = {
      name: 'new recipe',
      ingredients: [
        '2/3 cup orange juice',
        '2 tbsp lemon juice',
        '2 tbsp rice vinegar',
        '2 tbsp brown sugar',
        '3 tbsp soy sauce',
        // '1 tsp minced garlic',
        // '2 tsp ginger',
        // '3 tbsp corn starch',
        // '1.5 cups broccoli florets',
        // '1.5 cups green beans',
        // '1 bell pepper',
        // '1 small onion'
      ],
      directions: [
        'Cut raw chicken to pieces and season the chicken with salt and pepper, then sprinkle with corn starch and rub the corn starch into the chicken.',
        'In a saucepan, whisk together the sauce ingredients. Bring to a boil over medium-high heat and cook for 5 minutes. Remove from heat.',
        'Stir-fry the chicken for 4-5 minutes or until the chicken is cooked through. Add the onions and other veggies and stir-fry until the beans and broccoli are tender-crisp.',
        'Add the sauce, a few tablespoons at a time, allowing the sauce to bubble up after each addition.'
      ]
    };
    return new Recipe(fbRecipes.push(), data);
  };

  Recipe.all = [];

  fbRecipes.on("child_added", function(data) {
    Recipe.all.push(new Recipe(data.ref()));
  });

  window.Recipe = Recipe;
})();
