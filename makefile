# Non-file targets
publish: last_updated
	git add *.html cv.pdf makefile static/* courses/*
	git commit -m "make publish"
	git push -u origin main

last_updated: last_updated_paradigm.html
	echo "Last Updated:" > last_updated.html
	date >> last_updated.html

clean:
	rm -f *~ \#*\#

# File targets
last_updated_paradigm.html: paradigm.html 
	echo "Last Updated:" > last_updated_paradigm.html
	date >> last_updated_paradigm.html
