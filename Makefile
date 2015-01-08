run:
	owljs-repl -i lib/phenogen.js tests/data/nervous-system.owl

t: target/ns-patterns.js

target/ns-patterns.js: lib/phenogen.js
	owljs-repl -i $< tests/data/nervous-system.owl  > $@.tmp && mv $@.tmp $@

phenotype-ontologies:
	ln -s $(HOME)/repos/phenotype-ontologies/src/ontology $@

tests/data/nervous-system.owl:
	cp phenotype-ontologies/mp/subsets/nervous-system.owl $@
