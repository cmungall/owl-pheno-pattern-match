run:
	owljs-repl -i lib/phenogen.js tests/data/nervous-system.owl

phenotype-ontologies:
	ln -s $(HOME)/repos/phenotype-ontologies/src/ontology $@

tests/data/nervous-system.owl:
	cp phenotype-ontologies/mp/subsets/nervous-system.owl $@
