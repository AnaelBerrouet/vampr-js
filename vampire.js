class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 1;
    if(this.creator === null) {
      return 0;
    } else {
      return count + this.creator.numberOfVampiresFromOriginal;
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if(this.name == name) {
      return this;
    } else if (this.offspring.length != 0) {
      let result = null;
      for(let i=0; result == null && i < this.offspring.length; i++){
        result = this.offspring[i].vampireWithName(name);
      }
      return result;
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0; //+1 for myself
    for(let child of this.offspring) {
      count++;
      count += child.totalDescendents;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = []; //+1 for myself

    if(this.yearConverted > 1980) {
      millenials.push(this);
    }

    for(let child of this.offspring) {
      let output = child.allMillennialVampires;
      millenials = millenials.concat(output);
    }
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    if(vampire === this){
      return this;
    }

    let myAncestors = [this];
    let vampAncestors = [vampire];
    let currentVamp;

    currentVamp = this;

    while(currentVamp.creator != null) {
      currentVamp = currentVamp.creator;
      myAncestors.push(currentVamp);

    }

    currentVamp = vampire;

    while(currentVamp.creator != null) {
      currentVamp = currentVamp.creator;
      vampAncestors.push(currentVamp);
    }

    // console.log("myAncestors:",myAncestors);
    // console.log("vampAncestors:",vampAncestors);

    let myAnc;
    let vampAnc;
    let lastCommon = myAncestors[myAncestors.length - 1]; //set last common to root

    // console.log("lastCommon-init",lastCommon.name);

    while(myAncestors.length >= 0) {
      myAnc = myAncestors.pop();
      vampAnc = vampAncestors.pop();

      if(myAnc != vampAnc) {
        return lastCommon;
      } else {
        lastCommon = myAnc;
      }
    }

  }
}

module.exports = Vampire;

