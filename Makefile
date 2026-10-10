.PHONY: stamp publish

export MESSAGE

stamp:
	python3 scripts/publish.py stamp

publish:
	python3 scripts/publish.py publish
