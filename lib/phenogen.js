print("Welcome!")
print(owl)
//createOntology("test")
var q = new DLMatch(owl);

// convenience wrapper for outer part of expressions
eqHasPart = function(ops) {
    //print(arguments);
    var x =
    q.equivalentClassesMatch("?baseClass",
                             q.objectSomeValuesFromMatch(o.has_part, 
                                                         q.intersectionOfMatch.apply(q, ops)));
    return x;
}

var showDef = function(def) {
    var vals = [
        def.type        
    ];
}

axmap = function(ax, tr) {

    var m;
    var isMatch = function(ax, ops) {
        m =  q.testIfMatches(ax, eqHasPart(ops));
        return m != null;
    };


    switch(true) {
    case isMatch(ax,
                 [
                     {var: "quality",
                      subClassOf: o.rate},
                     q.objectSomeValuesFromMatch("?rel",
                                                 {var : "y",
                                                  subClassOf : o.biological_process })
                 ]) :

        switch (m.quality) {
            case o.increased_rate : m.direction = '+';
            case o.decreased_rate : m.direction = '-';
            default : m.direction = '?';
        }
        return {
            type: "rateOfBiologicalProcess",
            args: m
        }

    case isMatch(ax,
                 [
                     {var: "quality",
                      subClassOf: o.rate},
                     q.objectSomeValuesFromMatch("?rel",
                                                 {var : "y",
                                                  subClassOf : o.biological_process }),
                     q.objectSomeValuesFromMatch("?rel2", "?y2")
                 ]) :

        m.direction = 'abnormal';
        return {
            type: "rateOfBiologicalProcess",
            args: m
        }

    case isMatch(ax,
                 [
                     "?quality", 
                     q.objectSomeValuesFromMatch("?rel",
                                                 {var : "y",
                                                  subClassOf : o.biological_process }),
                     q.objectSomeValuesFromMatch("?rel2", "?y2")
                 ]) :
        
        return {
            type: "biologicalProcessOpen",
            args: m
        }

    case isMatch(ax,
                 [
                     "?quality", 
                     q.objectSomeValuesFromMatch("?rel",
                                                 {var : "y",
                                                  subClassOf : o.anatomical_entity }),
                 ]) :
        
        return {
            type: "anatomicalEntityBasic",
            args: m
        };
        
    case isMatch(ax,
                 [
                     "?quality", 
                     q.objectSomeValuesFromMatch("?rel", "?y")
                 ]):
        
        return {
            type: "genericEQ",
            args: m
        };

    default:
        return null;
    }

    return null;
}

var axioms = owl.getAllAxioms(null, false);
axioms.forEach( function(ax) {
    if (ax instanceof OWLEquivalentClassesAxiom) {
        var tr = axmap(ax);
        if (tr == null) {
            var axStr = ax + "";
            if (axStr.match(/MP_/) || axStr.match(/HP_/)) {
                print("NO_MATCH: ");
                pp(ax);
            }
        }
        else {
            print("type="+tr.type);
            pp(ax);
            pp(tr);
        }
    }
});

quit();               



